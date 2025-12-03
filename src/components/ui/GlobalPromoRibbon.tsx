"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function GlobalPromoRibbon() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem("promoRibbonDismissed") === "true"
    if (dismissed) setVisible(false)
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem("promoRibbonDismissed", "true")
    } catch {}
  }

  if (!visible) return null

  return (
    <div className="fixed left-0 w-full z-60 top-16 md:top-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between rounded-md border border-blue-500/30 bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-indigo-900/40 backdrop-blur-sm px-4 py-2 text-sm text-blue-100 shadow-lg">
          <Link href="/books" className="flex items-center gap-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-medium">New and Featured: Explore Our Books</span>
            <span className="hidden sm:inline text-blue-200/80">Tap to browse titles</span>
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss promo ribbon"
            className="rounded px-2 py-1 text-blue-200/80 hover:text-white hover:bg-blue-700/30 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

