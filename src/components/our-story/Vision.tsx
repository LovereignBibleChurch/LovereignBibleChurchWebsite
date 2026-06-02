"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div ref={ref} className="relative py-32 bg-black overflow-hidden flex items-center justify-center">
      {/* Single ambient orb */}
      <div className="orb w-[600px] h-[600px] bg-amber-500/[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Vertical accent lines */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-white/[0.04]"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-px h-full bg-white/[0.04]"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          className="text-xs font-bold tracking-[0.25em] text-amber-400/60 uppercase mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Our Vision
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="divider-glow w-full mb-12" />

          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light italic leading-relaxed text-white/90">
            &ldquo;Making ready a people prepared for the Lord&rdquo;
          </p>

          <div className="divider-glow w-full mt-12 mb-8" />
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-amber-400/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Luke 1:17
        </motion.p>
      </div>
    </div>
  )
}
