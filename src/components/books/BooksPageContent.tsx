"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import BookDetails from "@/components/books/BooksDetails"
import BooksList from "@/components/books/BooksLists"
import BooksStructuredData from "@/components/books/BooksStructuredData"

export default function BooksPageContent() {
  const searchParams = useSearchParams()
  const bookId = searchParams.get("id")

  return (
    <>
      {/* JSON-LD for list or book detail */}
      <BooksStructuredData />
      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-gray-300">Loading...</div>
          </div>
        }
      >
        {bookId ? (
          <BookDetails bookId={Number.parseInt(bookId)} />
        ) : (
          <BooksList />
        )}
      </Suspense>
    </>
  )
}

