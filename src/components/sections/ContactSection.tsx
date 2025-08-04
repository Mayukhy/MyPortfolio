"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import Canvas from "../ui/Canvas"
import { randomCanvasData } from "@/data/data"
import { useTheme } from "../theme/ThemeProvider"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "dasmayukh2019@gmail.com",
    href: "mailto:dasmayukh2019@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 8420636379",
    href: "tel:+918420636379",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kolkata, India",
    href: "",
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/Mayukhy", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mayukh-das-536185238", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/MayukhDas_2000", label: "Twitter" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isEmojisphereActive, isMobile } = useTheme()
  // Parallax effects
  const contactRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const formY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const infoY = useTransform(scrollYProgress, [0, 1], [0, -150])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section ref={contactRef} id="contact" className="section-padding relative overflow-hidden">
      {/* Emojisphere Component */}
      { isEmojisphereActive && !isMobile && randomCanvasData[5].map((canvasDetails, index) => (
        <div key={`contact-${index}`} className="z-30">
          <Canvas details={canvasDetails} />
        </div>
      ))}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
          style={{ y: headerY }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Get In <span className="heading-gradient">Touch</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Ready to start a project or just want to chat? I&apos;d love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
            style={{ y: formY }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus-ring transition-colors"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus-ring transition-colors"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-2"
              >
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus-ring transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mx-auto"
                  />
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
            style={{ y: infoY }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{info.title}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors focus-ring"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    variants={itemVariants}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
                              <h4 className="text-lg font-semibold mb-2">Let&apos;s Work Together</h4>
                              <p className="text-muted-foreground">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 