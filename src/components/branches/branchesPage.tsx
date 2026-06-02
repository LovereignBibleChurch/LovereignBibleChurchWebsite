"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { getBranches } from "@/sanity/lib/queries"
import BranchModal from "@/components/branches/branchModal"
import BranchCard from "@/components/branches/branchCard"

interface BranchItem {
    _id: string
    name: string
    slug: {
        current: string
    }
    location: string
    contact: string
    pastor: {
        _id: string
        name: string
        title: string
        image?: any
    }
    services: {
        tuesday?: { time: string } | null
        thursday?: { time: string } | null
        friday?: { time: string } | null
        sunday: {
            morning?: { time: string } | null
            afternoon?: { time: string } | null
            evening?: { time: string } | null
        }
    }
    description?: string
    photos?: any[]
    mapLink?: string
    order?: number
    isActive?: boolean
}

interface BranchesPageProps {
    branches?: BranchItem[]
}

export default function BranchesPage({ branches: initialBranches = [] }: BranchesPageProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [serviceFilter, setServiceFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [branches, setBranches] = useState<BranchItem[]>(initialBranches)
    const [isLoading, setIsLoading] = useState(false)

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Fetch branches from Sanity if not provided as props
    useEffect(() => {
        if (initialBranches.length === 0) {
            const fetchBranches = async () => {
                try {
                    setIsLoading(true)
                    const branchesData = await getBranches()
                    setBranches(branchesData)
                } catch (error) {
                    console.error("Error fetching branches:", error)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchBranches()
        }
    }, [initialBranches])

    // ✅ Filter branches before pagination
    const filteredBranches = branches.filter((branch) => {
        const matchesSearch =
            branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.pastor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.location.toLowerCase().includes(searchQuery.toLowerCase())

        if (serviceFilter === "all") return matchesSearch
        if (serviceFilter === "tuesday") return matchesSearch && branch.services.tuesday
        if (serviceFilter === "friday") return matchesSearch && branch.services.friday
        if (serviceFilter === "sunday") {
            return (
                matchesSearch &&
                (branch.services.sunday.morning ||
                    branch.services.sunday.afternoon ||
                    branch.services.sunday.evening)
            )
        }
        return matchesSearch
    })

    // Pagination
    const branchesPerPage = 9
    const totalPages = Math.ceil(filteredBranches.length / branchesPerPage)
    const startIndex = currentPage * branchesPerPage
    const endIndex = startIndex + branchesPerPage
    const visibleBranches = filteredBranches.slice(startIndex, endIndex)

    const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
    const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    const goToPage = (index: number) => setCurrentPage(index)

    const handleBranchClick = (branch: BranchItem) => {
        setSelectedBranch(branch)
        setIsModalOpen(true)
    }

    return (
        <div className="bg-black pt-28 min-h-screen flex flex-col items-center px-3 md:px-6 py-16 relative overflow-hidden">
            {/* Ambient orb */}
            <div className="orb w-96 h-96 bg-purple-700/[0.06] top-0 right-0 translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b border-white/30 mb-4" />
                    <p className="text-white/40 text-sm">Loading branches…</p>
                </div>
            )}

            {/* Content */}
            {!isLoading && (
                <>
                    {/* Title Section */}
                    <div className="w-full max-w-6xl mb-12">
                        <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Locations</span>
                        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                            Our Branch Churches
                        </h1>
                        <div className="divider-glow w-40 mb-5" />
                        <p className="text-white/35 font-light text-sm max-w-xl">
                            Find a branch near you and join us for worship. Our branches are located throughout the city to serve you better.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="w-full max-w-6xl mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search by branch name, pastor, or location…"
                                    className="w-full px-10 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/50 text-white text-sm placeholder:text-white/25 transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="w-full md:w-auto">
                                <div className="glass rounded-xl p-1 flex gap-1">
                                    {["all", "tuesday", "friday", "sunday"].map((day) => (
                                        <button
                                            key={day}
                                            className={`flex-1 px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                                                serviceFilter === day
                                                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                                                    : "text-white/40 hover:text-white/70"
                                            }`}
                                            onClick={() => setServiceFilter(day)}
                                        >
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Branch Cards */}
                    <div className="w-full max-w-6xl">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-white/40 text-xs uppercase tracking-widest">Branch Locations</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 0}
                                    className="w-8 h-8 flex items-center justify-center glass rounded-full hover:bg-white/[0.07] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronLeft className="text-white/70" size={16} />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages - 1 || totalPages === 0}
                                    className="w-8 h-8 flex items-center justify-center glass rounded-full hover:bg-white/[0.07] transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <ChevronRight className="text-white/70" size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden">
                            {visibleBranches.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                    {visibleBranches.map((branch) => (
                                        <BranchCard key={branch._id} branch={branch} onClick={handleBranchClick} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 border-t border-white/[0.06] w-full">
                                    <p className="text-white/30 text-sm">No branches found matching your search.</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination indicators */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index)}
                                        className={`transition-all duration-200 cursor-pointer rounded-full ${
                                            currentPage === index ? "w-5 h-1.5 bg-amber-400" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Modal */}
                    {isModalOpen && selectedBranch && (
                        <BranchModal branch={selectedBranch} onClose={() => setIsModalOpen(false)} />
                    )}
                </>
            )}
        </div>
    )
}
