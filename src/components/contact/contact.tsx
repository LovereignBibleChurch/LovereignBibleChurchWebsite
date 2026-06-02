"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import { Clock, Home, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react"
import emailjs from "emailjs-com"

const inputCls = "w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 rounded-xl focus:outline-none focus:border-purple-500/50 transition-colors"
const errorInputCls = "border-red-500/50"

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [partnershipData, setPartnershipData] = useState({ firstName: "", telephone: "", city: "", category: "" })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState({ contact: false, partnership: false })
  const [submitSuccess, setSubmitSuccess] = useState({ contact: false, partnership: false })

  const validate = (data: any, type: "contact" | "partnership") => {
    const e: Record<string, string> = {}
    if (type === "contact") {
      if (!data.name) e.name = "Name is required"
      if (!data.message) e.message = "Message is required"
      if (data.email && !/\S+@\S+\.\S+/.test(data.email)) e.email = "Email is invalid"
    } else {
      if (!data.firstName) e.firstName = "First name is required"
      if (!data.telephone) e.telephone = "Telephone is required"
    }
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, type: "contact" | "partnership") => {
    const { name, value } = e.target
    if (type === "contact") setFormData((p) => ({ ...p, [name]: value }))
    else setPartnershipData((p) => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, type: "contact" | "partnership") => {
    e.preventDefault()
    const data = type === "contact" ? formData : partnershipData
    const errors = validate(data, type)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting((p) => ({ ...p, [type]: true }))
    const params = type === "contact"
      ? { name: formData.name, email: formData.email, phone: formData.phone, message: formData.message, time: new Date().toLocaleString() }
      : { fullName: partnershipData.firstName, telephone: partnershipData.telephone, country: partnershipData.city, category: partnershipData.category }
    const templateId = type === "contact" ? "template_9p9ksuo" : "template_li13gbn"

    emailjs.send("service_86ce4g7", templateId, params, "fN2qkg7bDDx_2te0R")
      .then(() => {
        if (type === "contact") setFormData({ name: "", email: "", phone: "", message: "" })
        else setPartnershipData({ firstName: "", telephone: "", city: "", category: "" })
        setSubmitSuccess((p) => ({ ...p, [type]: true }))
        setTimeout(() => setSubmitSuccess((p) => ({ ...p, [type]: false })), 3000)
      })
      .catch(() => alert("An error occurred. Please try again."))
      .finally(() => setIsSubmitting((p) => ({ ...p, [type]: false })))
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Contact info — no cards, just icon + text rows */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.2em] text-purple-400/70 uppercase block mb-4">Contact</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">Get In Touch</h2>
            <div className="divider-glow w-40 mb-4" />
            <p className="text-white/40 font-light">We&apos;d love to hear from you. Reach out through any of these channels.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {[
              { Icon: Phone, label: "Phone", lines: ["+233 24 237 1411"] },
              { Icon: Mail, label: "Email", lines: ["info@lovereignbiblechurch.org", "lbcwebsite2@gmail.com"] },
              { Icon: MapPin, label: "Location", lines: ["Christian Village, PUMA Filling Station", "Accra, Ghana"] },
            ].map(({ Icon, label, lines }, i) => (
              <motion.div
                key={label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{label}</p>
                  {lines.map((l) => <p key={l} className="text-white/65 text-sm font-light">{l}</p>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Location details + Map */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-purple-400" />
                Headquarters
              </h3>
              <div className="space-y-5 text-white/50 text-sm font-light">
                <div className="flex gap-3">
                  <Home className="w-4 h-4 text-white/25 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/60 font-medium text-xs uppercase tracking-wide mb-1">Address</p>
                    <p>Dome Pillar Two Road</p>
                    <p>Near PUMA Filling Station</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-4 h-4 text-white/25 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/60 font-medium text-xs uppercase tracking-wide mb-1">Office Hours</p>
                    <p>Mon–Fri: 9:00 AM – 5:00 PM</p>
                    <p>Saturday: 10:00 AM – 2:00 PM</p>
                    <p>Sunday: All day</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl overflow-hidden h-72 md:h-auto ring-1 ring-white/[0.06]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.506838354526!2d-0.22212402519298347!3d5.639546732804268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9bfbf6a2f885%3A0xd6e43a9f1998b7d5!2sLovereign%20Bible%20Church!5e0!3m2!1sen!2sus!4v1750113667349!5m2!1sen!2sus"
                width="100%" height="100%"
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          </div>

          {/* Two forms side by side */}
          <div className="grid md:grid-cols-2 gap-14">

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-xl font-semibold text-white mb-2 flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                Send a Message
              </h3>
              <p className="text-white/30 text-sm mb-6 font-light">We&apos;ll get back to you as soon as possible.</p>

              {submitSuccess.contact && (
                <p className="text-sm text-amber-400/80 mb-4">Message sent successfully!</p>
              )}

              <form onSubmit={(e) => handleSubmit(e, "contact")} className="space-y-3">
                <div>
                  <input type="text" name="name" placeholder="Your Name" value={formData.name}
                    onChange={(e) => handleChange(e, "contact")}
                    className={`${inputCls} ${formErrors.name ? errorInputCls : ""}`} />
                  {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input type="email" name="email" placeholder="Email (optional)" value={formData.email}
                      onChange={(e) => handleChange(e, "contact")}
                      className={`${inputCls} ${formErrors.email ? errorInputCls : ""}`} />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone}
                    onChange={(e) => handleChange(e, "contact")} className={inputCls} />
                </div>
                <div>
                  <textarea name="message" placeholder="Your Message" value={formData.message}
                    onChange={(e) => handleChange(e, "contact")} rows={5}
                    className={`${inputCls} resize-none ${formErrors.message ? errorInputCls : ""}`} />
                  {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting.contact}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                  {isSubmitting.contact ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Sending…</span></> : <><Send className="w-4 h-4" /><span>Send Message</span></>}
                </button>
              </form>
            </motion.div>

            {/* Partnership form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="font-display text-xl font-semibold text-white mb-2">Join Our Partnership</h3>
              <p className="text-white/30 text-sm mb-6 font-light">
                Become part of a family touching lives around the globe.
              </p>

              {submitSuccess.partnership && (
                <p className="text-sm text-amber-400/80 mb-4">Partnership request submitted!</p>
              )}

              <form onSubmit={(e) => handleSubmit(e, "partnership")} className="space-y-3">
                <div>
                  <input type="text" name="firstName" placeholder="First Name" value={partnershipData.firstName}
                    onChange={(e) => handleChange(e, "partnership")}
                    className={`${inputCls} ${formErrors.firstName ? errorInputCls : ""}`} />
                  {formErrors.firstName && <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>}
                </div>
                <div>
                  <input type="tel" name="telephone" placeholder="Telephone" value={partnershipData.telephone}
                    onChange={(e) => handleChange(e, "partnership")}
                    className={`${inputCls} ${formErrors.telephone ? errorInputCls : ""}`} />
                  {formErrors.telephone && <p className="text-red-400 text-xs mt-1">{formErrors.telephone}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="city" placeholder="City" value={partnershipData.city}
                    onChange={(e) => handleChange(e, "partnership")} className={inputCls} />
                  <select name="category" value={partnershipData.category}
                    onChange={(e) => handleChange(e, "partnership")}
                    className={`${inputCls} appearance-none`}>
                    <option value="" disabled>Category</option>
                    <option value="book-ministry">Book Ministry Partner</option>
                    <option value="church-building">Church Building Partner</option>
                    <option value="welfare">Welfare Partner</option>
                  </select>
                </div>
                <button type="submit" disabled={isSubmitting.partnership}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-xl transition-colors cursor-pointer disabled:opacity-50 mt-2">
                  {isSubmitting.partnership ? "Submitting…" : "Join Partnership"}
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact
