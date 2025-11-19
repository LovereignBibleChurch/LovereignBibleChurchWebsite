"use client"

import { useCart } from "@/components/cart/CartProvider"
import type { DeliveryAddress } from "@/types/product"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CartPage() {
    const { items, total, removeItem, updateQuantity, address, setAddress } = useCart()
    const router = useRouter()
    const [form, setForm] = useState<DeliveryAddress>(
        address || {
            fullName: "",
            email: "",
            phone: "",
            addressLine: "",
            city: "",
            state: "",
            country: "",
        },
    )

    const valid = useMemo(() => {
        return form.fullName && form.phone && form.addressLine && form.city && form.state && form.country
    }, [form])

    return (
        <div className="bg-black text-foreground min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
                        <Button onClick={() => router.push("/shop")} className="bg-teal-600 hover:bg-teal-700">
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex gap-4 bg-card border border-border rounded-lg p-4 hover:border-muted-foreground/50 transition-colors"
                                >
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                                        />
                                    )}

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-muted-foreground text-sm">₵{item.price.toFixed(2)} each</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="p-1 hover:bg-background rounded transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-6 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    className="p-1 hover:bg-background rounded transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.productId)}
                                                className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right flex flex-col justify-between">
                                        <p className="font-bold text-lg">₵{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Sidebar: Address Form & Summary */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Order Summary */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span>₵{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>₵{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="fullName" className="text-sm text-muted-foreground">
                                            Full Name
                                        </Label>
                                        <Input
                                            id="fullName"
                                            value={form.fullName}
                                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                            placeholder="John Doe"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-sm text-muted-foreground">
                                            Email (optional)
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone" className="text-sm text-muted-foreground">
                                            Phone
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="+233 123 456 7890"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="addressLine" className="text-sm text-muted-foreground">
                                            Address
                                        </Label>
                                        <Input
                                            id="addressLine"
                                            value={form.addressLine}
                                            onChange={(e) => setForm({ ...form, addressLine: e.target.value })}
                                            placeholder="Street address"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="city" className="text-sm text-muted-foreground">
                                                City
                                            </Label>
                                            <Input
                                                id="city"
                                                value={form.city}
                                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                                placeholder="Accra"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state" className="text-sm text-muted-foreground">
                                                Region
                                            </Label>
                                            <Input
                                                id="state"
                                                value={form.state}
                                                onChange={(e) => setForm({ ...form, state: e.target.value })}
                                                placeholder="Greater Accra"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="country" className="text-sm text-muted-foreground">
                                            Country
                                        </Label>
                                        <Input
                                            id="country"
                                            value={form.country}
                                            onChange={(e) => setForm({ ...form, country: e.target.value })}
                                            placeholder="Ghana"
                                            className="mt-1"
                                        />
                                    </div>

                                    <Button
                                        disabled={!valid || items.length === 0}
                                        onClick={() => {
                                            if (valid) {
                                                setAddress(form)
                                                router.push("/checkout")
                                            }
                                        }}
                                        className="w-full mt-4 bg-teal-600 hover:bg-teal-700 disabled:bg-muted disabled:text-muted-foreground"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
