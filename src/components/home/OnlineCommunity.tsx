"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Facebook, Instagram, Youtube, Globe, MessageCircle, Video, Music, Headphones } from "lucide-react"

// Custom TikTok Icon (since it's not in Lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
    </svg>
)

// Custom X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)

// Custom Podbean Icon
const PodbeanIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
)

// CountUp component for animating numbers
const CountUp = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number
        let animationFrame: number

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime

            if (progress < duration) {
                const percentage = progress / duration
                // Easing function for smoother animation
                const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
                setCount(Math.floor(easeOutQuart * end))
                animationFrame = requestAnimationFrame(updateCount)
            } else {
                setCount(end)
            }
        }

        animationFrame = requestAnimationFrame(updateCount)

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [end, duration])

    return (
        <span>
      {prefix}
            {count.toLocaleString()}
            {suffix}
    </span>
    )
}

export default function OnlineCommunity() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const socialPlatforms = [
        {
            name: "YouTube",
            icon: Youtube,
            url: "#",
            color: "text-[#FF0000] hover:text-[#e50000]",
            bgColor: "bg-red-50 hover:bg-red-100",
        },
        {
            name: "Podbean",
            icon: PodbeanIcon,
            url: "#",
            color: "text-[#FF6B35] hover:text-[#e55a2b]",
            bgColor: "bg-orange-50 hover:bg-orange-100",
        },
        {
            name: "TikTok",
            icon: TikTokIcon,
            url: "#",
            color: "text-[#000000] hover:text-[#333333]",
            bgColor: "bg-gray-50 hover:bg-gray-100",
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "#",
            color: "text-[#E4405F] hover:text-[#d73653]",
            bgColor: "bg-pink-50 hover:bg-pink-100",
        },
        {
            name: "Facebook",
            icon: Facebook,
            url: "#",
            color: "text-[#1877F2] hover:text-[#0e6eef]",
            bgColor: "bg-blue-50 hover:bg-blue-100",
        },
        {
            name: "X",
            icon: XIcon,
            url: "#",
            color: "text-[#000000] hover:text-[#333333]",
            bgColor: "bg-gray-50 hover:bg-gray-100",
        },
    ]

    const stats = [
        {
            title: "Sermons",
            value: 520,
            icon: Video,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "Messages",
            value: 1250,
            icon: MessageCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "Podcasts",
            value: 180,
            icon: Headphones,
            color: "text-amber-600",
            bgColor: "bg-amber-100",
        },
    ]

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-100/20 rounded-full blur-3xl" />

            <motion.div
                className="container mx-auto px-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-16" variants={itemVariants}>
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20"
                        whileHover={{
                            scale: 1.1,
                            rotate: 360,
                            transition: { duration: 0.6 },
                        }}
                    >
                        <Globe className="h-8 w-8 text-blue-600" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Join Our{" "}
            </span>
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Online Community
            </span>
                    </h2>

                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto font-light">
                        Connect with us on social media and access our growing library of spiritual content
                    </p>
                </motion.div>

                {/* Social Media Icons */}
                <motion.div className="flex justify-center items-center gap-4 mb-16" variants={itemVariants}>
                    {socialPlatforms.map((platform, index) => {
                        const IconComponent = platform.icon
                        return (
                            <motion.a
                                key={platform.name}
                                href={platform.url}
                                className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                                whileHover={{ y: -3, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                variants={itemVariants}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={platform.name}
                            >
                                <IconComponent className="h-7 w-7" />

                                {/* Tooltip */}
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    {platform.name}
                                </div>
                            </motion.a>
                        )
                    })}
                </motion.div>

                {/* Stats with Count Up */}
                <motion.div
                    className="bg-transparent backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg"
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
                        Our Growing Content Library
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <motion.div
                                    key={stat.title}
                                    className="flex flex-col items-center text-center"
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mb-4`}>
                                        <IconComponent className={`h-8 w-8 ${stat.color}`} />
                                    </div>

                                    <h4 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        <CountUp end={stat.value} prefix="" suffix="+" />
                                    </h4>

                                    <p className="text-gray-600 font-medium">{stat.title}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div className="text-center mt-12" variants={itemVariants}>
                    <motion.a
                        href="#"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Music className="h-5 w-5" />
                        <span>Explore Our Content</span>
                    </motion.a>

                    <p className="text-sm text-gray-500 mt-4 font-light">New content added weekly</p>
                </motion.div>
            </motion.div>
        </section>
    )
}
