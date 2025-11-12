"use client"

import React from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { getImageUrl } from "@/sanity/lib/queries"
import type { Product } from "@/types/product"
import { useCart } from "@/components/cart/CartProvider"

export default function ProductCard({ product, isNew = false }: { product: Product; isNew?: boolean }) {
    const { addItem } = useCart()
    const imageUrl = getImageUrl(product.images?.[0], 400, 500)
    const [isWishlisted, setIsWishlisted] = React.useState(false)

    const handleAddToCart = () => {
        addItem({
            productId: product._id,
            title: product.title,
            price: product.price,
            slug: product.slug?.current,
            imageUrl,
        })
    }

    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 flex flex-col w-88 h-100">
            <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <Link href={`/shop/${product.slug?.current}`}>
                    <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                </Link>

                {/* New badge */}
                {isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold z-20">
                        New
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-lg p-2 hover:bg-white/30 transition-colors z-20"
                    aria-label="Add to wishlist"
                >
                    <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-white"} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <Link href={`/shop/${product.slug?.current}`}>
                        <h3 className="text-white text-lg font-bold line-clamp-2">{product.title}</h3>
                    </Link>
                    <p className="text-blue-200 text-sm mt-1">
                        {product.category} • {product.stock! > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                {/* Description */}
                <p className="text-blue-100/90 text-sm mb-4 line-clamp-3">
                    {product.description || "No description available"}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                    <div>
                        <h4 className="text-blue-300 text-xs font-medium mb-1">Price</h4>
                        <p className="text-white text-sm font-semibold">₵{product.price?.toFixed(2)}</p>
                    </div>
                    <div>
                        <h4 className="text-blue-300 text-xs font-medium mb-1">Category</h4>
                        <p className="text-white text-sm">{product.category}</p>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-full text-sm transition-colors w-full font-medium"
                >
                    <ShoppingCart size={16} />
                    <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
                </button>
            </div>
        </div>
    )
}
