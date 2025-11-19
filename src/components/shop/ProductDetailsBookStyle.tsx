"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw, Package, AlertCircle } from "lucide-react"
import AddToCartButton from "@/components/cart/AddToCartButton"
import { getImageUrl } from "@/sanity/lib/queries"
import type { Product } from "@/types/product"
import {useCart} from "@/components/cart/CartProvider";

interface ProductDetailsBookStyleProps {
  product: Product
  imageUrl: string
}

export default function ProductDetailsBookStyle({ product, imageUrl }: ProductDetailsBookStyleProps) {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedImage, setSelectedImage] = useState(imageUrl)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const isInStock = (product.stock ?? 0) > 0


  return (
    <div className="bg-black min-h-screen">
      {/* Hero / Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10" />
        <div className="absolute inset-0">
          <img
            src={selectedImage || "/placeholder.svg?height=600&width=1200"}
            alt={product.title}
            className="w-full h-full object-cover blur-sm scale-110"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 py-16">
          {/* Back Button */}
          <button
            onClick={() => router.push("/shop")}
            className="inline-flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Shop</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl blur-xl" />
                <div
                  className="relative rounded-lg overflow-hidden shadow-2xl w-80 h-96 bg-gradient-to-br from-gray-900 to-black"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                >
                  <img
                    src={selectedImage || "/placeholder.svg?height=500&width=350"}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isImageHovered ? "scale-110" : "scale-100"}`}
                  />
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Heart size={18} className={isFavorited ? "fill-teal-500 text-teal-500" : "text-white"} />
                  </button>
                </div>
              </div>

              {product.images && product.images.length > 1 && (
                <div className="absolute left-0 right-0 -bottom-24 lg:bottom-0 lg:relative mt-6 flex gap-3 overflow-x-auto pb-2">
                  {product.images.slice(0, 5).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(getImageUrl(img, 600, 600))}
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
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-teal-500 text-teal-500" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(128 reviews)</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">{product.title}</h1>

              <div className="flex flex-wrap gap-4 mb-6">
                {product.category && (
                  <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                    <span className="text-teal-500 text-xs font-semibold">Category</span>
                    <span className="text-gray-300 text-sm">{product.category}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                  <span className="text-gray-300 text-sm">{isInStock ? `${product.stock} in stock` : "Out of stock"}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                  <span className="text-gray-300 text-sm">Status: {product.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-teal-500">₵{product.price?.toFixed(2)}</span>
                <span className="text-lg text-gray-500 line-through">₵{((product.price ?? 0) * 1.3).toFixed(2)}</span>
                <span className="text-teal-500 font-semibold text-sm">Save 23%</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <AddToCartButton product={product} imageUrl={selectedImage} className="bg-teal-600 hover:bg-teal-500 text-black px-6 py-3 rounded-full font-medium transition-all duration-300" />
                <button className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-gray-600/30">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-100 mb-3">Benefits</h3>
                <div className="grid grid-cols-3 gap-4 py-6">
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}