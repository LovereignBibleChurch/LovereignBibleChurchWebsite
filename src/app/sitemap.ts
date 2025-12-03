import type { MetadataRoute } from "next"
import { BooksData } from "@/data/booksData"

const siteUrl = "https://lovereignbiblechurch.org"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/books`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/media`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/shop`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact-us`, changeFrequency: "monthly", priority: 0.5 },
  ]

  for (const book of BooksData) {
    routes.push({
      url: `${siteUrl}/books?id=${book.id}`,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  }

  return routes
}
