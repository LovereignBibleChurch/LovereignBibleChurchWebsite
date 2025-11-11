import AddToCartButton from '@/components/cart/AddToCartButton'
import { getProductBySlug, getImageUrl } from '@/sanity/lib/queries'
import type { Product } from '@/types/product'
import ProductDetail from "@/components/shop/ProductDetails";

export const revalidate = 300

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = (await getProductBySlug(params.slug)) as Product | null

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <p className="text-gray-300">Please go back and choose another item.</p>
      </div>
    )
  }

  const imageUrl = getImageUrl(product.images?.[0], 900, 600)

  return (
      <div className="bg-black text-white min-h-screen">
          <ProductDetail product={product} imageUrl={imageUrl} />
      </div>
  )
}

