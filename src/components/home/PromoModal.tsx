"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const promoImages = ["/church_flyers/kindle.jpeg"]

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMultipleImages = promoImages.length > 1

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  const nextSlide = useCallback(() => {
    if (!hasMultipleImages) return
    setCurrentIndex((prev) => (prev === promoImages.length - 1 ? 0 : prev + 1))
  }, [hasMultipleImages])

  const prevSlide = useCallback(() => {
    if (!hasMultipleImages) return
    setCurrentIndex((prev) => (prev === 0 ? promoImages.length - 1 : prev - 1))
  }, [hasMultipleImages])

  useEffect(() => {
    if (isOpen && hasMultipleImages) {
      const interval = setInterval(nextSlide, 5000) // Auto-slide every 5 seconds
      return () => clearInterval(interval)
    }
  }, [isOpen, hasMultipleImages, nextSlide])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Slideshow Container */}
            <div className="relative aspect-[4/5] sm:aspect-video w-full overflow-hidden bg-gray-900">
              {hasMultipleImages ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={promoImages[currentIndex]}
                      alt={`Promo ${currentIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0">
                  <Image
                    src={promoImages[0]}
                    alt="Promo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevSlide()
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextSlide()
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                  {promoImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex ? "w-5 bg-white" : "w-2 bg-white/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
