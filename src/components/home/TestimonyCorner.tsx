"use client"

import {useEffect, useRef, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {ChevronLeft, ChevronRight, Heart, Quote} from "lucide-react"
import TestimonySubmissionForm from "@/components/testimony/testimonySubmissionForm";
import { getTestimonials, getImageUrl, formatDate } from "@/sanity/lib/queries";
import { use } from "react";


interface TestimonyCornerProps {
  testimonials?: any[];
}

export default function TestimonyCorner({ testimonials }: TestimonyCornerProps) {
    // Use provided testimonials or fetch from Sanity
    const [testimonyData, setTestimonyData] = useState(testimonials || []);
    const [isLoading, setIsLoading] = useState(!testimonials);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const isProgrammaticScroll = useRef(false)

    const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false)
    

    // Fetch testimonials from Sanity if not provided
    useEffect(() => {
        if (!testimonials) {
            setIsLoading(true);
            getTestimonials()
                .then((data) => {
                    setTestimonyData(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching testimonials:', error);
                    setIsLoading(false);
                });
        }
    }, [testimonials]);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying || isDragging || testimonyData.length === 0) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonyData.length)
        }, 6000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, isDragging, testimonyData.length])

    // Scroll to current testimony
    useEffect(() => {
        if (scrollContainerRef.current && !isDragging && testimonyData.length > 0) {
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
    }, [currentIndex, isDragging, testimonyData.length])
    

    const handleScroll = () => {
        if (isProgrammaticScroll.current || isDragging || testimonyData.length === 0) return
    
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
        if (testimonyData.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonyData.length - 1 : prevIndex - 1))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 5000)
    }

    const goToNext = () => {
        if (testimonyData.length === 0) return;
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

    if (isLoading) {
        return (
            <section className="py-16 relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 glass rounded-2xl mb-5">
                        <Quote className="h-6 w-6 text-amber-400" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                        <span className="text-gradient-white">Testimony </span>
                        <span className="text-gradient-gold">Corner</span>
                    </h2>
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-amber-400"></div>
                        <span className="ml-3 text-white/40 text-sm">Loading testimonials...</span>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonyData.length === 0) {
        return (
            <section className="py-16 relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 glass rounded-2xl mb-5">
                        <Quote className="h-6 w-6 text-amber-400" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                        <span className="text-gradient-white">Testimony </span>
                        <span className="text-gradient-gold">Corner</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-2">No testimonials available at the moment.</p>
                    <p className="text-white/30 text-sm mb-6">Be the first to share your story!</p>
                    <motion.button
                        onClick={() => setIsSubmissionFormOpen(true)}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-2xl font-medium transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart className="h-4 w-4" />
                        <span>Share Your Story</span>
                    </motion.button>
                </div>
                <TestimonySubmissionForm isOpen={isSubmissionFormOpen} onClose={() => setIsSubmissionFormOpen(false)} />
            </section>
        );
    }
    return (
        <section className="py-16 relative overflow-hidden bg-black">
            {/* Background orbs */}
            <div className="orb w-80 h-80 bg-amber-500/[0.07] top-0 right-0" />
            <div className="orb w-64 h-64 bg-purple-600/[0.08] bottom-0 left-0" />

            <motion.div
                className="container mx-auto px-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-12" variants={itemVariants}>
                    <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 glass rounded-2xl mb-5 glow-gold cursor-default"
                        whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.6 } }}
                    >
                        <Quote className="h-6 w-6 text-amber-400" />
                    </motion.div>

                    <span className="text-xs font-bold tracking-[0.2em] text-amber-400/80 uppercase block mb-4">
                        Testimonies
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                        <span className="text-gradient-white">Testimony </span>
                        <span className="text-gradient-gold">Corner</span>
                    </h2>

                    <div className="divider-glow w-40 mx-auto mb-5" />

                    <p className="text-white/50 text-sm md:text-base font-light max-w-xl mx-auto">
                        Hear the amazing stories of transformation and faith from our church family
                    </p>
                </motion.div>

                {/* Main Testimony Display */}
                <motion.div className="mb-8" variants={itemVariants}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.45 }}
                            className="glass rounded-2xl md:rounded-3xl p-6 md:p-10 relative max-w-3xl mx-auto"
                            style={{ boxShadow: "0 0 40px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255,255,255,0.06)" }}
                        >
                            <div className="absolute -top-3 left-6">
                                <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center">
                                    <Quote className="h-3 w-3 text-black" />
                                </div>
                            </div>

                            <blockquote className="font-display text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6 italic">
                                &#34;{testimonyData[currentIndex].testimony}&#34;
                            </blockquote>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-white/[0.06]">
                                <div className="flex items-center gap-3">
                                    {testimonyData[currentIndex].image ? (
                                        <img
                                            src={getImageUrl(testimonyData[currentIndex].image, 80, 80)}
                                            alt={testimonyData[currentIndex].name}
                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-amber-500/15 rounded-full flex items-center justify-center ring-2 ring-amber-500/20">
                                            <Heart className="h-4 w-4 text-amber-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-white text-sm">{testimonyData[currentIndex].name}</h4>
                                        <p className="text-white/40 text-xs">{testimonyData[currentIndex].role}</p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-white/30">
                                    <p>{testimonyData[currentIndex].date ? formatDate(testimonyData[currentIndex].date) : testimonyData[currentIndex].date}</p>
                                    <p>{testimonyData[currentIndex].location}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Scrollable Testimony Strip */}
                <motion.div className="w-full max-w-md sm:max-w-none mx-auto relative sm:px-4" variants={itemVariants}>
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-3 overflow-x-auto items-center pb-3 snap-x snap-mandatory"
                        onScroll={handleScroll}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {testimonyData.map((testimony, index) => (
                            <motion.div
                                key={testimony._id}
                                onClick={() => setCurrentIndex(index)}
                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                className={`flex-shrink-0 w-[92%] sm:w-72 glass rounded-xl p-4 snap-start cursor-pointer transition-all duration-300 ${
                                    index === currentIndex
                                        ? "ring-1 ring-amber-500/40"
                                        : "hover:bg-white/[0.06]"
                                }`}
                            >
                                <div className="flex items-start mb-3 gap-2">
                                    {testimony.image ? (
                                        <img
                                            src={getImageUrl(testimony.image, 60, 60)}
                                            alt={testimony.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-amber-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Heart className="h-3.5 w-3.5 text-amber-400" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-white text-xs truncate">{testimony.name}</h4>
                                        <p className="text-white/35 text-xs truncate">{testimony.role}</p>
                                    </div>
                                </div>
                                <p className="text-white/55 text-xs leading-relaxed line-clamp-3 mb-3 italic">
                                    &#34;{testimony.testimony}&#34;
                                </p>
                                <div className="flex justify-between items-center text-[10px] text-white/25">
                                    <span className="truncate">{testimony.date ? formatDate(testimony.date) : testimony.date}</span>
                                    <span className="truncate ml-2">{testimony.location}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={goToPrevious}
                        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 glass rounded-full items-center justify-center text-white/50 hover:text-amber-400 transition-colors z-10 cursor-pointer"
                        aria-label="Previous testimony"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 glass rounded-full items-center justify-center text-white/50 hover:text-amber-400 transition-colors z-10 cursor-pointer"
                        aria-label="Next testimony"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </motion.div>

                {/* Dots */}
                <div className="flex justify-center mt-6 gap-1.5">
                    {testimonyData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-1 rounded-full transition-all duration-400 cursor-pointer ${
                                index === currentIndex ? "w-8 bg-amber-400" : "w-2 bg-white/15 hover:bg-white/30"
                            }`}
                            aria-label={`Go to testimony ${index + 1}`}
                        />
                    ))}
                </div>

                {/* CTA */}
                <motion.div className="text-center mt-10" variants={itemVariants}>
                    <motion.button
                        onClick={() => setIsSubmissionFormOpen(true)}
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
                        whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(245,158,11,0.3)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <Heart className="h-4 w-4" />
                        <span>Share Your Story</span>
                    </motion.button>
                    <p className="text-white/25 text-xs mt-3 font-light">We&apos;d love to hear how God is working in your life</p>
                </motion.div>
            </motion.div>

            {/* Testimony Submission Form Modal */}
            <TestimonySubmissionForm isOpen={isSubmissionFormOpen} onClose={() => setIsSubmissionFormOpen(false)} />
        </section>
    )
}