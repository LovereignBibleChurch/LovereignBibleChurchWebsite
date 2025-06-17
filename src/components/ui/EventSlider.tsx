"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import EventCard from "./EventCard"
import type { EventItem } from "@/data/eventsData"
import { cn } from "@/lib/utils"

interface EventsSliderProps {
    events: EventItem[]
    autoSlideInterval?: number
    slidesToShow?: {
        mobile: number
        tablet: number
        desktop: number
    }
    title?: string
    subtitle?: string
}

export default function EventsSlider({
                                         events,
                                         autoSlideInterval = 5000,
                                         slidesToShow = { mobile: 1, tablet: 2, desktop: 3 },
                                         title = "Upcoming Events",
                                         subtitle = "Join us for these exciting upcoming events and activities",
                                     }: EventsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [slidesPerView, setSlidesPerView] = useState(slidesToShow.desktop)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 768) {
                setSlidesPerView(slidesToShow.mobile)
            } else if (width < 1024) {
                setSlidesPerView(slidesToShow.tablet)
            } else {
                setSlidesPerView(slidesToShow.desktop)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [slidesToShow])

    useEffect(() => {
        if (!isAutoPlaying || events.length <= slidesPerView) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = events.length - slidesPerView
                return prevIndex >= maxIndex ? 0 : prevIndex + 1
            })
        }, autoSlideInterval)

        return () => clearInterval(interval)
    }, [isAutoPlaying, events.length, slidesPerView, autoSlideInterval])

    const maxIndex = Math.max(0, events.length - slidesPerView)

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 3000)
    }

    const goToPrevious = () => {
        const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
        goToSlide(newIndex)
    }

    const goToNext = () => {
        const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
        goToSlide(newIndex)
    }

    const handleMouseEnter = () => setIsAutoPlaying(false)
    const handleMouseLeave = () => setIsAutoPlaying(true)

    return (
        <section className="py-16 bg-gradient-to-b from-black/80 to-black">
            <div className="container mx-auto px-4">

                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center pb-4">
                        <Calendar className="h-8 w-8 text-gray-100 mr-3" />
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-white to-teal-300 mb-2" style={{ lineHeight: "1.2", overflow: "visible" }}>
                            {title}</h2>
                    </div>
                    <p className="text-lg text-white max-w-2xl mx-auto" style={{ lineHeight: "1.5", overflow: "visible" }}>{subtitle}</p>

                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-teal-300 via-white to-teal-300 mx-auto mt-6 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    />
                </motion.div>

                <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="" ref={sliderRef}>
                        <motion.div
                            className="flex gap-6"
                            animate={{
                                x: `calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 1.5}rem)`,
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            {events.map((event, index) => (
                                <div
                                    key={event.id}
                                    className={cn(
                                        "flex-shrink-0",
                                        slidesPerView === 1 && "w-full",
                                        slidesPerView === 2 && "w-[calc(50%-0.75rem)]",
                                        slidesPerView === 3 && "w-[calc(33.333%-1rem)]",
                                    )}
                                >
                                    <EventCard
                                        event={event}
                                        index={index}
                                        isActive={index >= currentIndex && index < currentIndex + slidesPerView}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>


                    {events.length > slidesPerView && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 z-10"
                                aria-label="Previous events"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 z-10"
                                aria-label="Next events"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        </>
                    )}
                </div>

                {events.length > slidesPerView && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={cn(
                                    "w-3 h-3 rounded-full transition-all duration-300",
                                    index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400",
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}
