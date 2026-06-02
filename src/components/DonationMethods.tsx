"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence, easeInOut, motion } from "framer-motion"
import { Building, Check, ChevronDown, Copy, Heart, Phone, Smartphone } from "lucide-react"

interface DonationDetail { label: string; value: string }
interface DonationMethod {
  icon: React.ElementType
  name: string
  details: DonationDetail[]
  instructions: string
}

export default function DonationMethods({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("mobile")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [expandedMethod, setExpandedMethod] = useState<number | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const mobileMethods: DonationMethod[] = [
    {
      icon: Phone,
      name: "MTN Mobile Money",
      details: [
        { label: "Momo Pay ID", value: "276822" },
        { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
        { label: "Phone", value: "024 237 1411" },
      ],
      instructions: "Open your MTN MoMo app, select 'Pay' and enter our MoMo Pay ID or phone number.",
    },
    {
      icon: Phone,
      name: "Telecel Cash",
      details: [
        { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
        { label: "Phone", value: "050 658 7666" },
      ],
      instructions: "Dial *110# on your Telecel line, select 'Send Money' and enter our phone number.",
    },
    {
      icon: Phone,
      name: "AT Money",
      details: [
        { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
        { label: "Phone", value: "057 441 0001" },
      ],
      instructions: "Open your AT Money app, select 'Transfer' and enter our phone number.",
    },
  ]

  const bankMethods: DonationMethod[] = [
    {
      icon: Building,
      name: "USD Account",
      details: [
        { label: "Bank", value: "ECOBANK" },
        { label: "Account Name", value: "Lovereign Bible Church" },
        { label: "Account", value: "3441002209588" },
        { label: "Swift Code", value: "ECOCGHAC" },
      ],
      instructions: "For international transfers, please include the Swift Code. Transfers take 1–3 business days.",
    },
    {
      icon: Building,
      name: "Ghana Cedis Account",
      details: [
        { label: "Bank", value: "ECOBANK" },
        { label: "Account Name", value: "Lovereign Bible Church" },
        { label: "Account", value: "1441000860595" },
      ],
      instructions: "For local transfers, include 'Donation' in the reference field. Usually processed within 24 hours.",
    },
  ]

  const methods = activeTab === "mobile" ? mobileMethods : bankMethods

  return (
    <div className={`py-20 ${className}`}>
      <div className="container mx-auto px-6 max-w-2xl">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto mb-6 glass rounded-2xl flex items-center justify-center glow-gold">
            <Heart className="text-amber-400" size={26} />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] text-amber-400/60 uppercase block mb-4">Give</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">Ways to Give</h2>
          <div className="divider-glow w-40 mx-auto mb-5" />
          <p className="text-white/40 font-light text-sm max-w-md mx-auto">
            Your generous donations help us continue our mission and support our community.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="glass rounded-2xl p-1 flex gap-1">
            {[
              { id: "mobile", Icon: Smartphone, label: "Mobile Money" },
              { id: "bank", Icon: Building, label: "Bank Transfer" },
            ].map(({ id, Icon, label }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setExpandedMethod(null) }}
                className={`flex items-center gap-2 py-2.5 px-5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === id
                    ? "bg-white/[0.08] text-white border border-white/[0.1]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Methods list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-0"
          >
            {methods.map((method, index) => {
              const Icon = method.icon
              const isOpen = expandedMethod === index
              return (
                <div key={method.name} className="border-t border-white/[0.06]">
                  {/* Header row */}
                  <button
                    onClick={() => setExpandedMethod(isOpen ? null : index)}
                    className="w-full flex items-center gap-4 py-5 text-left cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
                      <Icon className="text-white/50 group-hover:text-purple-300 transition-colors" size={16} />
                    </div>
                    <span className="flex-grow text-white/80 font-medium text-sm group-hover:text-white transition-colors">
                      {method.name}
                    </span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="text-white/25 group-hover:text-white/50 transition-colors" size={16} />
                    </motion.div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeInOut }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 space-y-2">
                          {method.details.map((detail) => (
                            <div
                              key={detail.label}
                              className="flex items-center justify-between py-3 px-4 glass rounded-xl"
                            >
                              <span className="text-white/35 text-sm">{detail.label}</span>
                              <div className="flex items-center gap-3">
                                <span className="text-white font-medium text-sm">{detail.value}</span>
                                <button
                                  onClick={() => copyToClipboard(detail.value)}
                                  className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                                  title="Copy"
                                >
                                  {copiedText === detail.value
                                    ? <Check size={13} className="text-amber-400" />
                                    : <Copy size={13} />
                                  }
                                </button>
                              </div>
                            </div>
                          ))}
                          <p className="text-white/30 text-xs italic px-1 pt-2">{method.instructions}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
            <div className="border-t border-white/[0.06]" />
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          className="text-center text-white/25 text-xs mt-8 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Questions about donations?{" "}
          <a href="mailto:info@lovereignBibleChurch.org" className="text-amber-400/70 hover:text-amber-300 transition-colors">
            info@lovereignBibleChurch.org
          </a>
        </motion.p>

      </div>
    </div>
  )
}
