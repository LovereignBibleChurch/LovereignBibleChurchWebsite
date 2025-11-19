"use client"

import { useState } from "react"
import { Heart, Share2, Star, Truck, Shield, RotateCcw, Package, AlertCircle } from "lucide-react"
import AddToCartButton from "@/components/cart/AddToCartButton"
import { getImageUrl } from "@/sanity/lib/queries"
import type { Product } from "@/types/product"

interface ProductDetailProps {
    product: Product
    imageUrl: string
}

export default function ProductDetail({ product, imageUrl }: ProductDetailProps) {
    const [isFavorited, setIsFavorited] = useState(false)
    const [selectedImage, setSelectedImage] = useState(imageUrl)
    const [isImageHovered, setIsImageHovered] = useState(false)

    const isInStock = product.stock! > 0

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Section */}
                <div className="flex flex-col gap-4">
                    {/* Main Image */}
                    <div
                        className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden aspect-square"
                        onMouseEnter={() => setIsImageHovered(true)}
                        onMouseLeave={() => setIsImageHovered(false)}
                    >
                        <img
                            src={selectedImage || "/placeholder.svg"}
                            alt={product.title}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                                isImageHovered ? "scale-110" : "scale-100"
                            }`}
                        />
                        {product.featured && (
                            <div className="absolute top-4 left-4 bg-teal-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                                Featured
                            </div>
                        )}
                        {/* Heart Button */}
                        <button
                            onClick={() => setIsFavorited(!isFavorited)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                        >
                            <Heart size={20} className={isFavorited ? "fill-teal-500 text-teal-500" : "text-white"} />
                        </button>
                    </div>

                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.slice(0, 4).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(getImageUrl(img, 200, 200))}
                                    className="w-20 h-20 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden border-2 border-transparent hover:border-teal-500 transition-all duration-300"
                                >
                                    <img
                                        src={getImageUrl(img, 200, 200) || "/placeholder.svg"}
                                        alt={`${product.title} ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-center gap-6">
                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="fill-teal-500 text-teal-500" />
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">(128 reviews)</span>
                    </div>

                    {/* Title and Price */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">{product.title}</h1>
                        <div className="flex items-center gap-3 mb-4">
                            {product.category && <span className="text-teal-500 text-sm font-medium">#{product.category}</span>}
                            <span className={`text-sm font-semibold ${isInStock ? "text-green-400" : "text-red-400"}`}>
                {isInStock ? `${product.stock} in stock` : "Out of stock"}
              </span>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-teal-500">₵{product.price?.toFixed(2)}</span>
                            <span className="text-lg text-gray-500 line-through">₵{(product.price! * 1.3).toFixed(2)}</span>
                            <span className="text-teal-500 font-semibold text-sm">Save 23%</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-800">
                        <div className="flex flex-col items-center gap-2">
                            <Truck size={24} className="text-teal-500" />
                            <span className="text-sm text-gray-300">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Shield size={24} className="text-teal-500" />
                            <span className="text-sm text-gray-300">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <RotateCcw size={24} className="text-teal-500" />
                            <span className="text-sm text-gray-300">Easy Returns</span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex gap-3">
                        <AddToCartButton product={product} imageUrl={imageUrl} className="flex-1" disabled={!isInStock} />
                        <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2">
                            <Share2 size={20} />
                            <span className="hidden sm:inline">Share</span>
                        </button>
                    </div>

                    <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border border-gray-800">
                        <h3 className="font-semibold mb-3 text-white">Product Details</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-teal-500">✓</span>
                                {product.description}
                            </li>
                            <li className="flex items-center gap-2">
                                <Package size={16} className="text-teal-500" />
                                Category: {product.category}
                            </li>
                            <li className="flex items-center gap-2">
                                <AlertCircle size={16} className="text-teal-500" />
                                Status: {product.isActive ? "Active" : "Inactive"}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
