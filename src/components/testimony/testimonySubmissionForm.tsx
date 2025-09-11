"use client";

import type React from "react";
import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Heart, Send, X } from "lucide-react";

interface TestimonySubmissionFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TestimonySubmissionForm({
                                                    isOpen,
                                                    onClose,
                                                }: TestimonySubmissionFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        testimony: "",
    });
    const [contactType, setContactType] = useState<"email" | "phone">("email");
    const [isSending, setIsSending] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.contact || !formData.testimony) {
            alert("Please fill in all fields.");
            return;
        }

        setIsSending(true);

        try {
            // Simulate form submission - replace with actual API or email service
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert(
                "Thank you for sharing your testimony! We'll review it and may feature it on our website."
            );
            setFormData({ name: "", contact: "", testimony: "" });
            onClose();
        } catch (error) {
            console.error("Error sending testimony:", error);
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSending(false);
        }
    };

    // Animation Variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    const modalVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 50,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 50,
            transition: {
                duration: 0.3,
            },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className="
          w-full
          max-w-sm sm:max-w-md
          max-h-[90vh]
          bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30
          backdrop-blur-sm rounded-2xl shadow-2xl
          border border-amber-200/50
          relative overflow-y-auto
        "
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Content */}
                        <motion.div
                            className="relative z-10 p-3 sm:p-4"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Header */}
                            <motion.div className="text-center mb-4 sm:mb-6" variants={itemVariants}>
                                <motion.div
                                    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10
                               bg-gradient-to-br from-amber-500/20 to-orange-500/20
                               backdrop-blur-sm rounded-xl mb-2 sm:mb-3 border border-amber-200/30"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                                </motion.div>

                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
                    <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                        Share Your{" "}
                    </span>
                                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                        Story
                    </span>
                                </h2>

                                <p className="text-gray-600 text-xs sm:text-sm max-w-[90%] sm:max-w-xs mx-auto leading-relaxed">
                                    We'd love to hear how God is working in your life. Your story could inspire
                                    others in their faith journey.
                                </p>
                            </motion.div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                                {/* Name Field */}
                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="name"
                                        className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1"
                                    >
                                        Your Name
                                    </label>
                                    <motion.input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                        className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5
                                   bg-white/80 border border-amber-200/50 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400
                                   text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm text-sm"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>

                                {/* Contact Field */}
                                <motion.div variants={itemVariants}>
                                    <div className="flex items-center justify-between mb-1">
                                        <label
                                            htmlFor="contact"
                                            className="block text-[11px] sm:text-xs font-semibold text-gray-700"
                                        >
                                            Contact Information
                                        </label>
                                        <div className="flex bg-amber-100/50 rounded-lg p-0.5">
                                            <motion.button
                                                type="button"
                                                onClick={() => setContactType("email")}
                                                className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-md transition-all duration-200 ${
                                                    contactType === "email"
                                                        ? "bg-white text-amber-700 shadow-sm"
                                                        : "text-gray-600 hover:text-amber-700"
                                                }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Email
                                            </motion.button>
                                            <motion.button
                                                type="button"
                                                onClick={() => setContactType("phone")}
                                                className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-md transition-all duration-200 ${
                                                    contactType === "phone"
                                                        ? "bg-white text-amber-700 shadow-sm"
                                                        : "text-gray-600 hover:text-amber-700"
                                                }`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Phone
                                            </motion.button>
                                        </div>
                                    </div>
                                    <motion.input
                                        id="contact"
                                        name="contact"
                                        type={contactType === "email" ? "email" : "tel"}
                                        value={formData.contact}
                                        onChange={handleInputChange}
                                        placeholder={
                                            contactType === "email"
                                                ? "Enter your email address"
                                                : "Enter your phone number"
                                        }
                                        className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5
                                   bg-white/80 border border-amber-200/50 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400
                                   text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm text-sm"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>

                                {/* Testimony Field */}
                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="testimony"
                                        className="block text-[11px] sm:text-xs font-semibold text-gray-700 mb-1"
                                    >
                                        Your Testimony
                                    </label>
                                    <motion.textarea
                                        id="testimony"
                                        name="testimony"
                                        value={formData.testimony}
                                        onChange={handleInputChange}
                                        placeholder="Share your story..."
                                        rows={4}
                                        className="w-full px-2.5 py-2 sm:px-3 sm:py-2.5
                                   bg-white/80 border border-amber-200/50 rounded-lg
                                   focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-400
                                   text-gray-900 placeholder-gray-500 transition-all duration-300 shadow-sm resize-none text-sm"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div className="pt-2" variants={itemVariants}>
                                    <motion.button
                                        type="submit"
                                        disabled={isSending}
                                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600
                                   hover:from-amber-700 hover:to-orange-700
                                   text-white font-semibold py-2 sm:py-2.5 px-4 rounded-lg shadow-lg
                                   hover:shadow-xl transition-all duration-300
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center justify-center gap-2 text-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isSending ? (
                                            <>
                                                <motion.div
                                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }}
                                                />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="h-4 w-4" />
                                                <span>Share My Testimony</span>
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                </motion.div>

            )}
        </AnimatePresence>
    );
}
