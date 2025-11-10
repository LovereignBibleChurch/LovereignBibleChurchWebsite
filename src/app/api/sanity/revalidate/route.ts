import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import crypto from 'crypto'

// Map Sanity document types -> cache tags used in queries
const TYPE_TO_TAGS: Record<string, string[]> = {
  testimonial: ['sanity', 'testimonial'],
  event: ['sanity', 'event'],
  leader: ['sanity', 'leader'],
  branch: ['sanity', 'branch'],
  sermon: ['sanity', 'sermon'],
  announcement: ['sanity', 'announcement'],
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function signBody(body: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(body).digest('hex')
}

function getSecret(): string | undefined {
  return process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET
}

async function verifyRequest(req: NextRequest, rawBody: string): Promise<boolean> {
  const secret = getSecret()
  if (!secret) return false

  // Support either header signature or `?secret=` param as a fallback
  const sigHeader = req.headers.get('sanity-webhook-signature') || req.headers.get('x-sanity-signature')
  if (sigHeader) {
    const expected = signBody(rawBody, secret)
    return timingSafeEqual(sigHeader, expected)
  }
  const url = new URL(req.url)
  const secretParam = url.searchParams.get('secret')
  if (secretParam && timingSafeEqual(secretParam, secret)) return true
  return false
}

function tagsForPayload(payload: any): string[] {
  const tags = new Set<string>()
  // Always include the umbrella tag used in all queries
  tags.add('sanity')

  const t = payload?._type || payload?.type
  if (t && TYPE_TO_TAGS[t]) {
    TYPE_TO_TAGS[t].forEach(tag => tags.add(tag))
  }

  // If payload contains a list of mutated document types (e.g. from `*[_type == "..."]` filters)
  if (Array.isArray(payload?.ids) && Array.isArray(payload?.types)) {
    payload.types.forEach((tt: string) => {
      if (TYPE_TO_TAGS[tt]) TYPE_TO_TAGS[tt].forEach(tag => tags.add(tag))
    })
  }

  return Array.from(tags)
}

export async function POST(req: NextRequest) {
  const raw = await req.text()

  const ok = await verifyRequest(req, raw)
  if (!ok) {
    return NextResponse.json({ ok: false, error: 'Invalid signature or missing secret' }, { status: 401 })
  }

  let payload: any
  try {
    payload = JSON.parse(raw)
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  const tags = tagsForPayload(payload)
  tags.forEach(tag => revalidateTag(tag))

  return NextResponse.json({ ok: true, revalidated: true, tags })
}

// Optional: simple GET endpoint to manually revalidate a tag for debugging
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const secret = url.searchParams.get('secret')
  const expected = getSecret()
  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  const tag = url.searchParams.get('tag') || 'sanity'
  revalidateTag(tag)
  return NextResponse.json({ ok: true, revalidated: true, tags: [tag] })
}
