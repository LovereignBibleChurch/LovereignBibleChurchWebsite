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
    <section className="py-20 bg-[#050505] text-white selection:bg-white selection:text-black">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-3 block"
            >
              Exclusively for you
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 italic">
              {title}
            </h2>
            <p className="text-gray-400 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Minimal Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
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
                      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl text-center min-w-[50px]">
                        <span className="block text-[10px] uppercase tracking-tighter text-gray-300">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="block text-xl font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                    </div>

                    <div className="mt-6 space-y-3 px-1">
                      <div className="flex items-center gap-2">
                        <span className="h-[1px] w-4 bg-blue-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-bold">
                          {event.category || "Gathering"}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-medium tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
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

        {/* Minimal Pagination */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {filteredEvents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-1 transition-all duration-500 rounded-full",
                currentIndex === idx ? "w-12 bg-white" : "w-2 bg-gray-800"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
