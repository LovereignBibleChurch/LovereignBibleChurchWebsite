"use client"

import type { Metadata } from "next"
import { BooksData } from "@/data/booksData"
import BooksPageContent from "@/components/books/BooksPageContent"
import {Suspense} from "react"
import {useSearchParams} from "next/navigation"
import BookDetails from "@/components/books/BooksDetails";
import BooksList from "@/components/books/BooksLists";
import BooksStructuredData from "@/components/books/BooksStructuredData";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

async function generateMetadata({ searchParams }: { searchParams?: { id?: string } }): Promise<Metadata> {
  const id = searchParams?.id
  if (id) {
    const book = BooksData.find((b) => String(b.id) === id)
    if (book) {
      const title = `${book.title} | Lovereign Bible Church Books`
      const description = book.description
      const url = `${siteUrl}/books?id=${book.id}`
      const imageUrl = `${siteUrl}${book.image}`

      return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
          title,
          description,
          url,
          type: "website",
          images: [{ url: imageUrl }],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [imageUrl],
        },
      }
    }
  }

  const listTitle = "Books | Lovereign Bible Church"
  const listDescription = "Explore our books on ministry, leadership, and spiritual growth."
  const listUrl = `${siteUrl}/books`

  return {
    title: listTitle,
    description: listDescription,
    alternates: { canonical: listUrl },
    openGraph: {
      title: listTitle,
      description: listDescription,
      url: listUrl,
      type: "website",
      images: [{ url: `${siteUrl}/books/flyer1.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: listTitle,
      description: listDescription,
      images: [`${siteUrl}/books/flyer1.jpg`],
    },
  }
}

function BooksContent() {
    const searchParams = useSearchParams()
    const bookId = searchParams.get("id")

    if (bookId) {
        return <BookDetails bookId={Number.parseInt(bookId)} />
    }

    return <BooksList />
}

export default function BooksPage() {
  return <BooksPageContent />
}
