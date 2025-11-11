"use client"

import React from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { getImageUrl } from "@/sanity/lib/queries"
import type { Product } from "@/types/product"
import { useCart } from "@/components/cart/CartProvider"

export default function ProductCard({ product, isNew = false }: { product: Product; isNew?: boolean }) {
    const { addItem } = useCart()
    const imageUrl = getImageUrl(product.images?.[0], 400, 500)
    const [isWishlisted, setIsWishlisted] = React.useState(false)

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="relative group">
                <Link href={`/shop/${product.slug?.current}`}>
                    <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-72 md:h-80 object-cover group-hover:opacity-90 transition-opacity"
                    />
                </Link>

                {/* New badge */}
                {isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        New
                    </div>
                )}

                {/* Wishlist button */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow hover:shadow-md transition-shadow"
                    aria-label="Add to wishlist"
                >
                    <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
            </div>

            <div className="p-3 md:p-4 flex flex-col flex-grow">
                <Link href={`/shop/${product.slug?.current}`}>
                    <h3 className="text-sm md:text-base font-semibold text-teal-600 hover:text-teal-700 mb-2 line-clamp-2">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-auto pt-2 md:pt-3 border-t border-gray-100">
                    <span className="text-base md:text-lg font-bold text-gray-900">₵{product.price?.toFixed(2)}</span>
                    <button
                        onClick={() =>
                            addItem({
                                productId: product._id,
                                title: product.title,
                                price: product.price,
                                slug: product.slug?.current,
                                imageUrl,
                            })
                        }
                        className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-2 transition-colors"
                        aria-label="Add to cart"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10-9l2 9m-6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3m6 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
