"use client"

import { motion } from "framer-motion"
import { Clock, MapPin } from "lucide-react"
import { services } from "@/data/serviceData"

export default function ServiceTimes() {
  return (
    <section className="py-12 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Join Us for Worship</h2>
          <p className="text-gray-400 text-sm">Experience God's presence with us throughout the week</p>
        </motion.div>

        {/* Services List */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.id}
                className="group flex items-start gap-4 p-4 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-gray-900/30 transition-all duration-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-white text-sm md:text-base mb-1 group-hover:text-gray-100 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm">{service.description}</p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-right">
                  <div className="flex items-center gap-1 text-gray-300 text-sm mb-1 whitespace-nowrap">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{service.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs whitespace-nowrap">
                    <MapPin className="h-3 w-3" />
                    <span>{service.location}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom message */}
        <motion.p
          className="text-center text-gray-500 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          We can't wait to worship with you
        </motion.p>
      </div>
    </section>
  )
}
