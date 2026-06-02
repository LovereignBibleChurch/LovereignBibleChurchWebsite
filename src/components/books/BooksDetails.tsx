"use client"

import {AnimatePresence, motion} from "framer-motion"
import {BooksData} from "@/data/booksData"
import {ArrowLeft, Book, Calendar, Check, Copy, Eye, FileText, ShoppingCart, Star} from "lucide-react"
import {useRouter} from "next/navigation"
import {useState} from "react"
import SampleChapterReader from "./SampleChapterReader"

interface BookDetailsProps {
    bookId: number
}

function DownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false)
    const phoneNumber = "(+233) 24 237 1411"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(phoneNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative bg-black border border-white/[0.08] rounded-2xl max-w-md w-full p-8 text-center"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full glass hover:bg-white/[0.07] flex items-center justify-center text-white/50 hover:text-white transition cursor-pointer"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <div className="mb-6">
                            <h2 className="font-display text-2xl font-semibold text-white mb-2">Download Online</h2>
                            <p className="text-white/40 text-sm font-light">Coming soon</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-white/50 text-sm mb-3">For physical copies contact:</p>
                            <button
                                onClick={handleCopy}
                                className="mx-auto flex items-center gap-2 px-4 py-2.5 glass hover:bg-white/[0.07] rounded-xl transition text-white font-medium text-sm cursor-pointer"
                                title="Click to copy"
                            >
                                {phoneNumber}
                                {copied ? (
                                    <Check className="h-4 w-4 text-amber-400" />
                                ) : (
                                    <Copy className="h-4 w-4 text-white/30" />
                                )}
                            </button>
                            <div className="mt-2 h-5">
                                {copied && (
                                    <span className="text-amber-400 text-xs font-medium">Number copied!</span>
                                )}
                            </div>
                        </div>
                        <p className="mt-6 text-white/20 text-xs">Thank you for your interest! Online downloads will be available soon.</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function BookDetails({ bookId }: BookDetailsProps) {
    const router = useRouter()
    const [showSampleReader, setShowSampleReader] = useState(false)
    const [showDownloadModal, setShowDownloadModal] = useState(false)

    const book = BooksData.find((b) => b.id === bookId)
    const otherBooks = BooksData.filter((b) => b.id !== bookId).slice(0, 3)

    if (!book) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Book Not Found</h2>
                    <button
                        onClick={() => router.push("/books")}
                        className="text-gray-400 hover:text-gray-200 flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Books
                    </button>
                </div>
            </div>
        )
    }

    if (showSampleReader) {
        return (
            <>
                <SampleChapterReader
                    book={book}
                    onClose={() => setShowSampleReader(false)}
                    onContinueFullBook={() => window.open(`https://www.jwbm.lovereignbiblechurch.org/books/${book.slug}`, '_blank')}
                />
                <DownloadModal open={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
            </>
        )
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10" />
                <div className="absolute inset-0">
                    <img
                        src={book.image || "/placeholder.svg?height=600&width=1200"}
                        alt={book.title}
                        className="w-full h-full object-cover blur-sm scale-110"
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4 py-16">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push("/books")}
                        className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-8 text-sm cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Books</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Book Cover */}
                        <motion.div
                            className="flex justify-center lg:justify-start"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative">
                                <img
                                    src={book.image || "/placeholder.svg?height=500&width=350"}
                                    alt={book.title}
                                    className="relative w-80 h-auto rounded-xl ring-1 ring-white/[0.08] shadow-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Book Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">(4.8/5 from 234 reviews)</span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">{book.title}</h1>

                            <p className="text-white/40 text-sm font-light mb-6">by Pastor John Winfred</p>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                                    <Calendar className="h-3.5 w-3.5 text-white/40" />
                                    <span className="text-white/60 text-xs">{book.year}</span>
                                </div>
                                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                                    <FileText className="h-3.5 w-3.5 text-white/40" />
                                    <span className="text-white/60 text-xs">{book.pages} pages</span>
                                </div>
                                <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                                    <Book className="h-3.5 w-3.5 text-white/40" />
                                    <span className="text-white/60 text-xs">{book.category}</span>
                                </div>
                            </div>

                            <p className="text-white/55 text-base leading-relaxed mb-8 font-light">{book.description}</p>

                            <div className="flex flex-wrap gap-3 mb-8">
                                <button
                                    onClick={() => setShowSampleReader(true)}
                                    className="flex items-center gap-2 glass hover:bg-white/[0.07] text-white/80 hover:text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                                >
                                    <Eye className="h-4 w-4" />
                                    Read Sample
                                </button>

                                <button
                                    onClick={() => window.open(`https://www.jwbm.lovereignbiblechurch.org/books/${book.slug}`, '_blank')}
                                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Buy Now · {book.price}
                                </button>
                            </div>

                            <div className="border-t border-white/[0.06] pt-5">
                                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Available Formats</p>
                                <div className="flex flex-wrap gap-2">
                                    {book.formats.map((format, index) => (
                                        <span
                                            key={index}
                                            className="glass text-white/50 px-3 py-1 rounded-full text-xs"
                                        >
                                            {format}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Other Books Section */}
            {otherBooks.length > 0 && (
                <div className="container mx-auto px-4 py-16 max-w-3xl">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-6">More by Pastor John</p>
                    <div className="space-y-0">
                        {otherBooks.map((otherBook) => (
                            <div
                                key={otherBook.id}
                                className="flex items-center gap-5 py-5 border-t border-white/[0.06] group cursor-pointer"
                                onClick={() => router.push(`/books?id=${otherBook.id}`)}
                            >
                                <div className="flex-shrink-0 w-10 h-14 rounded-lg overflow-hidden ring-1 ring-white/[0.07]">
                                    <img
                                        src={otherBook.image || "/placeholder.svg?height=192&width=300"}
                                        alt={otherBook.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="font-display text-sm font-medium text-white/80 group-hover:text-white transition-colors line-clamp-1">{otherBook.title}</h3>
                                    <p className="text-white/30 text-xs mt-0.5">{otherBook.year}</p>
                                </div>
                                <span className="flex-shrink-0 text-white/40 group-hover:text-white/70 text-sm font-medium transition-colors">{otherBook.price}</span>
                            </div>
                        ))}
                        <div className="border-t border-white/[0.06]" />
                    </div>
                </div>
            )}

            <DownloadModal open={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
        </div>
    )
}
