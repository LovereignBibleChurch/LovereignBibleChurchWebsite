import Link from "next/link"
import { Facebook, Instagram, Podcast, Youtube } from "lucide-react"

const platforms = [
  { name: "YouTube", href: "https://youtube.com/@lovereignbiblechurch?si=lExgqZKahNHcNtxS", Icon: Youtube, description: "Watch services, teachings & church moments." },
  { name: "Podbean", href: "https://lovereignbiblechurch.podbean.com/?source=ad", Icon: Podcast, description: "Listen to messages wherever you are." },
  { name: "Instagram", href: "https://www.instagram.com/lovereignbiblechurch", Icon: Instagram, description: "Follow the life of the church." },
  { name: "Facebook", href: "https://facebook.com/LOVEREIGNBIBLECHURCH", Icon: Facebook, description: "Stay connected with updates & gatherings." },
]

export default function OnlineCommunity() {
  return (
    <section className="border-y border-white/10 bg-[#121210] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-8 md:flex-row md:items-end">
          <div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b267]">Stay Connected</p><h2 className="mt-4 font-display text-4xl font-semibold text-white md:text-5xl">Our Online Community</h2><p className="mt-4 leading-7 text-white/60">Messages and updates from Lovereign Bible Church, wherever you are.</p></div>
          <Link href="/media" className="w-fit border-b border-[#d8b267] pb-1 text-sm font-semibold text-[#f0cf82] hover:border-white hover:text-white">Explore Media</Link>
        </div>
        <div className="divide-y divide-white/10">
          {platforms.map(({ name, href, Icon, description }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-white/[0.03]">
            <Icon className="h-5 w-5 text-[#d8b267]" aria-hidden="true" /><div className="min-w-0"><h3 className="font-semibold text-white">{name}</h3><p className="mt-1 truncate text-sm text-white/50">{description}</p></div><span className="text-sm text-white/50 group-hover:text-[#f0cf82]">Visit&nbsp;↗</span>
          </a>)}
        </div>
      </div>
    </section>
  )
}
