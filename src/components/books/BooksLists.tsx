"use client"


import {motion} from "framer-motion";
import {BooksData} from "@/data/booksData";
import {ExternalLink} from "lucide-react";
import {useRouter} from "next/navigation";

export default function BooksLists() {
    const router = useRouter(); // Hook for programmatic navigation

    // Function to handle navigation to book details
    const handleBookDetails = (bookId: number) => {
        router.push(`/books?id=${bookId}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        },
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center px-4 md:px-8 pt-28 pb-20 relative overflow-hidden">
            {/* Ambient orbs */}
            <div className="orb w-96 h-96 bg-purple-700/[0.07] top-0 left-0 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="orb w-64 h-64 bg-amber-500/[0.04] bottom-0 right-0 translate-x-1/3 translate-y-1/3 pointer-events-none" />

            {/* Title Section */}
            <motion.div
                className="w-full max-w-6xl mb-14"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Published Works</span>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
                    Books By Pastor John Winfred
                </h1>
                <div className="divider-glow w-40 mb-5" />
                <p className="text-white/35 font-light text-sm max-w-xl">
                    Explore spiritual wisdom and guidance through these transformative books that have touched thousands of lives around the world.
                </p>
            </motion.div>

            {/* Books Grid */}
            <motion.div
                className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {BooksData.map((book, index) => (
                    <motion.div
                        key={book.id || index}
                        className="group cursor-pointer"
                        variants={itemVariants}
                        onClick={() => handleBookDetails(book.id)}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Cover */}
                        <div className="relative rounded-xl overflow-hidden aspect-[2/3] mb-4 ring-1 ring-white/[0.07] group-hover:ring-purple-500/30 transition-all duration-300"
                            style={{ boxShadow: "0 0 0 0 rgba(124,58,237,0)" }}
                        >
                            <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Hover overlay with CTA */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="flex items-center gap-1.5 text-white text-xs font-medium">
                                    <ExternalLink size={12} />
                                    View Details
                                </span>
                            </div>
                            {/* Price badge */}
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white/90 text-xs font-semibold px-2 py-1 rounded-full">
                                {book.price}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-1 px-0.5">
                            <h3 className="font-display text-sm font-medium text-white/85 group-hover:text-white transition-colors leading-snug line-clamp-2">
                                {book.title}
                            </h3>
                            <p className="text-white/30 text-xs font-light">{book.year} · {book.pages} pages</p>
                            <p className="text-white/25 text-xs font-light">{book.category}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}