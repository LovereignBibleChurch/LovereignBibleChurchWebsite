"use client"

import type React from "react"

import { useState } from "react"
import { X, Heart, Send } from "lucide-react"

interface TestimonySubmissionFormProps {
    isOpen: boolean
    onClose: () => void
}

export default function TestimonySubmissionForm({ isOpen, onClose }: TestimonySubmissionFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        testimony: "",
    })
    const [contactType, setContactType] = useState<"email" | "phone">("email")
    const [isSending, setIsSending] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.contact || !formData.testimony) {
            alert("Please fill in all fields.")
            return
        }

        setIsSending(true)

        try {
            // Simulate form submission - replace with your actual email service
            await new Promise((resolve) => setTimeout(resolve, 2000))

            alert("Thank you for sharing your testimony! We'll review it and may feature it on our website.")
            setFormData({ name: "", contact: "", testimony: "" })
            onClose()
        } catch (error) {
            console.error("Error sending testimony:", error)
            alert("An error occurred. Please try again later.")
        } finally {
            setIsSending(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/50 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400 rounded-full blur-2xl" />
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl" />
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl mb-4 border border-amber-200/30">
                            <Heart className="h-8 w-8 text-amber-600" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Share Your{" "}
              </span>
                            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Story</span>
                        </h2>

                        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-4" />

                        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                            We'd love to hear how God is working in your life. Your story could inspire others in their faith journey.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 bg-white/80 border border-amber-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm"
                            />
                        </div>

                        {/* Contact Field with Type Toggle */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">
                                    Contact Information
                                </label>
                                <div className="flex bg-amber-100/50 rounded-lg p-1">
                                    <button
                                        type="button"
                                        onClick={() => setContactType("email")}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                                            contactType === "email"
                                                ? "bg-white text-amber-700 shadow-sm"
                                                : "text-gray-600 hover:text-amber-700"
                                        }`}
                                    >
                                        Email
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactType("phone")}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                                            contactType === "phone"
                                                ? "bg-white text-amber-700 shadow-sm"
                                                : "text-gray-600 hover:text-amber-700"
                                        }`}
                                    >
                                        Phone
                                    </button>
                                </div>
                            </div>
                            <input
                                id="contact"
                                name="contact"
                                type={contactType === "email" ? "email" : "tel"}
                                value={formData.contact}
                                onChange={handleInputChange}
                                placeholder={contactType === "email" ? "Enter your email address" : "Enter your phone number"}
                                className="w-full px-4 py-3 bg-white/80 border border-amber-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm"
                            />
                        </div>

                        {/* Testimony Field */}
                        <div>
                            <label htmlFor="testimony" className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Testimony
                            </label>
                            <textarea
                                id="testimony"
                                name="testimony"
                                value={formData.testimony}
                                onChange={handleInputChange}
                                placeholder="Share your story of faith, transformation, or how God has worked in your life..."
                                rows={6}
                                className="w-full px-4 py-3 bg-white/80 border border-amber-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400 text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm resize-none"
                            />
                            <div className="text-right mt-1">
                                <span className="text-xs text-gray-500">{formData.testimony.length} characters</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isSending ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending Your Story...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        <span>Share My Testimony</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Privacy Note */}
                        <div className="text-center pt-2">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By sharing your testimony, you give us permission to feature it on our website and social media to
                                inspire others. We'll contact you before publishing.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
