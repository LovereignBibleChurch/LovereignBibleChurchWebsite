"use client"

import {motion, useInView, useScroll, useTransform} from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import {useRef} from "react";
const seats = "/backgroundImages/seats.jpeg";
export default function WelcomeMessage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

    const containerRef = useRef(null);


    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.8, 1],
        [0.7, 1, 1, 0.7],
    );


    return (
      <motion.div
          ref={containerRef}
          className="relative h-screen w-full overflow-hidden -mt-20 z-30"
          style={{ opacity }}
      >
          {/* Background image with parallax */}
          <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                  backgroundImage: `url(${seats})`,
                  y: bgY,
              }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80 z-10"></div>
      <section className="py-24 relative overflow-hidden">
        <motion.div
            className="absolute top-32 right-1/3 opacity-15"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 2 }}
        >
          <Sparkles className="h-6 w-6 text-purple-400" />
        </motion.div>

        <motion.div
            className="absolute bottom-20 left-1/3 opacity-10"
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: 4 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-sm" />
        </motion.div>

        <motion.div
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
          {/* Decorative Icon */}
          <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                rotate: 360,
                transition: { duration: 0.6 },
              }}
          >
            <Heart className="h-10 w-10 text-[#fde68a]" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" variants={itemVariants}>
          <span className="bg-gradient-to-r from-white via-gray-700 to-gray-100 bg-clip-text text-transparent">
           This is Church{" "}
          </span>
            <span className="bg-gradient-to-r from-[#fde68a] via-gray-300 to-[#fde68b] bg-clip-text text-transparent relative">
           This is Home
            <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.2 }}
            />
          </span>
          </motion.h2>

          {/* First Paragraph */}
          <motion.p
              className="text-xl md:text-2xl text-white leading-relaxed font-light max-w-3xl mx-auto"
              variants={itemVariants}
          >
            We are a{" "}
            <span className="font-medium bg-[#fde68a] bg-clip-text text-transparent">
            community of believers
          </span>{" "}
            dedicated to serving God and spreading His love. Our church is a place where{" "}
            <span className="font-medium text-[#fde68a]">everyone is welcome</span>, regardless of where you are in your
            spiritual journey.
          </motion.p>

          {/* Decorative Divider */}
          <motion.div className="flex items-center justify-center mb-8" variants={itemVariants}>
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32" />
            <motion.div
                className="mx-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
            />
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent w-32" />
          </motion.div>

          {/* Second Paragraph */}
          <motion.p
              className="text-xl md:text-2xl text-white mb-12 leading-relaxed font-light max-w-3xl mx-auto"
              variants={itemVariants}
          >
            We believe in the power of{" "}
            <span className="font-medium bg-gradient-to-r from-[#fde68a] via-gray-300 to-[#fde68b] bg-clip-text text-transparent">
            faith, community, and service
          </span>
            . Join us as we worship together, grow in our faith, and make a positive impact in our community and beyond.
          </motion.p>
        </motion.div>
      </section>
      </motion.div>
  )
}
