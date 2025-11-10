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
            className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-white/10 group hover:border-amber-500/30 cursor-pointer"
            onClick={() => onClick(branch)}
        >
            <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#19222d] flex-shrink-0 relative">
                        <Image
                            src={branch.pastor.image ? getImageUrl(branch.pastor?.image, 300, 300) : "/church_leaders/noPic.png"}
                            alt={branch.pastor.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold">{branch.name}</h3>
                        <p className="text-amber-200/80 text-xs mt-0.5">{branch.pastor.name}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{branch.location || "Location not specified"}</p>
                </div>
            </div>
        </div>
    )
}
