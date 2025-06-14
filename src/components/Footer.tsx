"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Newsletter & Quick Contact Section */}
        <div className="bg-black py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Newsletter Signup */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
                <p className="text-blue-100 mb-4">
                  Subscribe to our newsletter for updates on events, sermons, and community news.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
                  <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                  />
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Quick Message
                </h3>

                {submitSuccess && (
                    <div className="bg-green-500/20 border border-green-400/30 text-green-100 rounded-md p-3 mb-4 text-sm">
                      Thank you! We&#39;ll get back to you soon.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                    />
                  </div>
                  <Textarea
                      name="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                  />
                  <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    {isSubmitting ? (
                        "Sending..."
                    ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Church Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10  rounded-lg flex items-center justify-center mr-3">
                  <img
                      src="/logos/logo.png"
                      alt="Logo"
                      className="w-8 h-8 md:w-10 md:h-10"
                  />
                </div>
                <h3 className="text-xl font-bold">Lovereign Bible Church</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bringing hope, faith and love to our community and beyond. Join us in worship, fellowship, and service.
              </p>
              <div className="flex space-x-4">
                <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                    href="#"
                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                      href="/"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                      href="/our-story"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                      href="/church-branches"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Church Branches
                  </Link>
                </li>
                <li>
                  <Link
                      href="/founder"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Founder
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                      href="/books"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Books
                  </Link>
                </li>
                <li>
                  <Link
                      href="/media"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Media
                  </Link>
                </li>
                <li>
                  <Link
                      href="/give"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Give
                  </Link>
                </li>
                <li>
                  <Link
                      href="/contact-us"
                      className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-600 transition-colors">
                    <MapPin className="h-4 w-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <div>
                  <span className="text-gray-300 leading-relaxed">
                    123 Church Street
                    <br />
                    City, State 12345
                  </span>
                  </div>
                </li>
                <li className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                    <Phone className="h-4 w-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-300">(123) 456-7890</span>
                </li>
                <li className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                    <Mail className="h-4 w-4 text-blue-400 group-hover:text-white" />
                  </div>
                  <span className="text-gray-300">info@churchname.org</span>
                </li>
              </ul>

              {/* Service Times */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <h4 className="font-semibold text-blue-400 mb-2">Service Times</h4>
                <p className="text-sm text-gray-300">
                  Sunday: 9:00 AM & 11:00 AM
                  <br />
                  Wednesday: 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Lovereign Bible Church. All rights reserved. Made with{" "}
                <Heart className="h-4 w-4 inline text-red-500" /> for our community.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
