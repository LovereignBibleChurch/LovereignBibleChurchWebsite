"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import CartIconInline from "@/components/cart/CartIconInline"

const navLinks = [
  { name: "Home", href: "/" }, { name: "Our Story", href: "/our-story" },
  { name: "Branches", href: "/church-branches" }, { name: "Founder", href: "/founder" },
  { name: "Books", href: "/books" }, { name: "Media", href: "/media" },
  { name: "Give", href: "/give" }, { name: "Contact", href: "/contact-us" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const showCartIcon = pathname?.startsWith("/shop")

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0a]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.5rem] md:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex items-center gap-3 text-white" onClick={() => setOpen(false)}>
          <img src="/logos/logo.png" alt="Lovereign Bible Church" className="h-9 w-9 rounded-sm object-cover" />
          <span className="hidden font-display text-[1.05rem] font-semibold tracking-wide sm:block">Lovereign Bible Church</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`border-b px-3 py-2 text-sm transition-colors ${active ? "border-[#d8b267] text-white" : "border-transparent text-white/65 hover:border-white/30 hover:text-white"}`}>{link.name}</Link>
          })}
          {showCartIcon && <div className="ml-3 border-l border-white/10 pl-3"><CartIconInline /></div>}
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          {showCartIcon && <CartIconInline />}
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} className="grid h-10 w-10 place-items-center border border-white/20 text-white hover:border-[#d8b267] hover:text-[#f0cf82]">
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && <div id="mobile-navigation" className="border-t border-white/10 bg-[#121210] px-5 py-3 lg:hidden">
        {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`block border-b border-white/10 py-3 text-sm ${pathname === link.href ? "text-[#f0cf82]" : "text-white/75"}`}>{link.name}</Link>)}
      </div>}
    </header>
  )
}
