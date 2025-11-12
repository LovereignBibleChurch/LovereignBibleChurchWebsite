"use client"

import { usePathname } from "next/navigation"
import Footer from "@/components/Footer"

export default function FooterSwitch() {
  const pathname = usePathname()
  const isShopRoute = pathname?.startsWith("/shop")
    const isCartRoute = pathname?.startsWith("/cart")

  if (isShopRoute || isCartRoute) {
    return (
      <div className="w-full py-6 border-t border-gray-800 bg-black text-center">
        <p className="text-gray-400 text-sm">© 2025 Lovereign Bible Church. All rights reserved.</p>
      </div>
    )
  }

  return <Footer />
}