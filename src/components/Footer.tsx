"use client"

import React, { useState } from "react"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_CONFIG = {
    publicKey: "fN2qkg7bDDx_2te0R",
    serviceId: "service_cte8xrg",
    templateId: "template_vruhehp",
}

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState("")

    // Initialize EmailJS
    React.useEffect(() => {
        emailjs.init(EMAILJS_CONFIG.publicKey)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitError("")

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.phone,
                message: formData.message,
                to_name: "Lovereign Bible Church",
                subject: "New Contact Form Message",
            }

            await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)

            setSubmitSuccess(true)
            setFormData({ name: "", phone: "", message: "" })
            setTimeout(() => setSubmitSuccess(false), 3000)
        } catch (error) {
            console.error("Error submitting form:", error)
            setSubmitError("Failed to send message. Please try again.")
            setTimeout(() => setSubmitError(""), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Church Info & Social */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                                <img src="/logos/logo.png" alt="Logo" className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold">Lovereign Bible Church</h3>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <a
                                href="https://facebook.com/lovereignbiblechurch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.instagram.com/lovereignbiblechurch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="https://x.com/lovereignchurch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.youtube.com/@lovereignbiblechurch"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-white/10 hover:bg-blue-600 rounded flex items-center justify-center transition-colors"
                            >
                                <span className="sr-only">YouTube</span>
                                <Youtube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-blue-300 uppercase tracking-wide">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start group">
                                <MapPin className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">Dome Pillar Two Road, Christian Village, Achimota</span>
                            </li>
                            <li className="flex items-center group">
                                <Phone className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-300">(+233) 24 237 1411</span>
                            </li>
                            <li className="flex items-center group">
                                <Mail className="h-4 w-4 text-blue-400 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-300">info@lovereignbiblechurch.org</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Message Form */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-blue-300 uppercase tracking-wide">Quick Message</h3>

                        {submitSuccess && (
                            <div className="mb-3 p-2 bg-blue-500/20 border border-blue-500/30 rounded text-blue-200 text-xs">
                                Thank you! We&#39;ll get back to you soon.
                            </div>
                        )}

                        {submitError && (
                            <div className="mb-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-200 text-xs">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-300"
                            />
                            <Input
                                type="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="h-8 text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-300"
                            />
                            <Textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={2}
                                className="text-sm bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-300 resize-none"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-8 bg-white text-blue-600 hover:bg-blue-50 text-sm"
                            >
                                {isSubmitting ? "Sending..." : "Send"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-black/20">
                <div className="container mx-auto px-4 py-3">
                    <p className="text-gray-400 text-xs text-center">
                        © {new Date().getFullYear()} Lovereign Bible Church. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
