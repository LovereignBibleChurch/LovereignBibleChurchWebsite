import ShopHero from '@/components/shop/ShopHero'
import ProductCard from '@/components/shop/ProductCard'
import { getProducts } from '@/sanity/lib/queries'
import type { Product } from '@/types/product'

export const revalidate = 300

export default async function ShopPage() {
  const products = (await getProducts()) as Product[]

  return (
    <div className="bg-black text-white">
      {/*<ShopHero />*/}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        {products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No products available yet. Please check back later.</p>
        )}
      </section>
    </div>
  )
}