"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            alert("Thank you for your message. We will get back to you shortly.");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans pb-24 pt-32">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container px-4 mx-auto mb-16 text-center max-w-3xl"
            >
                <span className="text-[#D2B48C] font-bold tracking-widest uppercase text-xs mb-4 block">
                    Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                    Contact Us
                </h1>
                <p className="text-gray-600 leading-relaxed text-lg">
                    Whether you have a question about our premium spices, need a wholesale quote, or just want to say hello, our team is ready to assist you.
                </p>
            </motion.div>

            <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 lg:max-w-md"
                    >
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 h-full shadow-sm">
                            <h2 className="text-2xl font-serif font-bold mb-8">Contact Information</h2>
                            
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#D2B48C]/20 group-hover:bg-[#D2B48C] transition-colors duration-300">
                                        <MapPin className="text-[#D2B48C] group-hover:text-white transition-colors duration-300" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Our Location</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Matara District<br />
                                            Southern Province<br />
                                            Sri Lanka
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#D2B48C]/20 group-hover:bg-[#D2B48C] transition-colors duration-300">
                                        <Phone className="text-[#D2B48C] group-hover:text-white transition-colors duration-300" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                        <p className="text-gray-600 text-sm">
                                            +94 77 123 4567<br />
                                            Mon-Fri, 9am - 6pm (IST)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-[#D2B48C]/20 group-hover:bg-[#D2B48C] transition-colors duration-300">
                                        <Mail className="text-[#D2B48C] group-hover:text-white transition-colors duration-300" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                        <p className="text-gray-600 text-sm">
                                            info@taprovia.com<br />
                                            sales@taprovia.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-[2]"
                    >
                        <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-500">
                            <h2 className="text-2xl font-serif font-bold mb-8">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="name" 
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D2B48C] focus:ring-2 focus:ring-[#D2B48C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D2B48C] focus:ring-2 focus:ring-[#D2B48C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-gray-700">Subject</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D2B48C] focus:ring-2 focus:ring-[#D2B48C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        rows={6}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D2B48C] focus:ring-2 focus:ring-[#D2B48C]/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-[#D2B48C] hover:bg-[#b09673] text-white font-bold px-8 py-6 rounded-full text-sm uppercase tracking-widest transition-all w-full sm:w-auto flex items-center justify-center gap-2 group shadow-md"
                                >
                                    {isSubmitting ? "Sending..." : (
                                        <>
                                            Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
