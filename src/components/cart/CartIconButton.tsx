"use client"

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart/CartProvider'

export default function CartIconButton() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <Link href="/cart" className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
    </Link>
  )
}