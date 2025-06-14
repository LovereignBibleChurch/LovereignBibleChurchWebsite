"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, Calendar, Sparkles, Sun, Moon } from "lucide-react"
import {services} from "@/data/serviceData";

export default function ServiceTimes() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }


  return (
      <section className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-100/20 rounded-full blur-3xl" />

        <motion.div
            className="container mx-auto px-4 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div className="text-center mb-16" variants={cardVariants}>
            <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6 },
                }}
            >
              <Clock className="h-8 w-8 text-blue-600" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Join Us for{" "}
            </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Worship</span>
            </h2>

            <motion.div
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            />

            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto font-light">
              Experience God&#39;s presence with us throughout the week
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                  <motion.div
                      key={service.id}
                      className={`group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                          service.featured ? "lg:scale-105 ring-2 ring-blue-200/50" : ""
                      }`}
                      variants={cardVariants}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.3 },
                      }}
                  >
                    {/* Background Gradient */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Featured Badge */}
                    {service.featured && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-lg">
                      Most Popular
                    </span>
                        </div>
                    )}

                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                          className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.iconBg} rounded-2xl mb-6 shadow-sm`}
                          whileHover={{
                            rotate: 360,
                            scale: 1.1,
                            transition: { duration: 0.6 },
                          }}
                      >
                        <IconComponent
                            className={`h-7 w-7 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                        />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Time */}
                      <div className="flex items-start mb-4">
                        <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{service.time}</p>
                          <p className="text-gray-600 text-sm font-medium">{service.description}</p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                        <p className="text-gray-600 font-medium">{service.location}</p>
                      </div>

                      {/* Decorative Element */}
                      <motion.div
                          className={`absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-br ${service.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                      />
                    </div>
                  </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div className="text-center mt-16" variants={cardVariants}>
            <motion.button
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
            >
              <Calendar className="h-5 w-5" />
              <span>Plan Your Visit</span>
            </motion.button>

            <p className="text-sm text-gray-500 mt-4 font-light">We can&#39;t wait to worship with you</p>
          </motion.div>

          {/* Floating Decorative Elements */}
          <motion.div
              className="absolute top-32 right-1/4 opacity-20"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
          >
            <Moon className="h-6 w-6 text-purple-400" />
          </motion.div>

          <motion.div
              className="absolute bottom-32 left-1/4 opacity-15"
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
          >
            <Sparkles className="h-8 w-8 text-blue-400" />
          </motion.div>
        </motion.div>
      </section>
  )
}
