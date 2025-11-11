"use client"

import { useCart } from '@/components/cart/CartProvider'
import type { DeliveryAddress } from '@/types/product'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, address, setAddress } = useCart()
  const router = useRouter()
  const [form, setForm] = useState<DeliveryAddress>(address || {
    fullName: '', email: '', phone: '', addressLine: '', city: '', state: '', country: ''
  })

  const valid = useMemo(() => {
    return form.fullName && form.phone && form.addressLine && form.city && form.state && form.country
  }, [form])

  const onCheckout = () => {
    if (!valid) return
    setAddress(form)
    router.push('/checkout')
  }

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {items.length === 0 ? (
            <p className="text-gray-300">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4 bg-gray-900 p-4 rounded">
                  {item.imageUrl && (<img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />)}
                  <div className="flex-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-300">₵{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-2 py-1 bg-gray-700 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 bg-gray-700 rounded">+</button>
                    <button onClick={() => removeItem(item.productId)} className="ml-3 px-3 py-1 bg-red-600 rounded">Remove</button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-gray-300">Subtotal</p>
                  <p className="text-2xl font-bold">₵{total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Delivery Address</h2>
          <div className="space-y-3">
            <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            <input value={form.addressLine} onChange={(e) => setForm({ ...form, addressLine: e.target.value })} placeholder="Address Line" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            <div className="grid grid-cols-2 gap-3">
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
              <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="State/Region" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            </div>
            <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Country" className="w-full p-2 rounded bg-gray-800 border border-gray-700" />
            <button
              disabled={!valid || items.length === 0}
              onClick={onCheckout}
              className={`w-full px-4 py-2 rounded ${valid && items.length ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
            >
              Proceed to Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}