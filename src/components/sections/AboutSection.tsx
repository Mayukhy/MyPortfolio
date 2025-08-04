"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Palette, Zap, Globe, Droplet } from "lucide-react"
import { randomCanvasData } from "@/data/data"
import Canvas from "../ui/Canvas"
import { useTheme } from "../theme/ThemeProvider"

const skills = [
  { name: "Shopify Liquid", level: 80, icon: Droplet },
  { name: "React", level: 90, icon: Code },
  { name: "TypeScript", level: 85, icon: Code },
  { name: "Next.js", level: 88, icon: Zap },
  { name: "Tailwind CSS", level: 90, icon: Palette },
  { name: "Framer Motion", level: 65, icon: Zap },
  { name: "Node.js", level: 75, icon: Globe },
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

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const {isEmojisphereActive, isMobile} = useTheme()
  
  // Parallax effects
  const aboutRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  })
  
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const skillsY = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  return (
    <section ref={aboutRef} id="about" className="section-padding relative overflow-hidden z-20">
      { isEmojisphereActive && !isMobile && randomCanvasData[2].map((canvasDetails, index) => (
        <Canvas key={`about-${index}`} details={canvasDetails} />
      ))}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div 
            variants={itemVariants} 
            className="space-y-6"
            style={{ y: contentY }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold"
              variants={itemVariants}
            >
              About <span className="heading-gradient">Me</span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              I&apos;m a passionate creative developer who loves crafting beautiful and functional digital experiences. 
              With a strong foundation in modern web technologies, I bring ideas to life through clean code and 
              innovative design solutions.
            </motion.p>
            
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              My journey in web development started with curiosity and has evolved into a passion for creating 
              seamless user experiences. I believe in the power of well-designed interfaces that not only look 
              great but also provide intuitive functionality.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-3xl font-bold text-primary">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-3xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills */}
          <motion.div 
            variants={itemVariants} 
            className="space-y-6"
          >
            <motion.h3
              className="text-2xl font-semibold"
              variants={itemVariants}
            >
              Technical Skills
            </motion.h3>
            
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <skill.icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ delay: index * 0.1, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="text-center p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
            <p className="text-muted-foreground">
              Writing maintainable and scalable code that follows best practices.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Creative Design</h3>
            <p className="text-muted-foreground">
              Creating visually appealing and user-friendly interfaces.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance</h3>
            <p className="text-muted-foreground">
              Optimizing applications for speed and smooth user experience.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 