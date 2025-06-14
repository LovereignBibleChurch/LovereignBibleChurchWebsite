"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function FounderStorySection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.2 })
    const textInView = useInView(textRef, { once: false, amount: 0.5 })
    const [isMobile, setIsMobile] = useState(false)

    // Check if mobile on mount and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile)

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    // Parallax effect for background
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.6, 1, 1, 0.6])

    // Text animation variants
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    }

    // Staggered text animation for paragraph
    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.015, // Slightly faster stagger
                delayChildren: 0.3,
                duration: 0.5,
            },
        },
    }

    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
    }

    // Split text into words for animation
    const text =
        "Pastor John Winfred received a divine calling to spread the Gospel and build a strong faith community. With prayer and dedication, the church was established on 1st December 2013. What started as a small gathering grew into a thriving place of worship and today continues to fulfil its mission of bringing hope, healing and transformation through Christ."
    const words = text.split(" ")

    // Background images
    const founderStoryMobile = "/images/founder/founder-story-mobile.jpg"
    const founderStoryDesktop = "/images/founder/founder-story-desktop.jpg"

    // Dynamically select background image based on screen size
    const backgroundImage = isMobile ? founderStoryMobile : founderStoryDesktop

    return (
        <motion.div ref={containerRef} className="relative h-screen w-full overflow-hidden" style={{ opacity }}>
            {/* Background Image with Parallax */}
            <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
                <Image
                    src={backgroundImage || "/placeholder.svg"}
                    alt="Founder Background"
                    fill
                    priority
                    className="object-cover"
                />
            </motion.div>

            {/* Floating elements for visual interest */}
            {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute w-1 h-1 rounded-full bg-purple-300/30"
                    initial={{
                        x: 50 + index * 100,
                        y: 100 + index * 50,
                        opacity: 0,
                    }}
                    animate={{
                        y: [100 + index * 50, 50 + index * 50],
                        opacity: [0, 0.4, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 8 + index * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 2,
                        ease: "easeInOut",
                    }}
                    style={{
                        left: `${20 + index * 20}%`,
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-12 max-w-5xl mx-auto">
                {/* Decorative line */}
                <motion.div
                    className="w-16 h-px bg-purple-300 mb-8"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Heading with subtle text shadow */}
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-4xl md:text-6xl font-light tracking-wider text-white drop-shadow-sm"
                >
                    <span className="font-light">Founder&#39;s</span>{" "}
                    <span className="text-purple-200 italic font-extralight">Story</span>
                </motion.h1>

                {/* Description with character animation */}
                <motion.div
                    ref={textRef}
                    variants={textVariants}
                    initial="hidden"
                    animate={textInView ? "visible" : "hidden"}
                    className="mt-10 md:mt-16 max-w-3xl"
                >
                    <p className="text-sm md:text-base leading-relaxed text-white font-bold">
                        {words.map((word, index) => (
                            <span key={index}>
                <motion.span variants={letterVariants} className="inline-block">
                  {word}
                </motion.span>{" "}
              </span>
                        ))}
                    </p>
                </motion.div>

                {/* Call-to-Action Button with enhanced animation */}
                <Link href="/founder">
                    <motion.button
                        className="mt-10 md:mt-16 px-8 py-2.5 border border-purple-300/30 text-purple-100 rounded-full text-xs md:text-sm tracking-widest uppercase font-light hover:bg-purple-900/20 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(139, 92, 246, 0.15)",
                            borderColor: "rgba(139, 92, 246, 0.5)",
                            boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Learn More
                    </motion.button>
                </Link>
            </div>

            {/* Subtle scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div
                    className="w-5 h-9 border border-white/30 rounded-full flex justify-center p-1"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    <motion.div
                        className="w-1 h-1.5 bg-white/70 rounded-full"
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
                <motion.p
                    className="text-white/50 text-xs mt-2 font-light tracking-wider"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    SCROLL
                </motion.p>
            </motion.div>
        </motion.div>
    )
}
