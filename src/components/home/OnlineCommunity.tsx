"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Facebook, Globe, Headphones, Instagram, MessageCircle, Music, PodcastIcon, Video, Youtube } from "lucide-react"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const CountUp = ({ end, duration = 2500, suffix = "", delay = 0 }: { end: number; duration?: number; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    const timer = setTimeout(() => {
      let start: number
      let raf: number
      const step = (ts: number) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(ease * end))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      return () => cancelAnimationFrame(raf)
    }, delay)
    return () => clearTimeout(timer)
  }, [started, end, duration, delay])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: "-80px" }}
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  )
}

export default function OnlineCommunity() {
  const socialPlatforms = [
    { name: "YouTube", icon: Youtube, url: "https://youtube.com/@lovereignbiblechurch?si=lExgqZKahNHcNtxS" },
    { name: "Podbean", icon: PodcastIcon, url: "https://lovereignbiblechurch.podbean.com/?source=ad" },
    { name: "TikTok", icon: TikTokIcon, url: "https://www.tiktok.com/@lovereignbiblechurch" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/lovereignbiblechurch" },
    { name: "Facebook", icon: Facebook, url: "http://facebook.com/LOVEREIGNBIBLECHURCH" },
    { name: "X", icon: XIcon, url: "https://x.com/lovereignchurch" },
  ]

  const stats = [
    { title: "Sermons", value: 2000, icon: Video },
    { title: "Messages", value: 1500, icon: MessageCircle },
    { title: "Podcasts", value: 500, icon: Headphones },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background orbs */}
      <div className="orb w-[500px] h-[500px] bg-purple-700/[0.08] top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      <div className="orb w-80 h-80 bg-amber-500/[0.05] bottom-0 left-0 -translate-x-1/4 translate-y-1/4" />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 glass rounded-2xl mb-6 glow-purple cursor-default"
            whileHover={{ scale: 1.08, rotate: 360, transition: { duration: 0.6 } }}
          >
            <Globe className="h-7 w-7 text-purple-300" />
          </motion.div>

          <span className="text-xs font-bold tracking-[0.2em] text-purple-400/80 uppercase block mb-4">
            Connect With Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-5">
            <span className="text-gradient-white">Join Our </span>
            <span className="text-gradient-purple">Online Community</span>
          </h2>
          <div className="divider-glow w-48 mx-auto mb-6" />
          <p className="text-white/50 text-base md:text-lg font-light max-w-xl mx-auto">
            Connect with us on social media and access our growing library of spiritual content
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                title={platform.name}
                className="group relative flex items-center justify-center w-12 h-12 rounded-2xl glass glass-hover text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{platform.name}</span>
                {/* Tooltip */}
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 glass text-white/80 text-[10px] px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {platform.name}
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="glass rounded-3xl p-8 md:p-10 max-w-3xl mx-auto mb-12"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
        >
          <h3 className="font-display text-xl md:text-2xl font-semibold text-center mb-8 text-gradient-white">
            Our Growing Content Library
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  className="flex flex-col items-center text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/25 group-hover:border-purple-500/40 transition-all duration-300">
                    <Icon className="h-6 w-6 text-purple-300" />
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient-gold">
                    <CountUp end={stat.value} suffix="+" delay={index * 200} />
                  </div>
                  <p className="text-white/50 text-sm font-medium">{stat.title}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        >
          <motion.a
            href="/media"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass glass-hover text-white font-medium text-base border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer glow-purple"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Music className="h-5 w-5 text-purple-300" />
            <span>Explore Our Content</span>
          </motion.a>
          <p className="text-white/25 text-xs mt-4 font-light tracking-wider uppercase">
            New content added weekly
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
