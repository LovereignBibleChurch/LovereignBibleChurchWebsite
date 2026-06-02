"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { getImageUrl } from "@/sanity/lib/queries"

interface LeaderItem {
  _id: string
  name: string
  title: string
  location: string
  image?: any
  bio?: string
  contactInfo?: string
  socialLinks?: any[]
  order?: number
  isActive?: boolean
}

export default function LeaderCard({ leader, index }: { leader: LeaderItem; index: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      className="flex flex-col items-center text-center group cursor-default"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full overflow-hidden ring-1 ring-white/[0.07] group-hover:ring-purple-500/25 transition-all duration-300">
        {!loaded && (
          <div className="absolute inset-0 bg-white/[0.03] flex items-center justify-center">
            <div className="w-4 h-4 border border-white/15 border-t-white/40 rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={leader.image ? getImageUrl(leader.image, 200, 200) : "/church_leaders/noPic.png"}
          alt={leader.name}
          fill
          className="object-cover"
          priority={index < 10}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
        />
      </div>

      <span className="text-[10px] text-white/20 uppercase tracking-widest mb-1">{leader.location}</span>
      <h3 className="text-xs font-medium text-white/75 leading-snug line-clamp-2">{leader.name}</h3>
      <p className="text-[10px] text-white/25 mt-0.5">{leader.title}</p>
    </motion.div>
  )
}
