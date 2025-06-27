"use client"

import {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {ChevronLeft, ChevronRight, Heart, Quote} from "lucide-react"
import {testimonyData} from "@/data/testimonyData"
import TestimonySubmissionForm from "@/components/testimony/testimonySubmissionForm";


export default function TestimonyCorner() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const isProgrammaticScroll = useRef(false)

    const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false)
    

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying || isDragging) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonyData.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, isDragging])

    // Scroll to current testimony
    useEffect(() => {
        if (scrollContainerRef.current && !isDragging) {
            const container = scrollContainerRef.current
            const itemWidth = container.scrollWidth / testimonyData.length
    
            isProgrammaticScroll.current = true // 👈 set flag before scroll
    
            container.scrollTo({
                left: currentIndex * itemWidth,
                behavior: "smooth",
            })
    
            // 👇 reset flag after a short delay
            setTimeout(() => {
                isProgrammaticScroll.current = false
            }, 500) 
        }
    }, [currentIndex, isDragging])
    

    const handleScroll = () => {
        if (isProgrammaticScroll.current || isDragging) return
    
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const itemWidth = container.scrollWidth / testimonyData.length
            const newIndex = Math.round(container.scrollLeft / itemWidth)
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex)
            }
        }
    }
    

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonyData.length - 1 : prevIndex - 1))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonyData.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
                duration: 0.6,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
            {/* Background Elements */}
            <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-purple-100/20 rounded-full blur-3xl" />

            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
                    <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl mb-4 sm:mb-6 border border-white/20"
                        whileHover={{
                            scale: 1.1,
                            rotate: 360,
                            transition: { duration: 0.6 },
                        }}
                    >
                        <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
                        <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            Testimony{" "}
                        </span>
                        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Corner</span>
                    </h2>

                    <motion.div
                        className="w-16 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    <p className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto font-light px-4">
                        Hear the amazing stories of transformation and faith from our church family
                    </p>
                </motion.div>

                {/* Main Testimony Display */}
                <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-lg relative max-w-4xl mx-auto"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-3 sm:-top-4 left-6 sm:left-8">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                                    <Quote className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </div>
                            </div>

                            {/* Testimony Text */}
                            <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6 sm:mb-8 italic">
                                &#34;{testimonyData[currentIndex].testimony}&#34;
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                                        <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{testimonyData[currentIndex].name}</h4>
                                        <p className="text-gray-600 text-xs sm:text-sm">{testimonyData[currentIndex].role}</p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500">
                                    <p>{testimonyData[currentIndex].date}</p>
                                    <p>{testimonyData[currentIndex].location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Scrollable Testimony List */}
                <motion.div className="w-full max-w-md sm:max-w-none mx-auto relative lg:px-4 place-self-center sm:px-0" variants={itemVariants}>
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide items-center pb-4 snap-x snap-mandatory"
                        onScroll={handleScroll}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {testimonyData.map((testimony, index) => (
                            <motion.div
                                key={testimony.id}
                                className={`flex-shrink-0 w-[95%] sm:w-80 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 shadow-sm hover:shadow-lg transition-all duration-300 snap-start cursor-pointer ${
                                    index === currentIndex ? "ring-2 ring-amber-400/50 bg-white/80" : ""
                                }`}
                                
                                onClick={() => setCurrentIndex(index)}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-start mb-3 sm:mb-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                                        <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{testimony.name}</h4>
                                        <p className="text-gray-600 text-xs sm:text-sm truncate">{testimony.role}</p>
                                    </div>
                                </div>

                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 mb-3 sm:mb-4">&#34;{testimony.testimony}&#34;</p>

                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span className="truncate">{testimony.date}</span>
                                    <span className="truncate ml-2">{testimony.location}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Arrows - Hidden on mobile */}
                    <button
                        onClick={goToPrevious}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-amber-600 hover:shadow-xl transition-all duration-300 z-10"
                        aria-label="Previous testimony"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white shadow-lg rounded-full items-center justify-center text-gray-600 hover:text-amber-600 hover:shadow-xl transition-all duration-300 z-10"
                        aria-label="Next testimony"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </motion.div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-6 sm:mt-8 gap-1.5 sm:gap-2">
                    {testimonyData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "bg-amber-500 w-6 sm:w-8" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to testimony ${index + 1}`}
                        />
                    ))}
                </div>

                {/* CTA */}
                <motion.div className="text-center mt-10 sm:mt-12 px-4" variants={itemVariants}>
                    <motion.button
                        onClick={() => setIsSubmissionFormOpen(true)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Share Your Story</span>
                    </motion.button>

                    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 font-light">We&#39;d love to hear how God is working in your life</p>
                </motion.div>

                {/* Testimony Submission Form Modal */}
                <TestimonySubmissionForm isOpen={isSubmissionFormOpen} onClose={() => setIsSubmissionFormOpen(false)} />
            </motion.div>
        </section>
    )
}