"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BooksData } from "@/data/booksData"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function BooksMiniCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % BooksData.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const featured = BooksData[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl px-6 py-6"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={featured.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-6 md:gap-8 p-6 md:p-8 items-center">
            {/* Book cover */}
            <div className="relative h-36 md:h-32 w-full md:w-auto rounded-xl overflow-hidden ring-1 ring-white/10">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Info */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400/80 font-bold block mb-2">
                From our bookstore
              </span>
              <h3 className="font-display text-lg md:text-xl text-white font-semibold mb-2 leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-white/45 font-light line-clamp-2 leading-relaxed">{featured.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col gap-3 items-start md:items-end">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-5 py-2.5 glass glass-hover rounded-xl text-white text-sm font-medium border border-purple-500/25 hover:border-purple-400/50 transition-all duration-200 cursor-pointer"
              >
                Explore Books
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/books?id=${featured.id}`}
                className="text-purple-300/70 hover:text-purple-200 text-xs font-light transition-colors cursor-pointer"
              >
                View this title
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
