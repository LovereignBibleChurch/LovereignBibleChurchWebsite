"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"

export default function CartIconInline() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Link href="/cart" className="relative inline-flex items-center ml-4">
      <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
        <ShoppingCart className="w-5 h-5 text-white" />
      </div>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  )}