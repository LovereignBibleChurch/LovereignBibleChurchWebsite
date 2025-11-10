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
        <div className="bg-gradient-to-b pt-28 from-[#0a0a0a] to-[#121212] min-h-screen flex flex-col items-center justify-center px-3 md:px-6 py-16 relative overflow-hidden">
            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mb-4"></div>
                    <p className="text-amber-100/70">Loading church branches...</p>
                </div>
            )}

            {/* Content */}
            {!isLoading && (
                <>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
                    </div>

                {/* Title Section */}
                    <div className="w-full max-w-6xl text-center md:text-left mb-8">
                        <div className="flex items-center justify-center md:justify-start mb-3">
                            <div className="h-0.5 w-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-3"></div>
                            <span className="text-amber-400 uppercase tracking-wider text-xs font-medium">
                Find Your Community
              </span>
                        </div>

                        <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-white">
                            Our Branch Churches
                        </h1>

                        <p className="text-amber-100/70 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
                            Find a branch near you and join us for worship. Our branches are located
                            throughout the city to serve you better.
                        </p>
                    </div>

                {/* Search and Filter */}
                    <div className="w-full max-w-6xl mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                                <input
                                    type="text"
                                    placeholder="Search by branch name, pastor, or location..."
                                    className="w-full px-10 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder:text-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="w-full md:w-auto">
                                <div className="flex rounded-md overflow-hidden border border-white/10 shadow-sm backdrop-blur-sm">
                                    {["all", "tuesday", "friday", "sunday"].map((day) => (
                                        <button
                                            key={day}
                                            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                                                serviceFilter === day
                                                    ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                                                    : "bg-white/5 text-gray-200 hover:bg-white/10"
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
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-medium">Branch Locations</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 0}
                                    className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="text-white" size={16} />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages - 1 || totalPages === 0}
                                    className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="text-white" size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="relative overflow-hidden">
                            {visibleBranches.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                    {visibleBranches.map((branch) => (
                                        <BranchCard key={branch._id} branch={branch} onClick={handleBranchClick} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full">
                                    <p className="text-amber-400">
                                        No branches found matching your search criteria.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Pagination indicators */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6 gap-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${
                                            currentPage === index ? "bg-amber-500" : "bg-white/30"
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
