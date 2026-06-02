"use client"

import { motion } from "framer-motion"
import { Clock, MapPin } from "lucide-react"
import { services } from "@/data/serviceData"

export default function ServiceTimes() {
  return (
    <section className="py-20 relative overflow-hidden bg-black">
      {/* Subtle background orbs */}
      <div className="orb w-80 h-80 bg-purple-700/10 -top-20 right-0" />
      <div className="orb w-60 h-60 bg-amber-500/[0.06] bottom-0 left-10" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-[0.2em] text-purple-400/80 uppercase mb-3 block">
            Weekly Schedule
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-3">
            Join Us for Worship
          </h2>
          <div className="divider-glow w-32 mt-4" />
          <p className="text-white/50 text-sm mt-4 font-light">
            Experience God&apos;s presence with us throughout the week
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className="group glass glass-hover rounded-2xl p-5 flex items-start gap-5 cursor-default"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                {/* Icon bubble */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-600/30 transition-colors duration-300">
                  <IconComponent className="h-5 w-5 text-purple-300" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-white text-sm md:text-base mb-1 group-hover:text-purple-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm font-light">{service.description}</p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1.5 text-amber-400/90 text-sm mb-1 whitespace-nowrap justify-end">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-medium text-xs">{service.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/30 text-xs whitespace-nowrap justify-end">
                    <MapPin className="h-3 w-3" />
                    <span>{service.location}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="text-center text-white/25 text-xs mt-10 font-light tracking-wider uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          We can&apos;t wait to worship with you
        </motion.p>
      </div>
    </section>
  )
}
