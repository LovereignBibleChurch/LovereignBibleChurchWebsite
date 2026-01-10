"use client"

import {useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {ChevronLeft, ChevronRight, X} from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

// Define the interface for gallery images
interface GalleryImage {
    _id: string;
    title: string;
    image: {
        asset: {
            _ref: string;
        }
    };
    caption: string;
}

export default function PhotoGallery({galleryImages}: {galleryImages: GalleryImage[]}) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
    const [hoveredImage, setHoveredImage] = useState<string | null>(null)

    const openLightbox = (image: GalleryImage) => {
        setSelectedImage(image)
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const navigateImage = (direction: "next" | "prev") => {
        if (!selectedImage) return

        const currentIndex = galleryImages.findIndex((img) => img._id === selectedImage._id)
        let newIndex

        if (direction === "next") {
            newIndex = (currentIndex + 1) % galleryImages.length
        } else {
            newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
        }

        setSelectedImage(galleryImages[newIndex])
    }

    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">Photo</span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">Gallery</span>
                    </h2>
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                                index % 7 === 0 || index % 7 === 3 ? "row-span-2" : ""
                            } ${index % 11 === 0 ? "col-span-2" : ""}`}
                            onMouseEnter={() => setHoveredImage(image._id)}
                            onMouseLeave={() => setHoveredImage(null)}
                            onClick={() => openLightbox(image)}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-900">
                                <Image
                                    src={urlFor(image.image).url()}
                                    alt={image.title || "Church photo"}
                                    fill
                                    className={`object-cover transition-all duration-700 ${
                                        hoveredImage === image._id ? "scale-110" : "scale-100"
                                    }`}
                                />

                                {/* Subtle hover overlay */}
                                <div
                                    className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                                        hoveredImage === image._id ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            {/* Navigation Buttons */}
                            <button
                                onClick={() => navigateImage("prev")}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                onClick={() => navigateImage("next")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            {/* Image */}
                            <div className="relative aspect-video w-full bg-gray-900 rounded-lg overflow-hidden">
                                <Image
                                    src={urlFor(selectedImage.image).url()}
                                    alt={selectedImage.title || "Church photo"}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
