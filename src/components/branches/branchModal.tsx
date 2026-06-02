"use client"

import Image from "next/image"
import {Clock, MapPinned, Phone, User, X} from "lucide-react"
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

interface BranchModalProps {
    branch: BranchItem
    onClose: () => void
}

export default function BranchModal({ branch, onClose }: BranchModalProps) {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-black border border-white/[0.08] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
                <div className="sticky top-0 bg-black/95 backdrop-blur-sm px-6 py-4 border-b border-white/[0.06] flex justify-between items-center">
                    <h2 className="font-display text-lg font-semibold text-white">{branch.name}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center glass rounded-full hover:bg-white/[0.07] transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X size={16} className="text-white/60" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-white/35 text-sm font-light mb-6">
                                Led by {branch.pastor.name}, our {branch.name} is dedicated to serving the community with love and compassion.
                            </p>

                            <div className="space-y-5 mb-6">
                                {[
                                    { Icon: MapPinned, label: "Location", value: branch.location || "Location not specified" },
                                    { Icon: User, label: "Pastor", value: branch.pastor.name },
                                    { Icon: Phone, label: "Contact", value: branch.contact || "No contact information available" },
                                ].map(({ Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg glass flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Icon className="h-3.5 w-3.5 text-white/40" />
                                        </div>
                                        <div>
                                            <p className="text-white/30 text-xs uppercase tracking-widest mb-0.5">{label}</p>
                                            <p className="text-white/70 text-sm font-light">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock className="h-3.5 w-3.5 text-white/30" />
                                    <p className="text-white/30 text-xs uppercase tracking-widest">Service Schedule</p>
                                </div>
                                <div className="space-y-2 pl-5">
                                    {branch.services.tuesday && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Tuesday</span> · {branch.services.tuesday.time}</p>
                                        </div>
                                    )}
                                    {branch.services.thursday && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Thursday</span> · {branch.services.thursday.time}</p>
                                        </div>
                                    )}
                                    {branch.services.friday && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Friday</span> · {branch.services.friday.time}</p>
                                        </div>
                                    )}
                                    {branch.services.sunday.morning && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Sunday Morning</span> · {branch.services.sunday.morning.time}</p>
                                        </div>
                                    )}
                                    {branch.services.sunday.afternoon && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Sunday Afternoon</span> · {branch.services.sunday.afternoon.time}</p>
                                        </div>
                                    )}
                                    {branch.services.sunday.evening && (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                                            <p className="text-white/60 text-sm"><span className="text-white/80 font-medium">Sunday Evening</span> · {branch.services.sunday.evening.time}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {branch.contact && (
                                <a
                                    href={`tel:${branch.contact}`}
                                    className="inline-flex items-center gap-2 px-4 py-2 glass hover:bg-white/[0.07] text-white/70 hover:text-white text-xs rounded-xl transition-colors cursor-pointer"
                                >
                                    <Phone size={13} />
                                    <span>Call Branch</span>
                                </a>
                            )}
                        </div>

                        <div className="flex justify-center items-start pt-2">
                            <div className="w-48 h-56 rounded-xl overflow-hidden ring-1 ring-white/[0.07]">
                                <Image
                                    src={getImageUrl(branch.pastor.image, 300, 300)}
                                    alt={branch.pastor.name}
                                    width={250}
                                    height={300}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
