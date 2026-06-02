"use client"

import { Facebook, Podcast, Twitter, Video, Youtube } from "lucide-react"
import { motion } from "framer-motion"

const platforms = [
  { name: "YouTube", Icon: Youtube, description: "Watch our latest content, interviews, and services.", cta: "Subscribe", url: "https://www.youtube.com/@lovereignbiblechurch" },
  { name: "Podbean", Icon: Podcast, description: "Listen to our podcasts and audio messages anytime, anywhere.", cta: "Listen", url: "https://lovereignbiblechurch.podbean.com/" },
  { name: "TikTok", Icon: Video, description: "Catch our short-form videos and quick spiritual insights.", cta: "Follow", url: "https://www.tiktok.com/@lovereignbiblechurch" },
  { name: "Facebook", Icon: Facebook, description: "Join our community and engage with us on Facebook.", cta: "Join", url: "https://facebook.com/lovereignbiblechurch" },
  { name: "X (Twitter)", Icon: Twitter, description: "Follow us for updates, quotes, and live commentary.", cta: "Follow", url: "https://x.com/lovereignchurch" },
]

export default function StreamingPlatforms() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="orb w-72 h-72 bg-purple-700/[0.07] top-0 right-0 translate-x-1/3" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <motion.div className="mb-12" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Connect</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white">Our Streaming Platforms</h2>
          <div className="divider-glow w-40 mt-4 mb-4" />
          <p className="text-white/35 text-sm font-light">Connect with us so you never miss our latest content.</p>
        </motion.div>
        <div className="space-y-0">
          {platforms.map((p, i) => (
            <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 py-5 border-t border-white/[0.06] group cursor-pointer hover:border-white/[0.1] transition-colors"
              initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}>
              <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.07] transition-colors">
                <p.Icon className="w-5 h-5 text-white/50 group-hover:text-purple-300 transition-colors" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{p.name}</h3>
                <p className="text-xs text-white/30 font-light mt-0.5 line-clamp-1">{p.description}</p>
              </div>
              <span className="flex-shrink-0 text-xs text-white/30 group-hover:text-purple-300 transition-colors font-medium tracking-wide">{p.cta} →</span>
            </motion.a>
          ))}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  )
}
