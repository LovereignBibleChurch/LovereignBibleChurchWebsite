"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BooksData } from "@/data/booksData"
import { ArrowRight } from "lucide-react"

export default function BooksPromo() {
  const featured = BooksData.slice(0, 3)
  const [first, ...rest] = featured

  return (
    <section className="bg-black text-foreground py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
            Featured Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Featured Books</h2>
          <p className="text-muted-foreground mt-3 max-w-lg">Explore our latest releases for faith and leadership.</p>
        </motion.div>

        {/* Featured Book - Large Display */}
        {first && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Image */}
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg bg-muted">
              <Image
                src={first.image || "/placeholder.svg"}
                alt={first.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                {first.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">{first.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">{first.description}</p>

              <div className="flex items-center gap-6">
                <span className="text-lg font-medium text-white">{first.price}</span>
                <Link
                  href={`/books?id=${first.id}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium hover:text-foreground/70 transition-colors text-white"
                >
                  Explore
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Divider */}
        <div className="w-full h-px bg-border mb-12" />

        {/* Other Books - Minimal List */}
        <div className="space-y-8">
          {rest.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6 items-start hover:opacity-70 transition-opacity duration-200"
            >
              {/* Small Image */}
              <div className="sm:col-span-1 relative h-40 sm:h-32 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="sm:col-span-3 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase text-white mb-2">
                    {book.category}
                  </p>
                  <Link href={`/books?id=${book.id}`} className="group/title inline-block">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover/title:underline underline-offset-2 transition-all text-white">
                      {book.title}
                    </h4>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 text-gray-500 line-clamp-2">{book.description}</p>
                </div>

                {/* CTA Row */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white font-medium">{book.price}</span>
                  <Link
                    href={`/books?id=${book.id}`}
                    className="group/link inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center md:text-left"
        >
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 transition-colors"
          >
            View All Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
