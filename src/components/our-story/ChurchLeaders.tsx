"use client"

import { useRef, useState, useEffect } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import LeaderCard from "@/components/ui/LeaderCard"

interface LeaderItem {
  _id: string
  name: string
  title: string
  location: string
  image?: any
  bio?: string
  contactInfo?: string
  socialLinks?: any[]
  order?: number
  isActive?: boolean
}

export default function ChurchLeadership() {
  const [leaders, setLeaders] = useState<LeaderItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true })

  useEffect(() => {
    fetch("/api/leaders", { next: { revalidate: 0 } })
      .then((r) => r.json())
      .then((json) => {
        if (!json?.ok) throw new Error(json?.error || "Failed")
        setLeaders(json.leaders || [])
      })
      .catch((e) => setError(e?.message || "Failed to load"))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="orb w-80 h-80 bg-purple-700/[0.06] bottom-0 right-0 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Leadership</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">Church Pastors</h2>
          <div className="divider-glow w-36 mt-4 mb-4" />
          <p className="text-white/40 text-sm font-light">
            Serving with dedication across over 20 branches throughout the country
          </p>
        </motion.div>

        {/* Leaders grid */}
        <div ref={containerRef}>
          {error && !isLoading && (
            <p className="text-red-400/70 text-sm mb-8">{error}</p>
          )}

          {isLoading ? (
            <div className="flex items-center gap-3 py-16 text-white/30">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
              <span className="text-sm">Loading pastors&hellip;</span>
            </div>
          ) : (
            <AnimatePresence>
              {leaders.length > 0 ? (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
                >
                  {leaders.map((leader, i) => (
                    <LeaderCard key={leader._id} leader={leader} index={i} />
                  ))}
                </motion.div>
              ) : (
                <p className="text-white/30 text-sm py-10">No leaders found.</p>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Stats — plain numbers, no cards */}
        <motion.div
          className="mt-20 pt-12 border-t border-white/[0.05] grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { value: `${leaders.length}+`, label: "Church Pastors" },
            { value: "20+", label: "Branches" },
            { value: "15+", label: "Cities" },
            { value: "1,000+", label: "Members" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-white mb-1">{s.value}</p>
              <p className="text-white/30 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
