"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Headphones, Youtube, Calendar, Clock } from "lucide-react"
import PropTypes from "prop-types"
import {podbeanMessages, youtubeMessages} from "@/data/messagesData";


export default function SermonMessages() {
    const [activeTab, setActiveTab] = useState("podbean")
    const [hoveredItem, setHoveredItem] = useState(null)

    return (
        <div className="w-full bg-black text-white px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Latest Sermons
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our recent messages from Sunday services and special events.
                    </p>
                </div>

                {/* Minimalist Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("podbean")}
                            className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                                activeTab === "podbean" ? "text-gray-300" : "text-gray-500 hover:text-gray-400"
                            }`}
                        >
              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Podbean</span>
              </span>
                            {activeTab === "podbean" && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"
                                    initial={false}
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("youtube")}
                            className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                                activeTab === "youtube" ? "text-gray-300" : "text-gray-500 hover:text-gray-400"
                            }`}
                        >
              <span className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span>YouTube</span>
              </span>
                            {activeTab === "youtube" && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"
                                    initial={false}
                                />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "podbean" && (
                        <motion.div
                            key="podbean"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {podbeanMessages.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={message}
                                    type="podbean"
                                    isHovered={hoveredItem === message.id}
                                    onHover={() => setHoveredItem(message.id)}
                                    onLeave={() => setHoveredItem(null)}
                                />
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "youtube" && (
                        <motion.div
                            key="youtube"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {youtubeMessages.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={message}
                                    type="youtube"
                                    isHovered={hoveredItem === message.id}
                                    onHover={() => setHoveredItem(message.id)}
                                    onLeave={() => setHoveredItem(null)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 text-center">
                    <a
                        href={
                            activeTab === "podbean"
                                ? "https://lovereignbiblechurch.podbean.com/"
                                : "https://www.youtube.com/@lovereignbiblechurch"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-all border rounded-full ${
                            activeTab === "podbean"
                                ? "text-gray-300 border-gray-600 hover:bg-gray-800/50"
                                : "text-gray-300 border-gray-600 hover:bg-gray-800/50"
                        }`}
                    >
                        View All <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    )
}

function MessageCard({ message, type, isHovered, onHover, onLeave }) {
    const isPodbean = type === "podbean"

    return (
        <a
            href={message.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <motion.div
                whileHover={{ y: -5 }}
                className="h-full bg-gray-900/70 overflow-hidden rounded-xl border border-gray-700/30"
            >
                <div className="relative">
                    <div className="relative overflow-hidden aspect-video">
                        <img
                            src={message.image || "/placeholder.svg?height=200&width=350"}
                            alt={message.title}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                                isHovered ? "scale-105" : "scale-100"
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100" />
                        <div className="absolute bottom-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium text-white bg-gray-700/80 flex items-center gap-1">
                            {isPodbean ? (
                                <>
                                    <Headphones className="h-3 w-3" /> Podbean
                                </>
                            ) : (
                                <>
                                    <Youtube className="h-3 w-3" /> YouTube
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-medium text-gray-100 mb-2 line-clamp-2 h-12">{message.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{message.date}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{message.duration}</span>
                        </div>
                    </div>
                </div>
                <div className="h-0.5 w-full bg-gray-600"></div>
            </motion.div>
        </a>
    )
}

MessageCard.propTypes = {
    message: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        image: PropTypes.string,
        url: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf(["podbean", "youtube"]).isRequired,
    isHovered: PropTypes.bool,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
}
