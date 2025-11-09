import { groq } from 'next-sanity'
import { client } from './client'
import { urlFor } from './image'
import { cached } from './cache'

// GROQ Queries for fetching data

// Testimonials Queries
export const testimonialsQuery = groq`
  *[_type == "testimonial" && isActive != false] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    testimony,
    image,
    date,
    location,
    featured,
    order
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true && isActive != false] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    testimony,
    image,
    date,
    location,
    featured,
    order
  }
`

// Events Queries
export const eventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    date,
    time,
    image,
    description,
    location,
    category,
    featured,
    registrationLink
  }
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc) [0...5] {
    _id,
    title,
    slug,
    date,
    time,
    image,
    description,
    location,
    category,
    featured,
    registrationLink
  }
`

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true && date >= now()] | order(date asc) {
    _id,
    title,
    slug,
    date,
    time,
    image,
    description,
    location,
    category,
    featured,
    registrationLink
  }
`

// Leaders Queries
export const leadersQuery = groq`
  *[_type == "leader" && isActive == true] | order(order asc, name asc) {
    _id,
    name,
    title,
    location,
    image,
    bio,
    contactInfo,
    socialLinks,
    order,
    isActive
  }
`

export const leadersByLocationQuery = groq`
  *[_type == "leader" && isActive == true && location == $location] | order(order asc, name asc) {
    _id,
    name,
    title,
    location,
    image,
    bio,
    contactInfo,
    socialLinks,
    order,
    isActive
  }
`

// Branches Queries
export const branchesQuery = groq`
  *[_type == "branch" && isActive == true] | order(order asc, name asc) {
    _id,
    name,
    slug,
    location,
    contact,
    pastor->{
      _id,
      name,
      title,
      image
    },
    services,
    description,
    photos,
    mapLink,
    order,
    isActive
  }
`

export const branchBySlugQuery = groq`
  *[_type == "branch" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    contact,
    pastor->{
      _id,
      name,
      title,
      image,
      bio,
      contactInfo,
      socialLinks
    },
    services,
    description,
    photos,
    mapLink,
    order,
    isActive
  }
`

// Sermons Queries
export const sermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id,
    title,
    slug,
    date,
    duration,
    thumbnail,
    description,
    speaker,
    scriptureReferences,
    platform,
    url,
    audioFile,
    series,
    category,
    tags,
    featured,
    transcript
  }
`

export const featuredSermonsQuery = groq`
  *[_type == "sermon" && featured == true] | order(date desc) {
    _id,
    title,
    slug,
    date,
    duration,
    thumbnail,
    description,
    speaker,
    scriptureReferences,
    platform,
    url,
    audioFile,
    series,
    category,
    tags,
    featured,
    transcript
  }
`

export const sermonsBySeriesQuery = groq`
  *[_type == "sermon" && series == $series] | order(date desc) {
    _id,
    title,
    slug,
    date,
    duration,
    thumbnail,
    description,
    speaker,
    scriptureReferences,
    platform,
    url,
    audioFile,
    series,
    category,
    tags,
    featured,
    transcript
  }
`

// Announcements Queries
export const activeAnnouncementsQuery = groq`
  *[_type == "announcement" && isActive == true && (startDate <= now() || !startDate) && (endDate >= now() || !endDate)] | order(priority desc, startDate desc) {
    _id,
    title,
    slug,
    content,
    image,
    category,
    priority,
    startDate,
    endDate,
    featured,
    link,
    buttonText
  }
`

export const featuredAnnouncementsQuery = groq`
  *[_type == "announcement" && featured == true && isActive == true && (startDate <= now() || !startDate) && (endDate >= now() || !endDate)] | order(priority desc, startDate desc) {
    _id,
    title,
    slug,
    content,
    image,
    category,
    priority,
    startDate,
    endDate,
    featured,
    link,
    buttonText
  }
`

// Fetch functions
export async function getTestimonials() {
  return cached(() => client.fetch(testimonialsQuery), ['sanity', 'testimonials', 'all'], { revalidate: 300, tags: ['sanity', 'testimonial'] })
}

export async function getFeaturedTestimonials() {
  return cached(() => client.fetch(featuredTestimonialsQuery), ['sanity', 'testimonials', 'featured'], { revalidate: 300, tags: ['sanity', 'testimonial'] })
}

export async function getEvents() {
  return cached(() => client.fetch(eventsQuery), ['sanity', 'events', 'all'], { revalidate: 120, tags: ['sanity', 'event'] })
}

export async function getUpcomingEvents() {
  return cached(() => client.fetch(upcomingEventsQuery), ['sanity', 'events', 'upcoming'], { revalidate: 120, tags: ['sanity', 'event'] })
}

export async function getFeaturedEvents() {
  return cached(() => client.fetch(featuredEventsQuery), ['sanity', 'events', 'featured'], { revalidate: 120, tags: ['sanity', 'event'] })
}

export async function getLeaders() {
  return cached(() => client.fetch(leadersQuery), ['sanity', 'leaders', 'all'], { revalidate: 600, tags: ['sanity', 'leader'] })
}

export async function getLeadersByLocation(location: string) {
  return cached(() => client.fetch(leadersByLocationQuery, { location }), ['sanity', 'leaders', 'byLocation', location], { revalidate: 600, tags: ['sanity', 'leader'] })
}

export async function getBranches() {
  return cached(() => client.fetch(branchesQuery), ['sanity', 'branches', 'all'], { revalidate: 600, tags: ['sanity', 'branch'] })
}

export async function getBranchBySlug(slug: string) {
  return cached(() => client.fetch(branchBySlugQuery, { slug }), ['sanity', 'branches', 'bySlug', slug], { revalidate: 600, tags: ['sanity', 'branch'] })
}

export async function getSermons() {
  return cached(() => client.fetch(sermonsQuery), ['sanity', 'sermons', 'all'], { revalidate: 600, tags: ['sanity', 'sermon'] })
}

export async function getFeaturedSermons() {
  return cached(() => client.fetch(featuredSermonsQuery), ['sanity', 'sermons', 'featured'], { revalidate: 600, tags: ['sanity', 'sermon'] })
}

export async function getSermonsBySeries(series: string) {
  return cached(() => client.fetch(sermonsBySeriesQuery, { series }), ['sanity', 'sermons', 'bySeries', series], { revalidate: 600, tags: ['sanity', 'sermon'] })
}

export async function getActiveAnnouncements() {
  return cached(() => client.fetch(activeAnnouncementsQuery), ['sanity', 'announcements', 'active'], { revalidate: 60, tags: ['sanity', 'announcement'] })
}

export async function getFeaturedAnnouncements() {
  return cached(() => client.fetch(featuredAnnouncementsQuery), ['sanity', 'announcements', 'featured'], { revalidate: 60, tags: ['sanity', 'announcement'] })
}

// Helper function to get optimized image URL
export function getImageUrl(source: any, width = 800, height?: number) {
    if (!source) return null

    if (typeof source === "string" && source.startsWith("http")) {
        return source
    }

    const ref = source.asset?._ref || source._ref || source
    if (!ref) return null

    const cleanRef = typeof ref === "string" ? ref.split("?")[0].replace(".jpg", "-jpg") : ref

    try {
        const url = urlFor({ _ref: cleanRef })
        return height ? url.width(width).height(height).url() : url.width(width).url()
    } catch (error) {
        console.error("Malformed image ref:", ref)
        return null
    }
}


// Helper function to format date
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Helper function to format time duration
export function formatDuration(duration: string) {
  if (!duration) return null
  
  // Handle format like "45:30" or "1:45:30"
  const parts = duration.split(':')
  if (parts.length === 2) {
    return `${parts[0]}:${parts[1]}`
  } else if (parts.length === 3) {
    return `${parts[0]}:${parts[1]}:${parts[2]}`
  }
  
  return duration
}