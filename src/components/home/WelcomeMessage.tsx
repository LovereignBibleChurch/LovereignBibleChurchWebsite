"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"
import { useRef } from "react"

const seats = "/backgroundImages/seats.jpeg"

export default function WelcomeMessage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden -mt-20 z-30 flex items-center">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${seats})` }}
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/10" />

      {/* Floating orbs */}
      <div className="orb w-96 h-96 bg-purple-600/15 top-1/4 -left-20 animate-pulse" />
      <div className="orb w-64 h-64 bg-amber-500/10 bottom-1/4 right-10" style={{ animationDelay: "2s" }} />

      <motion.section
        style={{ y, opacity }}
        className="relative z-20 w-full py-32"
      >
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 glass rounded-full mb-10 glow-purple"
            variants={{ hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } }}
            whileHover={{ scale: 1.1, rotate: 15, transition: { duration: 0.4 } }}
          >
            <Heart className="h-9 w-9 text-amber-400" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            <span className="text-gradient-white">This is Church.{" "}</span>
            <span className="text-gradient-gold italic">This is Home.</span>
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            className="divider-glow w-48 mx-auto mb-10"
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } } }}
          />

          {/* Body text */}
          <motion.p
            className="text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-3xl mx-auto mb-8"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            We are a{" "}
            <span className="text-amber-400 font-medium">community of believers</span>{" "}
            dedicated to serving God and spreading His love. Our church is a place where{" "}
            <span className="text-purple-300 font-medium">everyone is welcome</span>,
            regardless of where you are in your spiritual journey.
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-3xl mx-auto"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            We believe in the power of{" "}
            <span className="text-gradient-gold font-medium">faith, community, and service</span>.
            Join us as we worship together, grow in our faith, and make a positive impact in our community and beyond.
          </motion.p>
        </motion.div>
      </motion.section>
    </div>
  )
}
