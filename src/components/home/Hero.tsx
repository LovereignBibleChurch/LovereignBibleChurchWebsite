"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { HeroItem } from "@/data/heroData"
import { useMediaQuery } from "@/hooks/use-media-query"

interface HeroProps {
  items: HeroItem[]
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export default function Hero({ items, primaryButtonText, primaryButtonLink = "/our-story", secondaryButtonText, secondaryButtonLink = "/contact-us" }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const currentItem = items[currentIndex] ?? items[0]

  if (!currentItem) return null

  return (
    <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden border-b border-white/10 bg-[#10100e] md:min-h-[42rem]">
      <Image src={isMobile ? currentItem.mobileImage : currentItem.desktopImage} alt="" fill priority className="object-cover opacity-65" sizes="100vw" />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#f0cf82]">Lovereign Bible Church</p>
        <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.02] text-white md:text-6xl">{currentItem.title}</h1>
        {currentItem.subtitle && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">{currentItem.subtitle}</p>}
        {(primaryButtonText || secondaryButtonText) && <div className="mt-9 flex flex-wrap items-center gap-5">
          {primaryButtonText && <Link href={primaryButtonLink} className="inline-flex items-center gap-2 border border-[#d8b267] bg-[#d8b267] px-5 py-3 text-sm font-semibold text-[#17130a] transition-colors hover:bg-[#f0cf82]">{primaryButtonText}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>}
          {secondaryButtonText && <Link href={secondaryButtonLink} className="border-b border-white/60 pb-1 text-sm font-semibold text-white transition-colors hover:border-[#f0cf82] hover:text-[#f0cf82]">{secondaryButtonText}</Link>}
        </div>}
        {items.length > 1 && <div className="mt-12 flex items-center gap-3" aria-label="Hero slides">
          {items.map((item, index) => <button key={item.id} type="button" onClick={() => setCurrentIndex(index)} aria-label={`Show ${item.title}`} aria-pressed={index === currentIndex} className={`h-2.5 w-2.5 border ${index === currentIndex ? "border-[#f0cf82] bg-[#f0cf82]" : "border-white/70 bg-transparent hover:border-white"}`} />)}
        </div>}
      </div>
    </section>
  )
}
