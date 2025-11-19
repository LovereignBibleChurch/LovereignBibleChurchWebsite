import type React from "react"
import {Inter} from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PartnerBadge from "@/components/partner/JWBMPartnerBadge";
import TrilogyBadge from "@/components/partner/TrilogyBadge"
import EventCountdownBadge from "@/components/ui/EventCountdownBadge"
import { getEvents } from "@/sanity/lib/queries"
import { CartProvider } from "@/components/cart/CartProvider"
import FooterSwitch from "@/components/FooterSwitch"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Lovereign Bible Church",
  description: "Making a people ready for God",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const events = await getEvents();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-black">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <FooterSwitch />
          </div>
          <TrilogyBadge />
          <PartnerBadge />
        </CartProvider>
        <EventCountdownBadge events={events} />
      </body>
    </html>
  )
}
