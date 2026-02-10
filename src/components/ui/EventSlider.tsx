"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
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
          image: event.image ? getImageUrl(event.image, 600, 800) : "/placeholder.svg",
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
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    return eventDate >= twoDaysAgo
  })

  // State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, {
    margin: "-100px",
    amount: 0.5,
  })

  // Responsive items per view logic
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 2 : 1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto scroll
  useEffect(() => {
    // Stop autoplay if we don't have enough events to scroll
    if (!isAutoPlaying || upcomingAndRecentEvents.length <= (window.innerWidth >= 1024 ? 3 : 1)) return
    
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex, upcomingAndRecentEvents.length])

  // Navigation handlers
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % upcomingAndRecentEvents.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + upcomingAndRecentEvents.length) % upcomingAndRecentEvents.length)
  }

  if (upcomingAndRecentEvents.length === 0) {
    return (
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4 max-w-5xl">
          <EmptyState />
        </div>
      </section>
    )
  }

  // Always extend by 3 to support desktop view without whitespace
  const extendedEvents = [...upcomingAndRecentEvents, ...upcomingAndRecentEvents.slice(0, 3)]

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Events</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 text-sm max-w-2xl">{subtitle}</p>
            <div className="w-8 h-px bg-gray-700 mt-3" />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
        
            <div className="w-px h-4 bg-gray-700 mx-1" />
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              aria-label="Previous event"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              aria-label="Next event"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Slider Viewport */}
        <div 
          className="relative overflow-hidden -mx-4 px-4 md:mx-0 md:px-0"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <motion.div
            className="flex"
            animate={{ 
              x: `-${currentIndex * (100 / extendedEvents.length)}%`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {extendedEvents.map((event, index) => {
              const uniqueKey = `${event.id}-${index}`
              
              const timeDisplay = [event.time.morning, event.time.afternoon, event.time.evening]
                .filter(Boolean)
                .join(" • ")

              return (
                <div 
                  key={uniqueKey}
                  className="w-full lg:w-1/3 flex-shrink-0 px-2 md:px-3"
                >
                  <div className="relative group overflow-hidden rounded-xl bg-gray-900 border border-gray-800 h-full flex flex-col">
                    {/* Image Container - Aspect Ratio 4:5 for better portrait support */}
                    <div className="aspect-[4/5] w-full overflow-hidden relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                      
                      {/* Category Badge */}
                      {event.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white bg-black/50 backdrop-blur-md rounded border border-white/10">
                            {event.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 relative flex-1 flex flex-col justify-end -mt-20 z-10">
                       {/* Date Badge (Floating overlap) */}
                       <div className="absolute top-0 right-4 -translate-y-full mb-2 bg-white text-black p-2 rounded-lg shadow-lg text-center min-w-[3.5rem]">
                        <div className="text-xs font-bold uppercase tracking-wide text-gray-500">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </div>
                        <div className="text-xl font-bold leading-none">
                          {new Date(event.date).getDate()}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 pr-12" title={event.title}>
                        {event.title}
                      </h3>

                      {/* Description/Subtitle */}
                      {event.description && (
                        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="space-y-2 text-sm text-gray-400 mt-auto">
                        {timeDisplay && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                            <span className="truncate">{timeDisplay}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
        
        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {upcomingAndRecentEvents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentIndex === idx ? "w-6 bg-white" : "w-1.5 bg-gray-700 hover:bg-gray-600"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
