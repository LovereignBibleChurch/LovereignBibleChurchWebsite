"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Clock } from "lucide-react"
import type { EventItem } from "@/data/eventsData"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/sanity/lib/queries"

interface EventsSliderProps {
  events: EventItem[] | any[]
  title?: string
  subtitle?: string
}

function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h3 className="text-lg md:text-xl font-medium text-gray-300 text-center mb-2">No Upcoming Events</h3>
      <p className="text-gray-400 text-xs text-center max-w-md">Check back soon for new events and activities.</p>
    </motion.div>
  )
}

export default function EventsSlider({
  events = [],
  title = "Upcoming Events",
  subtitle = "Join us for these meaningful gatherings",
}: EventsSliderProps) {
  const transformEvents = (events: any[]): EventItem[] => {
    return events.map((event) => {
      if (event._id) {
        return {
          id: event._id,
          title: event.title,
          date: event.date,
          time: {
            morning: event.time?.morning || "",
            afternoon: event.time?.afternoon || "",
            evening: event.time?.evening || "",
          },
          image: event.image ? getImageUrl(event.image, 400, 300) : "/placeholder.svg",
          description: event.description || "",
          location: event.location || "",
          category: event.category || "",
        } as EventItem
      }
      return event as EventItem
    })
  }

  const transformedEvents = transformEvents(events)

const upcomingAndRecentEvents = transformedEvents.filter((event) => {
  const eventDate = new Date(event.date)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Create a date for 2 days ago
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  return eventDate >= twoDaysAgo
})



  const [selectedIndex, setSelectedIndex] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, {
    margin: "-100px",
    amount: 0.3,
  })

  if (upcomingAndRecentEvents.length === 0) {
    return (
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <EmptyState />
        </div>
      </section>
    )
  }

  const featured = upcomingAndRecentEvents[selectedIndex]
  const timeDisplay = [featured.time.morning, featured.time.afternoon, featured.time.evening]
    .filter(Boolean)
    .join(" • ")

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Events</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400 text-sm max-w-2xl">{subtitle}</p>
          <div className="w-8 h-px bg-gray-700 mt-3" />
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

          {/* Featured Event */}
          <motion.div
            className="lg:col-span-2"
            key={featured.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative w-full">


              <img
                src={featured.image || "/placeholder.svg"}
                alt={featured.title}
                className="w-full m-full object-cover rounded-lg"
              />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                {featured.category && (
                  <p className="text-xs font-medium text-gray-300 uppercase tracking-widest mb-2">
                    {featured.category}
                  </p>
                )}
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">
                  {featured.title}
                </h3>

                <div className="space-y-2">
                  {timeDisplay && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{timeDisplay}</span>
                    </div>
                  )}
                  {featured.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{featured.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline List */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {upcomingAndRecentEvents.map((event, index) => (
                <motion.button
                  key={event.id}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all duration-300",
                    selectedIndex === index
                      ? "bg-white text-black border-white"
                      : "bg-gray-900/50 text-gray-100 border-gray-800 hover:border-gray-700",
                  )}
                  whileHover={{ x: selectedIndex === index ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xs font-medium mb-1 line-clamp-2">{event.title}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
