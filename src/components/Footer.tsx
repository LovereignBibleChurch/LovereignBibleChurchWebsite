"use client"

import React, { useState } from "react"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"
import Link from "next/link"
import { motion } from "framer-motion"

const EMAILJS_CONFIG = {
  publicKey: "fN2qkg7bDDx_2te0R",
  serviceId: "service_cte8xrg",
  templateId: "template_vruhehp",
}

const navLinks = [
  { name: "Our Story", href: "/our-story" },
  { name: "Church Branches", href: "/church-branches" },
  { name: "Founder", href: "/founder" },
  { name: "Books", href: "/books" },
  { name: "Media", href: "/media" },
  { name: "Give", href: "/give" },
  { name: "Contact Us", href: "/contact-us" },
]

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

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
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: formData.name,
        from_email: formData.phone,
        message: formData.message,
        to_name: "Lovereign Bible Church",
        subject: "New Contact Form Message",
      })
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
    <footer className="relative bg-black overflow-hidden">
      {/* Top divider glow */}
      <div className="divider-glow w-full" />

      {/* Background orbs */}
      <div className="orb w-96 h-96 bg-purple-700/[0.07] -top-20 right-0 translate-x-1/3" />
      <div className="orb w-64 h-64 bg-amber-500/[0.05] bottom-0 left-0 -translate-x-1/4" />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-md group-hover:bg-purple-500/30 transition-all duration-300" />
                <img src="/logos/logo.png" alt="Logo" className="relative w-10 h-10 rounded-full object-cover" />
              </div>
              <span className="font-display font-semibold text-white/90 group-hover:text-white transition-colors text-sm leading-tight">
                Lovereign<br />Bible Church
              </span>
            </Link>
            <p className="text-white/35 text-sm font-light leading-relaxed mb-6">
              Making a people ready for God — transforming lives through the Word.
            </p>
            <div className="flex gap-2">
              {[
                { href: "https://facebook.com/lovereignbiblechurch", icon: Facebook, label: "Facebook" },
                { href: "https://www.instagram.com/lovereignbiblechurch", icon: Instagram, label: "Instagram" },
                { href: "https://x.com/lovereignchurch", icon: Twitter, label: "X" },
                { href: "https://www.youtube.com/@lovereignbiblechurch", icon: Youtube, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass glass-hover rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-purple-400/70 uppercase mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-purple-400/70 uppercase mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/45 font-light leading-relaxed">
                  Dome Pillar Two Road, Christian Village, Achimota
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-white/45 font-light">(+233) 24 237 1411</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-white/45 font-light">info@lovereignbiblechurch.org</span>
              </li>
            </ul>
          </div>

          {/* Quick Message */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[0.2em] text-purple-400/70 uppercase mb-5">Quick Message</h3>

            {submitSuccess && (
              <div className="mb-3 p-3 glass rounded-xl text-amber-400 text-xs border border-amber-500/20">
                Thank you! We&apos;ll get back to you soon.
              </div>
            )}
            {submitError && (
              <div className="mb-3 p-3 glass rounded-xl text-red-400 text-xs border border-red-500/20">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus:border-purple-500/50 rounded-xl"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-9 text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus:border-purple-500/50 rounded-xl"
              />
              <Textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={2}
                className="text-sm bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25 focus:border-purple-500/50 resize-none rounded-xl"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-9 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors duration-200 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.05]">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/20 text-xs font-light">
            © {new Date().getFullYear()} Lovereign Bible Church. All rights reserved.
          </p>
          <p className="text-white/15 text-xs font-light">Making a people ready for God</p>
        </div>
      </div>
    </footer>
  )
}
