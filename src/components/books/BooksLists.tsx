"use client"

import {motion} from "framer-motion"
import {BooksData} from "@/data/booksData"
import {ArrowLeft, Book, Calendar, FileText} from "lucide-react"
import {useRouter} from "next/navigation"
import Link from "next/link"

export default function BooksList() {
    const router = useRouter()

    const handleBookDetails = (bookId: number) => {
        router.push(`/books?id=${bookId}`)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <div className="bg-black min-h-screen flex flex-col items-center px-4 md:px-8 py-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-gray-800/20 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gray-700/20 blur-3xl"></div>
            </div>

            {/* Back to Home */}
            <div className="w-full max-w-6xl mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Title Section */}
            <motion.div
                className="w-full max-w-6xl text-center md:text-left mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="h-1 w-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mr-4"></div>
                    <span className="text-gray-400 uppercase tracking-wider text-sm font-medium">Spiritual Library</span>
                </div>

                <h1 className="text-gray-100 text-[2.5rem] sm:text-[3rem] md:text-[4.5rem] leading-tight font-bold">
                    Books By <br className="hidden md:block" /> Pastor John Winfred
                </h1>

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto md:mx-0 text-lg">
                    Explore spiritual wisdom and guidance through these transformative books that have touched thousands of lives
                    around the world.
                </p>
            </motion.div>

            {/* Books Grid */}
            <motion.div className="w-full max-w-6xl" variants={containerVariants} initial="hidden" animate="visible">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BooksData.map((book, index) => (
                        <motion.div
                            key={book.id || index}
                            className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 flex flex-col h-full group hover:border-gray-600/50 transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                                <img
                                    src={book.image || "/placeholder.svg?height=256&width=400"}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-white text-xl font-bold">{book.title}</h3>
                                    <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        {book.year} • {book.pages} pages
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col">
                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{book.description}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                                    <div>
                                        <h4 className="text-gray-400 text-xs font-medium mb-1 flex items-center gap-1">
                                            <span>Price</span>
                                        </h4>
                                        <p className="text-gray-100 text-sm font-semibold">{book.price}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-xs font-medium mb-1 flex items-center gap-1">
                                            <FileText className="h-3 w-3" />
                                            Formats
                                        </h4>
                                        <p className="text-gray-100 text-sm">{book.formats.slice(0, 2).join(", ")}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBookDetails(book.id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 rounded-full text-sm transition-all duration-300 w-full border border-gray-600/30"
                                >
                                    <Book className="h-4 w-4" />
                                    <span>View Details</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
