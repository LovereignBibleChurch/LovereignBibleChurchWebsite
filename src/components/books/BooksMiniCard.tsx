import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BooksData } from "@/data/booksData"

export default function BooksMiniCard() {
  const featured = BooksData[0]
  if (!featured) return null

  return (
    <section className="border-b border-white/10 bg-[#0b0b0a] py-12 md:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 md:grid-cols-[11rem_1fr_auto] md:px-8">
        <div className="relative aspect-[3/2] overflow-hidden border border-white/15 bg-[#121210]"><Image src={featured.image} alt={featured.title} fill sizes="(min-width: 768px) 11rem, 100vw" className="object-cover" /></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b267]">From the Bookstore</p><h2 className="mt-3 font-display text-2xl font-semibold text-white">{featured.title}</h2><p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">{featured.description}</p></div>
        <div className="flex flex-wrap gap-4 md:flex-col md:items-start"><Link href="/books" className="inline-flex items-center gap-2 bg-[#d8b267] px-4 py-2.5 text-sm font-semibold text-[#17130a] hover:bg-[#f0cf82]">Explore Books <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={`/books?id=${featured.id}`} className="border-b border-white/40 pb-0.5 text-sm text-white/75 hover:border-[#f0cf82] hover:text-[#f0cf82]">View This Title</Link></div>
      </div>
    </section>
  )
}
