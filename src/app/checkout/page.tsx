"use client"

import { useCart } from '@/components/cart/CartProvider'

export default function CheckoutPage() {
  const { items, total, address, clearCart } = useCart()

  const canConfirm = items.length > 0 && !!address

  const confirmOrder = () => {
    if (!canConfirm) return
    // In a real integration, this is where you'd call a payment API
    alert('Order confirmed! We will contact you for delivery.')
    clearCart()
  }

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {!address ? (
          <p className="text-gray-300">Please add your delivery address on the cart page before checking out.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-3">Order Items</h2>
              <div className="space-y-2">
                {items.map((i) => (
                  <div key={i.productId} className="flex justify-between bg-gray-900 p-3 rounded">
                    <span>{i.title} x {i.quantity}</span>
                    <span>₵{(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <p className="text-gray-300">Total</p>
                  <p className="text-2xl font-bold">₵{total.toFixed(2)}</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-3">Delivery Address</h2>
              <div className="bg-gray-900 p-4 rounded">
                <p>{address.fullName}</p>
                {address.email && (<p className="text-gray-300">{address.email}</p>)}
                <p className="text-gray-300">{address.phone}</p>
                <p className="text-gray-300">{address.addressLine}</p>
                <p className="text-gray-300">{address.city}, {address.state}, {address.country}</p>
                <button
                  disabled={!canConfirm}
                  onClick={confirmOrder}
                  className={`mt-4 w-full px-4 py-2 rounded ${canConfirm ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 cursor-not-allowed'}`}
                >
                  Confirm Order
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}