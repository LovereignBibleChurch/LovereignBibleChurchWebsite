import { groq } from 'next-sanity'
import { client } from './client'
import { urlFor } from './image'

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
  return await client.fetch(testimonialsQuery)
}

export async function getFeaturedTestimonials() {
  return await client.fetch(featuredTestimonialsQuery)
}

export async function getEvents() {
  return await client.fetch(eventsQuery)
}

export async function getUpcomingEvents() {
  return await client.fetch(upcomingEventsQuery)
}

export async function getFeaturedEvents() {
  return await client.fetch(featuredEventsQuery)
}

export async function getLeaders() {
  return await client.fetch(leadersQuery)
}

export async function getLeadersByLocation(location: string) {
  return await client.fetch(leadersByLocationQuery, { location })
}

export async function getBranches() {
  return await client.fetch(branchesQuery)
}

export async function getBranchBySlug(slug: string) {
  return await client.fetch(branchBySlugQuery, { slug })
}

export async function getSermons() {
  return await client.fetch(sermonsQuery)
}

export async function getFeaturedSermons() {
  return await client.fetch(featuredSermonsQuery)
}

export async function getSermonsBySeries(series: string) {
  return await client.fetch(sermonsBySeriesQuery, { series })
}

export async function getActiveAnnouncements() {
  return await client.fetch(activeAnnouncementsQuery)
}

export async function getFeaturedAnnouncements() {
  return await client.fetch(featuredAnnouncementsQuery)
}

// Helper function to get optimized image URL
export function getImageUrl(source: any, width = 800, height?: number) {
  if (!source) return null
  
  const url = urlFor(source)
  
  if (height) {
    return url.width(width).height(height).url()
  }
  
  return url.width(width).url()
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