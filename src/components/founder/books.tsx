"use client"

import { motion } from "framer-motion"
import { BooksData } from "@/data/booksData"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Books() {
  const router = useRouter()

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="orb w-64 h-64 bg-amber-500/[0.05] top-0 right-0 translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-amber-400/60 uppercase block mb-4">Published Works</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">
            Books by Pastor John Winfred
          </h2>
          <div className="divider-glow w-40 mt-4 mb-4" />
          <p className="text-white/35 text-sm font-light max-w-lg">
            Transformative books on ministry, leadership, and spiritual growth, touching thousands of lives worldwide.
          </p>
        </motion.div>

        {/* Books list — horizontal rows, no heavy cards */}
        <div className="space-y-0">
          {BooksData.map((book, index) => (
            <motion.div
              key={book.id}
              className="group flex items-center gap-6 py-6 border-t border-white/[0.05] cursor-pointer hover:border-white/[0.1] transition-colors"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              onClick={() => router.push(`/books?id=${book.id}`)}
            >
              {/* Cover thumbnail */}
              <div className="flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden ring-1 ring-white/[0.07] group-hover:ring-white/[0.12] transition-all">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="flex-grow min-w-0">
                <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1">{book.year} &middot; {book.pages} pages</p>
                <h3 className="font-display text-base md:text-lg font-medium text-white/85 group-hover:text-white transition-colors line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-white/35 text-sm font-light mt-1 line-clamp-1">{book.description}</p>
              </div>

              {/* Price + arrow */}
              <div className="flex-shrink-0 flex items-center gap-4 text-right">
                <span className="text-sm text-white/50">{book.price}</span>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.05]" />
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => router.push("/books")}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group cursor-pointer"
          >
            View all books in our bookstore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
