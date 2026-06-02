"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"

const milestones = [
  { year: "2003", label: "The Calling", desc: "Received divine calling to ministry" },
  { year: "2013", label: "Church Founded", desc: "Established on December 1st with 12 members" },
  { year: "2018", label: "Community Growth", desc: "Expanded to over 1,000 members" },
  { year: "2025", label: "Global Reach", desc: "Ministry now touches lives worldwide" },
]

export default function FounderStorySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 bg-black relative overflow-hidden">
      <div className="orb w-72 h-72 bg-purple-700/[0.07] top-0 left-0 -translate-x-1/3 -translate-y-1/3" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Our Foundation</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white">
            The Founder&rsquo;s Journey
          </h2>
          <div className="divider-glow w-40 mt-5" />
        </motion.div>

        {/* Two-column: photo + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">

          {/* Photo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm">
              <Image
                src="/logos/pjw.jpeg"
                alt="Pastor John Winfred"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-white text-lg font-medium">Pastor John Winfred</p>
                <p className="text-white/50 text-sm mt-1">Founder & Senior Pastor</p>
              </div>
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <blockquote className="font-display text-xl italic text-amber-400/80 mb-8 leading-relaxed border-l-2 border-amber-500/30 pl-5">
              &ldquo;For the gifts and calling of God are without repentance&rdquo;
              <span className="block text-xs text-white/30 mt-2 not-italic">Romans 11:29</span>
            </blockquote>

            <div className="space-y-6 text-white/55 text-base font-light leading-relaxed">
              <p>
                In 2003, Pastor John Winfred began a ministry journey that would change countless lives. Through prayer and unwavering faith, he felt God&rsquo;s direction to establish a church that would make a people ready for Him.
              </p>
              <p>
                What started as a small gathering of 12 faithful believers on December 1st, 2013, has grown into a thriving spiritual family spanning over 20 branches across the country.
              </p>
              <p>
                He is also the founder of the Young Ministers&rsquo; Network International (YMNI) and a board member of the Healing Jesus Campaign, an international evangelistic network.
              </p>
            </div>

            <Link
              href="/founder"
              className="inline-flex items-center gap-2 mt-10 text-sm font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
            >
              Read the full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <p className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-10">Milestones of Faith</p>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 top-3 bottom-3 w-px bg-white/[0.06] hidden md:block" style={{ left: "2.75rem" }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex items-start gap-6 md:gap-10"
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black relative z-10">
                    <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                  </div>
                  <div className="pt-1">
                    <span className="text-xs text-amber-400/60 font-bold tracking-widest uppercase">{m.year}</span>
                    <h4 className="text-white font-medium mt-0.5">{m.label}</h4>
                    <p className="text-white/35 text-sm mt-1 font-light">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
