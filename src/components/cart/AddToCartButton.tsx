"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/types/product"

interface AddToCartButtonProps {
    product: Product
    imageUrl: string
    className?: string
    disabled?: boolean
}

export default function AddToCartButton({ product, imageUrl, className = "", disabled = false }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToCart = async () => {
        if (disabled) return

        setIsLoading(true)
        try {
            // Simulate API call to add to cart
            await new Promise((resolve) => setTimeout(resolve, 300))

            const cartItem = {
                id: product._id,
                title: product.title,
                price: product.price,
                image: imageUrl,
                slug: product.slug.current,
                category: product.category,
                stock: product.stock,
                quantity: 1,
            }

            console.log("Added to cart:", cartItem)

            // Show success state
            setIsAdded(true)
            setTimeout(() => setIsAdded(false), 2000)
        } catch (error) {
            console.error("Error adding to cart:", error)
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
