"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Facebook, Instagram, Twitter } from "lucide-react"

const pjw = "/logos/pjw.jpeg"

export default function AboutFounder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section ref={ref} className="relative min-h-screen bg-black flex items-center py-20 overflow-hidden">
      <div className="orb w-80 h-80 bg-purple-700/[0.07] top-0 right-0 translate-x-1/3 -translate-y-1/4" />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-5">Founder</span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-8">
              Reverend<br />John Winfred
            </h2>

            <div className="divider-glow w-32 mb-8" />

            <div className="space-y-5 text-white/50 text-base font-light leading-relaxed">
              <p>
                Rev. John Winfred is a proficient Pastor, preacher and teacher of the word of God — highly sought after on most university campuses in Ghana. His ministrations are characterized by consummate revelations in soul winning, Bible doctrine, and shepherding the flock of God.
              </p>
              <p>
                He is the founder and Senior Pastor of Lovereign Bible Church, overseeing a network of branches across the country.
              </p>

              <blockquote className="border-l-2 border-amber-500/30 pl-5 text-white/60 italic text-sm">
                &ldquo;Faith is taking the first step even when you don&rsquo;t see the whole staircase.&rdquo;
              </blockquote>

              <p>
                He is also the founder of the Young Ministers&rsquo; Network International (YMNI) and a board member of the &ldquo;Healing Jesus Campaign&rdquo;. He is married to Dr. Anita Winfred and they are blessed with two children.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-10">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Follow Reverend John Winfred</p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.facebook.com/johnwinfred.nsiahantwi", Icon: Facebook, label: "Facebook" },
                  { href: "https://www.instagram.com/john.winfred?igsh=ZHFsNzJiZnJnejNo", Icon: Instagram, label: "Instagram" },
                  { href: "https://x.com/pastorwinfred?s=11", Icon: Twitter, label: "X" },
                ].map(({ href, Icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 glass glass-hover rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative w-full max-w-sm">
              <motion.div
                className="absolute -inset-px rounded-2xl border border-white/[0.06]"
                animate={{ rotate: [-1, 1, -1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={pjw}
                alt="Reverend John Winfred"
                className="relative z-10 rounded-2xl w-full object-cover shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
