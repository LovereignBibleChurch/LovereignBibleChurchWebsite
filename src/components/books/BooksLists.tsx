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
        <div className="bg-black min-h-screen flex flex-col items-center px-4 md:px-12 pt-28 pb-20 relative overflow-hidden">
            {/* Ambient orb */}
            <div className="orb w-80 h-80 bg-purple-700/[0.06] top-0 left-0 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Title Section */}
            <motion.div
                className="w-full max-w-3xl mb-12"
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

            {/* Books List */}
            <motion.div
                className="w-full max-w-3xl space-y-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {BooksData.map((book, index) => (
                    <motion.div
                        key={book.id || index}
                        className="flex items-center gap-6 py-6 border-t border-white/[0.06] group cursor-pointer"
                        variants={itemVariants}
                        onClick={() => handleBookDetails(book.id)}
                    >
                        <div className="flex-shrink-0 w-14 h-20 rounded-lg overflow-hidden ring-1 ring-white/[0.07]">
                            <img
                                src={book.image || "/placeholder.svg"}
                                alt={book.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex-grow min-w-0">
                            <h3 className="font-display text-base md:text-lg font-medium text-white/85 group-hover:text-white transition-colors line-clamp-1">{book.title}</h3>
                            <p className="text-white/30 text-xs mt-1 font-light">{book.year} · {book.pages} pages</p>
                            <p className="text-white/40 text-xs mt-2 font-light line-clamp-2 hidden sm:block">{book.description}</p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <p className="text-white/70 text-sm font-medium">{book.price}</p>
                            <ExternalLink className="text-white/20 group-hover:text-purple-300 transition-colors mt-2 ml-auto" size={14} />
                        </div>
                    </motion.div>
                ))}
                <div className="border-t border-white/[0.06]" />
            </motion.div>
        </div>
    );
}