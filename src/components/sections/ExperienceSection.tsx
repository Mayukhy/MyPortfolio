"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar, MapPin, Building, Code, ShoppingCart } from "lucide-react"
import { randomCanvasData } from "@/data/data"
import Canvas from "../ui/Canvas"
import { useTheme } from "../theme/ThemeProvider"

const experiences = [
  {
    company: "Tech Mahindra",
    position: "Software Engineer",
    location: "Kolkata, India",
    duration: "March 2025 - Current",
    icon: ShoppingCart,
    highlights: [
      "Led end-to-end development on luxury Shopify stores, including Escentric Molecules and Jewells, delivering fully customized e-commerce experiences aligned with each brand's premium positioning.",
      "Custom Feature Implementation: Developed free gifts with purchase logic based on cart value or product combinations.",
      "Built a dynamic free sample allocation system that adjusted in real-time based on cart quantity.",
      "Created advanced cart and checkout logic for gifting, product bundling, and promotions tailored to specific customer behaviors.",
      "Theme Development & Customization: Extended Shopify's default themes with custom Liquid templates, JavaScript, and Shopify Scripts, enabling features not available out-of-the-box.",
      "UI/UX Design Integration: Collaborated closely with design teams to implement elegant, intuitive interfaces that matched the luxury feel of each brand.",
      "Mobile Optimization & Performance Tuning: Delivered fully responsive designs across all screen sizes and conducted in-depth cross-browser and cross-device QA testing.",
      "Cross-Functional Collaboration: Worked with product managers, designers, and QA to translate business goals into seamless digital experiences."
    ]
  },
  {
    company: "Tech Mahindra",
    position: "Associate Software Engineer",
    location: "Kolkata, India",
    duration: "March 2024 - March 2025",
    icon: ShoppingCart,
    highlights: [
      "Led end-to-end development on luxury Shopify stores, including Escentric Molecules and Jewells, delivering fully customized e-commerce experiences aligned with each brand's premium positioning.",
      "Custom Feature Implementation: Developed free gifts with purchase logic based on cart value or product combinations.",
      "Built a dynamic free sample allocation system that adjusted in real-time based on cart quantity.",
      "Created advanced cart and checkout logic for gifting, product bundling, and promotions tailored to specific customer behaviors.",
      "Theme Development & Customization: Extended Shopify's default themes with custom Liquid templates, JavaScript, and Shopify Scripts, enabling features not available out-of-the-box.",
      "UI/UX Design Integration: Collaborated closely with design teams to implement elegant, intuitive interfaces that matched the luxury feel of each brand.",
      "Mobile Optimization & Performance Tuning: Delivered fully responsive designs across all screen sizes and conducted in-depth cross-browser and cross-device QA testing.",
      "Cross-Functional Collaboration: Worked with product managers, designers, and QA to translate business goals into seamless digital experiences."
    ]
  },
  {
    company: "EHS Prints",
    position: "MERN Developer",
    location: "Remote, India",
    duration: "November 2023 - February 2024",
    icon: Code,
    highlights: [
      "Implemented new features to enhance the functionality and overall user experience of the company's web platform.",
      "Designed and developed a client-designer interaction workflow, enabling clients to collaborate with designers more effectively, in real time.",
      "Built an interactive instruction form, allowing clients to submit design briefs and visualize their instructions through a responsive UI, improving clarity, and reducing back-and-forth revisions.",
      "Worked with the MERN stack (MongoDB, Express, React.js, Node.js) to build a scalable and maintainable application structure."
    ]
  }
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

const timelineVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const {isEmojisphereActive, isMobile} = useTheme()
  
  // Parallax effects
  const experienceRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"]
  })
  
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const timelineY = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  return (
    <section ref={experienceRef} id="experience" className="section-padding relative overflow-hidden z-20">
      { isEmojisphereActive && !isMobile && randomCanvasData[7].map((canvasDetails, index) => (
        <Canvas key={`experience-${index}`} details={canvasDetails} />
      ))}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants} 
            className="text-center space-y-4"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold"
              variants={itemVariants}
            >
              My <span className="heading-gradient">Experience</span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
              variants={itemVariants}
            >
              A journey through my professional experience, showcasing the projects, technologies, and growth that have shaped my career in software development.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <motion.div 
            variants={itemVariants}
            className="relative"
            // style={{ y: timelineY }}
          >
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden lg:block" />
            
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  variants={timelineVariants}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-3 h-3 bg-primary rounded-full border-4 border-background shadow-lg hidden lg:block" />
                  
                  <div className="lg:ml-12 bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <experience.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {experience.position}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building className="w-4 h-4" />
                            <span className="font-medium">{experience.company}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {experience.highlights.map((highlight, highlightIndex) => (
                        <motion.div
                          key={highlightIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: highlightIndex * 0.1 }}
                          className="flex gap-3"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">
                            {highlight}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 