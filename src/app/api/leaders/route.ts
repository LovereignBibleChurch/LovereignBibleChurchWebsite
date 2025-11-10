import { NextResponse } from 'next/server'
import { getLeaders } from '@/sanity/lib/queries'

// Simple API route to expose leaders to Client Components safely.
// Uses server-side cached fetch with tags ['sanity','leader'] defined in getLeaders().
// Our `/api/sanity/revalidate` webhook revalidates these tags on content change.
export async function GET() {
  try {
    const data = await getLeaders()

    // Optional: you can tweak caching headers for downstream CDNs if needed.
    // Note: Next.js route handlers are executed on the server and leverage Next cache.
    return NextResponse.json({ ok: true, leaders: data })
  } catch (error: any) {
    console.error('Error fetching leaders:', error)
    return NextResponse.json({ ok: false, error: 'Failed to load leaders' }, { status: 500 })
  }
}
