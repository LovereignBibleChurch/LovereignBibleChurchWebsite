"use client"

import Script from "next/script"
import { useSearchParams } from "next/navigation"
import { BooksData } from "@/data/booksData"

function formatPrice(price: string) {
  try {
    return parseFloat(price.replace(/[^0-9.]/g, ""))
  } catch {
    return undefined
  }
}

export default function BooksStructuredData() {
  const searchParams = useSearchParams()
  const bookId = searchParams.get("id")

  if (bookId) {
    const book = BooksData.find((b) => String(b.id) === bookId)
    if (!book) return null

    const bookJsonLd = {
      "@context": "https://schema.org",
      "@type": "Book",
      name: book.title,
      image: book.image,
      description: book.description,
      genre: book.category,
      numberOfPages: book.pages ? Number(book.pages) : undefined,
      datePublished: book.year,
      url: `${typeof window !== "undefined" ? window.location.origin : ""}/books?id=${book.id}`,
      offers: {
        "@type": "Offer",
        price: formatPrice(book.price),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }

    return (
      <Script id="book-jsonld" type="application/ld+json">
        {JSON.stringify(bookJsonLd)}
      </Script>
    )
  }

  const items = BooksData.map((book, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `/books?id=${book.id}`,
    name: book.title,
  }))

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items,
  }

  return (
    <Script id="books-list-jsonld" type="application/ld+json">
      {JSON.stringify(listJsonLd)}
    </Script>
  )
}

