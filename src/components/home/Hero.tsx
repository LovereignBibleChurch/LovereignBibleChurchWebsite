import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Church sanctuary"
          fill
          priority
          className="object-cover brightness-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Our Church</h1>
        <p className="text-xl md:text-2xl mb-8">A place of worship, community, and spiritual growth</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/our-story"
            className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-lg"
          >
            Learn More
          </Link>
          <Link
            href="/contact-us"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-lg"
          >
            Visit Us
          </Link>
        </div>
      </div>
    </div>
  )
}
