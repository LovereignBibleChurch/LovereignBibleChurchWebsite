export interface Product {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  price: number
  images?: any[]
  category?: string
  stock?: number
  isActive?: boolean
  featured?: boolean
}

export interface CartItem {
  productId: string
  title: string
  slug: string
  price: number
  imageUrl?: string
  quantity: number
}

export interface DeliveryAddress {
  fullName: string
  email: string
  phone: string
  addressLine: string
  city: string
  state: string
  country: string
}