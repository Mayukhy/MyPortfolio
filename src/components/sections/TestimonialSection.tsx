"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import { randomCanvasData } from "@/data/data"
import Canvas from "../ui/Canvas"
import { useTheme } from "../theme/ThemeProvider"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80",
    content: "Working with this developer was an absolute pleasure. The attention to detail and modern design approach exceeded our expectations. The final product was not only functional but also visually stunning.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLab",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    content: "Exceptional communication and technical skills. The project was delivered on time and within budget. The code quality and documentation were outstanding. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    company: "DesignStudio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    content: "The collaboration was seamless and the results were impressive. The developer's understanding of user experience and modern web standards made our project a success.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Startup Founder",
    company: "NextGen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content: "Outstanding work ethic and technical expertise. The developer transformed our vision into a beautiful, functional application that our users love. Will definitely work together again!",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "GrowthCo",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    content: "Professional, reliable, and incredibly talented. The website they built for us has significantly improved our conversion rates. The attention to performance and SEO was impressive.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "CTO",
    company: "ScaleTech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    content: "Technical excellence combined with business understanding. The developer delivered a scalable solution that has grown with our business. The architecture and code quality are exemplary.",
    rating: 5,
  },
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function TestimonialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const {isEmojisphereActive, isMobile} = useTheme()
  
  // Parallax effects
  const testimonialsRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  return (
    <section ref={testimonialsRef} id="testimonials" className="section-padding relative overflow-hidden z-20">
      { isEmojisphereActive && !isMobile && randomCanvasData[4].map((canvasDetails, index) => (
        <Canvas key={`testimonials-${index}`} details={canvasDetails} />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Client <span className="heading-gradient">Testimonials</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Hear what clients have to say about working together and the results we&apos;ve achieved.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ y: cardsY }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-border/50">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let&apos;s work together to bring your ideas to life. I&apos;m committed to delivering exceptional results that exceed expectations.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 focus-ring"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  )
} 