"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { EventItem } from "@/data/eventsData"
import { cn } from "@/lib/utils"
import { getImageUrl } from "@/sanity/lib/queries"

interface EventsSliderProps {
  events: EventItem[] | any[]
  title?: string
  subtitle?: string
}

export default function EventsSlider({
  events = [],
  title = "Upcoming Events",
  subtitle = "Join us for these gatherings",
}: EventsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(1)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerView(3)
      else if (window.innerWidth >= 768) setItemsPerView(2)
      else setItemsPerView(1)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return eventDate >= new Date(today.setDate(today.getDate() - 2))
    })
  }, [events])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredEvents.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length)
  }

  useEffect(() => {
    if (!isAutoPlaying || filteredEvents.length <= itemsPerView) return
    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex, filteredEvents.length, itemsPerView])

  if (filteredEvents.length === 0) return null

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background orb */}
      <div className="orb w-80 h-80 bg-purple-700/[0.08] top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold tracking-[0.2em] text-purple-400/80 uppercase mb-3 block"
            >
              Exclusively for you
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4 italic text-white">
              {title}
            </h2>
            <div className="divider-glow w-32 mb-4" />
            <p className="text-white/45 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full glass glass-hover flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full glass glass-hover flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div 
          className="relative overflow-visible"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {filteredEvents.map((event, idx) => (
                <div 
                  key={event._id || idx} 
                  className={cn(
                    "flex-shrink-0 px-3 transition-opacity duration-500",
                    "w-full md:w-1/2 xl:w-1/3"
                  )}
                >
                  <Link 
                    href={event.registrationLink || "#"} 
                    target={event.registrationLink ? "_blank" : undefined}
                    rel={event.registrationLink ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block cursor-pointer group",
                      !event.registrationLink && "pointer-events-none"
                    )}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
                      <Image
                        src={event.image ? getImageUrl(event.image, 960, 540) : "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute top-2 left-2 glass p-3 rounded-xl text-center min-w-[52px]">
                        <span className="block text-[10px] uppercase tracking-wider text-white/60">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="block text-xl font-bold text-white">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                    </div>

                    <div className="mt-6 space-y-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="h-[1px] w-4 bg-purple-400" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold">
                          {event.category || "Gathering"}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-purple-300 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 font-light line-clamp-2 leading-relaxed h-10">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 uppercase tracking-wider">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span>{event.time?.morning || "TBA"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 uppercase tracking-wider">
                          <MapPin className="w-3 h-3 text-gray-600" />
                          <span className="truncate max-w-[120px]">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {filteredEvents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1 transition-all duration-500 rounded-full cursor-pointer",
                currentIndex === idx ? "w-10 bg-purple-400" : "w-2 bg-white/10 hover:bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
