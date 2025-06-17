"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Flyer {
  img: string
  alt: string
}

interface TrilogyModalProps {
  isOpen: boolean
  onClose: () => void
  flyers: Flyer[]
  current: number
  setCurrent: (idx: number) => void
}

export default function TrilogyModal({
  isOpen,
  onClose,
  flyers,
  current,
  setCurrent,
}: TrilogyModalProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Autoplay: move to next flyer every 4 seconds (slightly longer for better UX)
  useEffect(() => {
    if (!isOpen) return
    intervalRef.current = setInterval(() => {
      setCurrent((current + 1) % flyers.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen, current, flyers.length, setCurrent])

  const next = () => setCurrent((current + 1) % flyers.length)
  const prev = () => setCurrent((current - 1 + flyers.length) % flyers.length)

  // For background blur
  const bgImg = flyers[current]?.img

  // Helper to get index with wrap-around
  const getIndex = (offset: number) => (current + offset + flyers.length) % flyers.length

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Enhanced blurred background with smooth transitions */}
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(32px) brightness(0.3) saturate(1.2)",
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="relative bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl w-full mx-4 z-10 border border-white/20"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200 group border border-white/30"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white group-hover:text-white drop-shadow-lg" />
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl">
              The Trilogy 
            </h2>
            <p className="text-white/90 text-lg font-medium drop-shadow-lg">
              Discover the complete collection
            </p>
          </div>

          {/* Main carousel section */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
            {/* Previous button */}
            <button
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg border border-white/30"
              onClick={e => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous book"
            >
              <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
            </button>

            {/* Books carousel */}
            <div className="flex items-end gap-4 md:gap-8 justify-center min-h-[400px]">
              <AnimatePresence mode="wait">
                {[-1, 0, 1].map(offset => {
                  const idx = getIndex(offset)
                  const isFocused = offset === 0
                  const book = flyers[idx]
                  
                  return (
                    <motion.div
                      key={`${idx}-${current}-${offset}`}
                      className={`relative cursor-pointer ${
                        isFocused ? "z-20" : "z-10"
                      }`}
                      style={{
                        filter: isFocused ? "none" : "brightness(0.7) saturate(0.8)",
                      }}
                      initial={{ 
                        opacity: 0,
                        scale: isFocused ? 0.9 : 0.7,
                        y: 30,
                        rotateY: offset === -1 ? 45 : offset === 1 ? -45 : 0
                      }}
                      animate={{
                        opacity: isFocused ? 1 : 0.6,
                        scale: isFocused ? 1.1 : 0.8,
                        y: isFocused ? -10 : 20,
                        rotateY: offset === -1 ? 25 : offset === 1 ? -25 : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                        y: 40,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.6 },
                        y: { duration: 0.6 },
                        rotateY: { duration: 0.8 }
                      }}
                      onClick={() => !isFocused && setCurrent(idx)}
                      whileHover={!isFocused ? { 
                        scale: 0.85, 
                        opacity: 0.8,
                        transition: { duration: 0.2 }
                      } : {}}
                      whileTap={!isFocused ? { scale: 0.75 } : {}}
                    >
                    {/* Book container with enhanced styling */}
                    <motion.div
                      className={`relative rounded-2xl overflow-hidden ${
                        isFocused
                          ? "shadow-2xl ring-4 ring-amber-400 ring-opacity-60"
                          : "shadow-lg"
                      }`}
                      style={{
                        background: isFocused
                          ? "linear-gradient(145deg, #fef3c7, #fde68a)"
                          : "transparent",
                        padding: isFocused ? "8px" : "4px",
                      }}
                      animate={{
                        background: isFocused
                          ? "linear-gradient(145deg, #fef3c7, #fde68a)"
                          : "transparent",
                        padding: isFocused ? "8px" : "4px",
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <motion.img
                        src={book?.img}
                        alt={book?.alt}
                        className="rounded-xl object-cover"
                        animate={{
                          width: isFocused ? "16rem" : "12rem",
                          height: isFocused ? "24rem" : "18rem",
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        style={{
                          boxShadow: isFocused
                            ? "0 20px 40px rgba(0,0,0,0.3)"
                            : "0 10px 20px rgba(0,0,0,0.2)",
                        }}
                      />
                      
                      {/* Focused book label */}
                      <AnimatePresence>
                        {isFocused && (
                          <motion.div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg border border-white/50"
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            Featured
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Book title */}
                    <motion.div 
                      className="mt-6 text-center"
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <motion.h3
                        className={`font-bold drop-shadow-lg ${
                          isFocused
                            ? "text-xl md:text-2xl text-white"
                            : "text-base md:text-lg text-white/80"
                        }`}
                        animate={{
                          fontSize: isFocused ? "1.5rem" : "1rem",
                          opacity: isFocused ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {book?.alt}
                      </motion.h3>
                    </motion.div>
                  </motion.div>
                )
              })}
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg border border-white/30"
              onClick={e => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next book"
            >
              <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
            </button>
          </div>

          {/* Call to action */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-2xl">
                📚 Complete Your Collection!
              </h3>
            </motion.div>
            <p className="text-white/90 text-lg drop-shadow-lg">
              Get all three books in the acclaimed trilogy
            </p>
          </div>

          {/* Enhanced pagination dots */}
          <div className="flex justify-center gap-3">
            {flyers.map((_, idx) => (
              <button
                key={idx}
                className={`transition-all duration-300 rounded-full border border-white/30 ${
                  idx === current
                    ? "w-8 h-4 bg-white shadow-lg"
                    : "w-4 h-4 bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to book ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}