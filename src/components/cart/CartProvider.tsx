"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, DeliveryAddress } from '@/types/product'

type CartContextType = {
  items: CartItem[]
  address: DeliveryAddress | null
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setAddress: (addr: DeliveryAddress) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'lbc_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [address, setAddressState] = useState<DeliveryAddress | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        setItems(parsed.items || [])
        setAddressState(parsed.address || null)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, address }))
    } catch {}
  }, [items, address])

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  const addItem: CartContextType['addItem'] = (item, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) {
        return prev.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeItem: CartContextType['removeItem'] = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  const updateQuantity: CartContextType['updateQuantity'] = (productId, quantity) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i)))
  }

  const clearCart = () => setItems([])

  const setAddress = (addr: DeliveryAddress) => setAddressState(addr)

  const value = { items, address, total, addItem, removeItem, updateQuantity, clearCart, setAddress }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}