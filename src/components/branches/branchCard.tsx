"use client"

import Image from "next/image"
import {MapPin} from "lucide-react"
import { getImageUrl } from "@/sanity/lib/queries"

interface BranchItem {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  location: string;
  contact: string;
  pastor: {
    _id: string;
    name: string;
    title: string;
    image?: any;
  };
  services: {
    tuesday?: { time: string } | null;
    thursday?: { time: string } | null;
    friday?: { time: string } | null;
    sunday: {
      morning?: { time: string } | null;
      afternoon?: { time: string } | null;
      evening?: { time: string } | null;
    };
  };
  description?: string;
  photos?: any[];
  mapLink?: string;
  order?: number;
  isActive?: boolean;
}

interface BranchCardProps {
    branch: BranchItem
    onClick: (branch: BranchItem) => void
}

export default function BranchCard({ branch, onClick }: BranchCardProps) {
    return (
        <div
            className="glass rounded-xl overflow-hidden hover:bg-white/[0.07] hover:border-purple-500/20 transition-all duration-300 cursor-pointer group"
            onClick={() => onClick(branch)}
        >
            <div className="p-5">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/[0.07] flex-shrink-0 relative">
                        <Image
                            src={branch.pastor.image ? getImageUrl(branch.pastor?.image, 300, 300) : "/church_leaders/noPic.png"}
                            alt={branch.pastor.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-sm group-hover:text-white transition-colors">{branch.name}</h3>
                        <p className="text-white/40 text-xs mt-0.5">{branch.pastor.name}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-white/25 mt-0.5 flex-shrink-0" />
                    <p className="text-white/40 text-xs font-light">{branch.location || "Location not specified"}</p>
                </div>
            </div>
        </div>
    )
}
