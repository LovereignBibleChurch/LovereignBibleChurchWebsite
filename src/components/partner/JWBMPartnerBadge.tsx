"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import PartnerForm from "./JWBMPartnerForm"

export default function PartnerBadge() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            {/* Floating Badge */}
            <motion.div
                className="fixed right-0 top-2/3 -translate-y-1/2 z-40 cursor-pointer"
                initial={{ x: "50%" }}
                animate={{ x: isHovered ? "0%" : "50%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsFormOpen(true)}
            >
                <div className="relative">
                    {/* Main Badge */}
                    <div className="bg-gradient-to-l from-purple-600 via-purple-700 to-purple-800 text-white
                          px-4 py-4 rounded-l-xl shadow-xl border-l-2 border-purple-400
                          sm:px-3 sm:py-3 sm:rounded-l-lg">
                        <motion.div
                            className="w-10 h-10 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        >
                            <Heart className="h-5 w-5 sm:h-4 sm:w-4 text-white" />
                        </motion.div>
                    </div>

                    {/* Animated Sparkles */}
                    <motion.div
                        className="absolute -top-1 -left-1"
                        animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <Sparkles className="h-3 w-3 text-yellow-300 sm:h-2 sm:w-2" />
                    </motion.div>

                    <motion.div
                        className="absolute -bottom-1 -right-1"
                        animate={{ scale: [0, 1, 0], rotate: [360, 180, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            delay: 1.5,
                        }}
                    >
                        <Sparkles className="h-2 w-2 text-yellow-300 sm:h-1 sm:w-1" />
                    </motion.div>

                    {/* Pulse Effect */}
                    <motion.div
                        className="absolute inset-0 bg-purple-500/30 rounded-l-xl sm:rounded-l-lg"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Hover Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute right-full top-1/2 -translate-y-1/2 mr-3
                           bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs
                           whitespace-nowrap shadow-lg"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                Partner with JWBM today!
                                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Partner Form Modal */}
            <PartnerForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    )
}
