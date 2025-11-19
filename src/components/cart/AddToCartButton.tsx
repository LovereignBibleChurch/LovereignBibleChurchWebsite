"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types/product"
import { useCart } from "@/components/cart/CartProvider"

interface AddToCartButtonProps {
    product: Product
    imageUrl: string
    className?: string
    disabled?: boolean
}

export default function AddToCartButton({ product, imageUrl, className = "", disabled = false }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { addItem } = useCart()

    const handleAddToCart = () => {
        if (disabled) return

        setIsLoading(true)
        try {
            addItem(
                {
                    productId: product._id,
                    title: product.title,
                    slug: product.slug?.current,
                    price: product.price,
                    imageUrl,
                },
                1
            )
            setIsAdded(true)
            setTimeout(() => setIsAdded(false), 1500)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading || disabled}
            className={`bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:opacity-50 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 ${
                isAdded ? "bg-green-500" : ""
            } ${className}`}
        >
            <ShoppingCart size={20} />
            <span>{disabled ? "Out of Stock" : isAdded ? "Added!" : isLoading ? "Adding..." : "Add to Cart"}</span>
        </button>
    )
}
