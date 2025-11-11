"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
    {
        id: 1,
        title: "Best Furniture Collection For Your Interior.",
        subtitle: "WELCOME TO CHAIRY",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Header-KsrXCUjZXN8j1fCWt8fNNeXIbaPdld.png",
        discount: "54%",
        cta: "Shop Now",
    },
    {
        id: 2,
        title: "Premium Seating Solutions For Modern Homes.",
        subtitle: "DISCOVER OUR RANGE",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Header-KsrXCUjZXN8j1fCWt8fNNeXIbaPdld.png",
        discount: "40%",
        cta: "Explore",
    },
    {
        id: 3,
        title: "Comfort Meets Style In Every Design.",
        subtitle: "EXCLUSIVE COLLECTION",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Header-KsrXCUjZXN8j1fCWt8fNNeXIbaPdld.png",
        discount: "35%",
        cta: "Browse",
    },
]

export default function ShopHero() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const currentProduct = products[currentIndex]

    return (
        <section className="relative w-full bg-gray-100 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center min-h-[350px] lg:min-h-[450px]">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center">
            <span className="text-xs md:text-sm font-semibold tracking-widest text-gray-600 mb-3">
              {currentProduct.subtitle}
            </span>

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {currentProduct.title}
                        </h1>

                        <Button className="w-fit bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 text-sm rounded-lg transition-colors">
                            {currentProduct.cta} →
                        </Button>
                    </div>

                    {/* Right Product Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full blur-3xl opacity-40" />

                        <div className="relative">
                            <img
                                src={currentProduct.image || "/placeholder.svg"}
                                alt="Featured Product"
                                className="w-full max-w-xs md:max-w-md h-auto object-contain"
                            />

                            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white rounded-full shadow-lg p-2.5 md:p-3 flex flex-col items-center justify-center">
                                <span className="text-lg md:text-xl font-bold text-orange-500">{currentProduct.discount}</span>
                                <span className="text-xs text-gray-600 font-medium">Discount</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-8 md:mt-12">
                    {/* Left Arrow */}
                    <button
                        onClick={goToPrevious}
                        className="text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
                    </button>

                    {/* Dots Navigation */}
                    <div className="flex gap-3">
                        {products.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all ${
                                    index === currentIndex
                                        ? "bg-gray-900 w-3 h-3 rounded-full"
                                        : "bg-gray-300 w-2.5 h-2.5 rounded-full hover:bg-gray-400"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        className="text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
                    </button>
                </div>
            </div>
        </section>
    )
}
