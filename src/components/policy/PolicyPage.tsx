"use client"

import Link from "next/link"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { ArrowUp, ArrowUpRight, Check, Globe, Mail, MapPin, Phone, Search, ShieldCheck, X } from "lucide-react"
import {
  policyContact,
  policyHighlights,
  policyMeta,
  policySections,
  type PolicyBlock,
  type PolicySection,
} from "@/data/policyData"

/* ---------- helpers ---------- */

function blockText(block: PolicyBlock): string {
  switch (block.type) {
    case "p":
    case "note":
      return block.text
    case "ul":
    case "ol":
      return block.items.join(" ")
    case "link":
      return `${block.label} ${block.href}`
    case "contact":
      return Object.values(policyContact).join(" ")
  }
}

function sectionText(section: PolicySection): string {
  const parts = [section.title, ...section.blocks.map(blockText)]
  for (const sub of section.subsections ?? []) parts.push(sub.title, ...sub.blocks.map(blockText))
  return parts.join(" ").toLowerCase()
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "gi"))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-[#d8b267]/30 px-0.5 text-[#f5f0e6]">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/* ---------- page ---------- */

export default function PolicyPage() {
  const [query, setQuery] = useState("")
  const [activeId, setActiveId] = useState(policySections[0].id)
  const searchRef = useRef<HTMLInputElement>(null)

  const trimmed = query.trim()
  const index = useMemo(() => policySections.map((s) => ({ id: s.id, text: sectionText(s) })), [])
  const matchingIds = useMemo(() => {
    if (!trimmed) return null
    const q = trimmed.toLowerCase()
    return new Set(index.filter((s) => s.text.includes(q)).map((s) => s.id))
  }, [index, trimmed])

  const visibleSections = matchingIds ? policySections.filter((s) => matchingIds.has(s.id)) : policySections

  // Scroll spy for the table of contents
  useEffect(() => {
    const elements = visibleSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!elements.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-120px 0px -60% 0px" },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [visibleSections])

  // Press "/" to focus search
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName) && !target.isContentEditable) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="bg-[#0b0b0a] text-[#f5f0e6]">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-16 md:px-8 md:pb-20 md:pt-24 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b267]">Legal</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white md:text-6xl">{policyMeta.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              How Lovereign Bible Church collects, uses and protects your personal information when you use the{" "}
              {policyMeta.appName}.
            </p>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="text-white/45">Effective</dt>
                <dd className="font-medium text-white/85">{policyMeta.effectiveDate}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-white/45">Last updated</dt>
                <dd className="font-medium text-white/85">{policyMeta.lastUpdated}</dd>
              </div>
            </dl>

            <div className="relative mt-9 max-w-md">
              <label htmlFor="policy-search" className="sr-only">
                Search the privacy policy
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
              <input
                ref={searchRef}
                id="policy-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the policy…"
                autoComplete="off"
                className="h-12 w-full border border-white/15 bg-white/[0.03] pl-11 pr-12 text-sm text-white placeholder:text-white/40 transition-colors focus:border-[#d8b267] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    searchRef.current?.focus()
                  }}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center text-white/50 hover:text-[#f0cf82]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 border border-white/15 px-1.5 py-0.5 font-sans text-[11px] text-white/40 sm:block">
                  /
                </kbd>
              )}
            </div>
            <p aria-live="polite" className="mt-3 h-5 text-sm text-white/50">
              {matchingIds &&
                (matchingIds.size
                  ? `${matchingIds.size} section${matchingIds.size === 1 ? "" : "s"} mention “${trimmed}”`
                  : "")}
            </p>
          </div>

          {/* At a glance — inspired by the preference-sheet layout */}
          <aside aria-labelledby="glance-heading" className="border border-white/10 bg-[#121210]">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <ShieldCheck className="h-5 w-5 text-[#d8b267]" aria-hidden="true" />
              <h2 id="glance-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                At a glance
              </h2>
            </div>
            <ul className="divide-y divide-white/10">
              {policyHighlights.map((item) => (
                <li key={item.title} className="flex items-start justify-between gap-6 px-6 py-5">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/55">{item.text}</p>
                  </div>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center bg-[#d8b267] text-[#17130a]" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4">
              <a
                href="#your-privacy-rights"
                className="border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-[#d8b267] hover:text-[#f0cf82]"
              >
                Your rights
              </a>
              <a
                href="#contact-information"
                className="bg-[#d8b267] px-4 py-2.5 text-center text-sm font-semibold text-[#17130a] transition-colors hover:bg-[#f0cf82]"
              >
                Contact us
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-8 md:py-20 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
        {/* Table of contents */}
        <nav aria-label="Privacy policy sections" className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
          <details className="group border border-white/10 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-white/85 [&::-webkit-details-marker]:hidden">
              On this page
              <span className="text-white/40 transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <TocList sections={policySections} activeId={activeId} matchingIds={matchingIds} />
          </details>
          <div className="hidden lg:block">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">On this page</p>
            <TocList sections={policySections} activeId={activeId} matchingIds={matchingIds} />
          </div>
        </nav>

        {/* Content */}
        <article className="min-w-0 max-w-3xl">
          {visibleSections.length === 0 ? (
            <div className="border border-white/10 px-6 py-14 text-center">
              <p className="font-display text-2xl text-white">No results for “{trimmed}”</p>
              <p className="mt-3 text-sm text-white/55">Try a different word, such as “chat”, “examination” or “deletion”.</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-6 border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-[#d8b267] hover:text-[#f0cf82]"
              >
                Clear search
              </button>
            </div>
          ) : (
            visibleSections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className={`scroll-mt-28 ${i > 0 ? "mt-14 border-t border-white/10 pt-14" : ""}`}
              >
                <h2 id={`${section.id}-heading`} className="flex items-baseline gap-4 font-display text-2xl font-semibold text-[#f0cf82] md:text-[2rem]">
                  <span className="font-sans text-sm font-semibold tabular-nums text-white/35">{section.number.padStart(2, "0")}</span>
                  <Highlight text={section.title} query={trimmed} />
                </h2>
                <div className="mt-6 space-y-5">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} query={trimmed} />
                  ))}
                </div>

                {section.subsections && (
                  <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                    {section.subsections.map((sub) => (
                      <div key={sub.id} id={sub.id} className="scroll-mt-28 py-8">
                        <h3 className="flex items-baseline gap-3 text-lg font-semibold text-white">
                          <span className="text-sm tabular-nums text-[#d8b267]">{sub.number}</span>
                          <Highlight text={sub.title} query={trimmed} />
                        </h3>
                        <div className="mt-4 space-y-4">
                          {sub.blocks.map((block, j) => (
                            <Block key={j} block={block} query={trimmed} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))
          )}

          {/* Closing */}
          <footer className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xl font-semibold text-white">Lovereign Bible Church</p>
              <p className="mt-2 max-w-md text-sm italic leading-6 text-white/55">{policyMeta.closingLine}</p>
            </div>
            <a
              href="#main-content"
              className="inline-flex items-center gap-2 self-start border-b border-white/30 pb-1 text-sm font-semibold text-white/80 hover:border-[#f0cf82] hover:text-[#f0cf82] sm:self-auto"
            >
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </footer>
        </article>
      </div>
    </div>
  )
}

/* ---------- pieces ---------- */

function TocList({
  sections,
  activeId,
  matchingIds,
}: {
  sections: PolicySection[]
  activeId: string
  matchingIds: Set<string> | null
}) {
  return (
    <ol className="space-y-0.5 px-2 pb-3 lg:px-0 lg:pb-0">
      {sections.map((s) => {
        const active = s.id === activeId
        const dimmed = matchingIds && !matchingIds.has(s.id)
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active ? "location" : undefined}
              aria-disabled={dimmed || undefined}
              tabIndex={dimmed ? -1 : undefined}
              className={`flex gap-3 border-l-2 py-1.5 pl-3 text-sm leading-5 transition-colors ${
                dimmed
                  ? "pointer-events-none border-transparent text-white/20"
                  : active
                    ? "border-[#d8b267] font-medium text-white"
                    : "border-transparent text-white/50 hover:text-white/85"
              }`}
            >
              <span className="w-5 shrink-0 tabular-nums text-white/30">{s.number}</span>
              {s.title}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

function Block({ block, query }: { block: PolicyBlock; query: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-7 text-white/70 md:text-base">
          <Highlight text={block.text} query={query} />
        </p>
      )
    case "note":
      return (
        <p className="border-l-2 border-[#d8b267] bg-white/[0.03] px-5 py-4 text-[15px] leading-7 text-white/85 md:text-base">
          <Highlight text={block.text} query={query} />
        </p>
      )
    case "ul":
      return (
        <ul className={`grid gap-x-8 gap-y-2.5 ${block.columns ? "sm:grid-cols-2" : ""}`}>
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-6 text-white/70">
              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-[#d8b267]" aria-hidden="true" />
              <span>
                <Highlight text={item} query={query} />
              </span>
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4 py-3 text-[15px] leading-6 text-white/75">
              <span className="w-6 shrink-0 text-right text-sm font-semibold tabular-nums text-[#d8b267]">{i + 1}.</span>
              <span>
                <Highlight text={item} query={query} />
              </span>
            </li>
          ))}
        </ol>
      )
    case "link":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-[#d8b267]/50 pb-0.5 text-[15px] font-medium text-[#f0cf82] hover:border-[#f0cf82]"
        >
          <Highlight text={block.label} query={query} />
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )
    case "contact":
      return <ContactCard query={query} />
  }
}

function ContactCard({ query }: { query: string }) {
  const c = policyContact
  const rows = [
    { Icon: Globe, label: "Website", value: c.website.replace(/^https?:\/\//, ""), href: c.website, external: true },
    { Icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { Icon: Phone, label: "Telephone", value: c.phone, href: c.phoneHref },
    { Icon: MapPin, label: "Postal address", value: c.address },
  ]
  return (
    <div className="border border-white/10 bg-[#121210]">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="font-semibold text-white">{c.organisation}</p>
        <p className="mt-1 text-sm text-white/55">{c.office}</p>
      </div>
      <dl className="divide-y divide-white/10">
        {rows.map(({ Icon, label, value, href, external }) => (
          <div key={label} className="flex items-start gap-4 px-6 py-4">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b267]" aria-hidden="true" />
            <dt className="w-32 shrink-0 text-sm text-white/45">{label}</dt>
            <dd className="min-w-0 break-words text-sm text-white/85">
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="hover:text-[#f0cf82]"
                >
                  <Highlight text={value} query={query} />
                </a>
              ) : (
                <Highlight text={value} query={query} />
              )}
            </dd>
          </div>
        ))}
        {c.dataProtectionSupervisor && (
          <div className="flex items-start gap-4 px-6 py-4">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b267]" aria-hidden="true" />
            <dt className="w-32 shrink-0 text-sm text-white/45">Data protection</dt>
            <dd className="text-sm text-white/85">
              <Highlight text={c.dataProtectionSupervisor} query={query} />
            </dd>
          </div>
        )}
      </dl>
      <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-2">
        <Link
          href="/contact-us"
          className="border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:border-[#d8b267] hover:text-[#f0cf82]"
        >
          Contact page
        </Link>
        <a
          href={`mailto:${c.email}?subject=${encodeURIComponent("Privacy request")}`}
          className="bg-[#d8b267] px-4 py-2.5 text-center text-sm font-semibold text-[#17130a] transition-colors hover:bg-[#f0cf82]"
        >
          Email a privacy request
        </a>
      </div>
    </div>
  )
}
