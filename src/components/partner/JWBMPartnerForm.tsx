"use client"

import type React from "react"
import emailjs from "emailjs-com"
import Image from "next/image"

import { useState, useRef } from "react"
import { ChevronDown, X } from "lucide-react"

interface PartnerFormProps {
    isOpen: boolean
    onClose: () => void
}

export default function JWBMPartnerForm({ isOpen, onClose }: PartnerFormProps) {
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        telephone: "",
        country: "",
    })
    const [isSending, setIsSending] = useState(false)
    const categoryRef = useRef<HTMLDivElement>(null)

    const partnershipCategories = ["Silver Partner", "Gold Partner", "Platinum Partner", "Diamond Partner"]

    const SERVICE_ID = "your_service_id"
    const TEMPLATE_ID = "your_template_id"
    const USER_ID = "your_public_key" // EmailJS public key

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.fullName || !formData.telephone || !formData.country || !selectedCategory) {
            alert("Please fill in all fields and select a category.")
            return
        }

        setIsSending(true)

        try {
            await emailjs.send(
                "service_86ce4g7",
                "template_sb90q7b",
                {
                    fullName: formData.fullName,
                    telephone: formData.telephone,
                    country: formData.country,
                    category: selectedCategory,
                    time: new Date().toLocaleString(),
                },
                "ItF3ATskFLsm2Zb1F"
            )
            alert("Thank you for becoming a partner! Your details have been sent.")
            setFormData({ fullName: "", telephone: "", country: "" })
            setSelectedCategory("")
            onClose()
        } catch (error) {
            console.error("Error sending email:", error)
            alert("An error occurred. Please try again later.")
        } finally {
            setIsSending(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800 relative">
                {/* Logo in the corner */}
                <Image
                    src="https://raw.githubusercontent.com/THE-LOVEREIGN-BIBLE-CHURCH/logo/main/jwbm.png"
                    alt="JWBM Logo"
                    className="absolute top-4 left-0 p-1"
                    height={100}
                    width={100}
                />
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="flex flex-col md:flex-row">
                    {/* Information Section */}
                    <div className="bg-gradient-to-br from-purple-900/40 to-black p-8 md:w-2/5 flex flex-col justify-center rounded-l-2xl">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Partner with JWBM</h1>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            Join the John Winfred Book Ministry Partnership and become part of a mission spreading knowledge and inspiration through impactful literature.
                        </p> 
                    </div>
                    {/* Form Section */}
                    <div className="p-8 md:w-3/5">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-300 mb-1">
                                    Telephone
                                </label>
                                <input
                                    id="telephone"
                                    name="telephone"
                                    type="tel"
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    placeholder="Enter your country"
                                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                                    Partnership Category
                                </label>
                                <div className="relative" ref={categoryRef}>
                                    <button
                                        type="button"
                                        onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                                    >
                    <span className={selectedCategory ? "text-white" : "text-gray-400"}>
                      {selectedCategory || "Select partnership category"}
                    </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                                categoryDropdownOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {categoryDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                                            <ul className="py-1 max-h-60 overflow-auto">
                                                {partnershipCategories.map((category) => (
                                                    <li key={category}>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedCategory(category)
                                                                setCategoryDropdownOpen(false)
                                                            }}
                                                            className="w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700/30 transition-colors duration-150"
                                                        >
                                                            {category}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSending}
                            >
                                {isSending ? "Sending..." : "BECOME A PARTNER"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
