"use client"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react"
import emailjs from "@emailjs/browser"

const links = [
  { name: "Our Story", href: "/our-story" }, { name: "Church Branches", href: "/church-branches" }, { name: "Founder", href: "/founder" },
  { name: "Books", href: "/books" }, { name: "Media", href: "/media" }, { name: "Give", href: "/give" }, { name: "Contact Us", href: "/contact-us" },
]

export default function Footer() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle")
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setState("sending")
    try { await emailjs.send("service_cte8xrg", "template_vruhehp", { from_name: form.name, from_email: form.phone, message: form.message, to_name: "Lovereign Bible Church", subject: "Website contact form" }, { publicKey: "fN2qkg7bDDx_2te0R" }); setForm({ name: "", phone: "", message: "" }); setState("success") }
    catch { setState("error") }
  }
  return <footer className="border-t border-white/10 bg-[#0b0b0a]">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-[1.25fr_.8fr_1fr_1.1fr]">
      <div><Link href="/" className="flex items-center gap-3"><img src="/logos/logo.png" alt="Lovereign Bible Church" className="h-10 w-10 rounded-sm object-cover" /><span className="font-display text-lg font-semibold text-white">Lovereign Bible Church</span></Link><p className="mt-6 max-w-sm text-sm leading-6 text-white/55">Making a people ready for God — transforming lives through the Word.</p><div className="mt-6 flex gap-4"><SocialLink href="https://facebook.com/lovereignbiblechurch" label="Facebook" Icon={Facebook} /><SocialLink href="https://www.instagram.com/lovereignbiblechurch" label="Instagram" Icon={Instagram} /><SocialLink href="https://www.youtube.com/@lovereignbiblechurch" label="YouTube" Icon={Youtube} /></div></div>
      <div><FooterHeading>Explore</FooterHeading><ul className="space-y-3">{links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/55 hover:text-[#f0cf82]">{link.name}</Link></li>)}</ul></div>
      <div><FooterHeading>Contact</FooterHeading><ul className="space-y-4 text-sm text-white/55"><li>Dome Pillar Two Road,<br />Christian Village, Achimota</li><li><a href="tel:+233242371411" className="inline-flex items-center gap-2 hover:text-[#f0cf82]"><Phone className="h-4 w-4 text-[#d8b267]" aria-hidden="true" />(+233) 24 237 1411</a></li><li><a href="mailto:info@lovereignbiblechurch.org" className="inline-flex items-center gap-2 break-all hover:text-[#f0cf82]"><Mail className="h-4 w-4 shrink-0 text-[#d8b267]" aria-hidden="true" />info@lovereignbiblechurch.org</a></li></ul></div>
      <div><FooterHeading>Send a Message</FooterHeading><form onSubmit={submit} className="space-y-3"><label className="sr-only" htmlFor="footer-name">Name</label><input id="footer-name" name="name" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name…" className="h-10 w-full border border-white/20 bg-transparent px-3 text-sm text-white placeholder:text-white/35" /><label className="sr-only" htmlFor="footer-phone">Phone number</label><input id="footer-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone number…" className="h-10 w-full border border-white/20 bg-transparent px-3 text-sm text-white placeholder:text-white/35" /><label className="sr-only" htmlFor="footer-message">Message</label><textarea id="footer-message" name="message" required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?…" className="w-full resize-y border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/35" /><button type="submit" disabled={state === "sending"} className="bg-[#d8b267] px-4 py-2.5 text-sm font-semibold text-[#17130a] hover:bg-[#f0cf82] disabled:cursor-not-allowed disabled:opacity-60">{state === "sending" ? "Sending…" : "Send Message"}</button><p aria-live="polite" className={`text-sm ${state === "error" ? "text-red-300" : "text-[#f0cf82]"}`}>{state === "success" ? "Thank you. We’ll be in touch soon." : state === "error" ? "Your message could not be sent. Please try again or email us directly." : ""}</p></form></div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-white/35 md:flex-row md:items-center md:justify-between md:px-8"><p>© {new Date().getFullYear()} Lovereign Bible Church. All rights reserved.</p><p>Making a people ready for God</p></div></div>
  </footer>
}

function FooterHeading({ children }: { children: React.ReactNode }) { return <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b267]">{children}</h2> }
function SocialLink({ href, label, Icon }: { href: string; label: string; Icon: typeof Facebook }) { return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/60 hover:text-[#f0cf82]"><Icon className="h-5 w-5" aria-hidden="true" /></a> }
