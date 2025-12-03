"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BooksData } from "@/data/booksData"
import { useEffect, useState } from "react"

export default function BooksMiniCard() {

  const [index, setIndex] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setIndex(prev => (prev + 1) % BooksData.length)
  }, 3000)

  return () => clearInterval(interval)
}, [])

const featured = BooksData[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-6"
    >
      <div className="relative overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-zinc-900/60 to-zinc-800/40">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-6 md:gap-8 p-6 md:p-8 items-center">
          <div className="relative h-40 md:h-36 w-full">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 220px"
              className="object-cover rounded"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-blue-200/80 mb-2">From our bookstore</div>
            <h3 className="text-lg md:text-xl text-white font-semibold mb-2">{featured.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2 md:line-clamp-2">{featured.description}</p>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <Link href="/books" className="inline-flex items-center px-4 py-2 rounded-sm border border-white/20 hover:border-white/40 text-white transition-colors">
              Explore Books
            </Link>
            <Link href={`/books?id=${featured.id}`} className="text-blue-200 hover:text-white text-sm">View this title</Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

