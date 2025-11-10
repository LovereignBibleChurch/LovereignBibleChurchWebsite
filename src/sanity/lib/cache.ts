import { unstable_cache as nextUnstableCache } from 'next/cache'

export type CacheOptions = {
  revalidate?: number
  tags?: string[]
}

// A small wrapper to make using Next.js unstable_cache ergonomic for Sanity fetches.
// Usage:
//   return cached(fetcherFn, ['sanity', 'branches'], { revalidate: 60, tags: ['branches'] })
export async function cached<T>(
  fetcher: () => Promise<T>,
  key: string[],
  options: CacheOptions = {}
): Promise<T> {
  const fn = nextUnstableCache(fetcher, key, {
    revalidate: options.revalidate ?? 60,
    tags: options.tags,
  })
  return fn()
}
