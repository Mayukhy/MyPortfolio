"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Trophy, Award, Star, Target, TrendingUp, Users, Code, Zap } from "lucide-react"
import { useSounds } from "@/hooks/useSounds"
import Canvas from "../ui/Canvas"
import { randomCanvasData } from "@/data/data"
import { useTheme } from "../theme/ThemeProvider"

const achievements = [
  {
    icon: Trophy,
    title: "Bravo Award (2x)",
    description: "Recognized as the top developer in the 2025 Tech Innovation Challenge",
    year: "2025",
    category: "Recognition"
  },
  {
    icon: Users,
    title: "50+ Happy Clients",
    description: "Successfully delivered projects for over 10,000 satisfied clients worldwide",
    year: "2024-2025",
    category: "Client Success"
  },
  {
    icon: Code,
    title: "20+ Projects Completed",
    description: "Successfully completed over 100 diverse projects across various technologies",
    year: "2024-2025",
    category: "Project Milestone"
  },
  {
    icon: TrendingUp,
    title: "95% Client Satisfaction",
    description: "Maintained exceptional client satisfaction rate across all projects",
    year: "2025",
    category: "Quality"
  },
  {
    icon: Target,
    title: "12+ Technologies Mastered",
    description: "Proficient in over 50 different technologies and frameworks",
    year: "2025",
    category: "Skills"
  },
  {
    icon: Zap,
    title: "24/7 Support Excellence",
    description: "Provided round-the-clock support with 99.9% uptime guarantee",
    year: "2025",
    category: "Service"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function AchievementsSection() {
  const { playHover } = useSounds()
  const { isEmojisphereActive, isMobile } = useTheme()
  // Parallax effects
  const achievementsRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: achievementsRef,
    offset: ["start end", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={achievementsRef} id="achievements" className="py-20 z-20 relative">
      {/* Emojisphere Component */}
      { isEmojisphereActive && !isMobile && randomCanvasData[6].map((canvasDetails, index) => (
        <div key={`achievements-${index}`} className="z-30">
          <Canvas details={canvasDetails} />
        </div>
      ))}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            My{" "}
            <span className="heading-gradient">Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Celebrating milestones and accomplishments that define my journey in creative development
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          style={{ y: cardsY }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Achievement icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                  <achievement.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  {achievement.year}
                </span>
              </div>

              {/* Achievement content */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-primary/70 bg-primary/10 px-2 py-1 rounded-md">
                    {achievement.category}
                  </span>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="text-2xl"
                  >
                    🏆
                  </motion.div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />


              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className=" grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { number: "20+", label: "Projects", icon: Code },
            { number: "50+", label: "Clients", icon: Users },
            { number: "95%", label: "Satisfaction", icon: Star },
            { number: "12+", label: "Technologies", icon: Zap }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onHoverStart={playHover}
              className="text-center group"
            >
              <div className="p-4 bg-card/30 rounded-xl border border-border/30 group-hover:border-primary/30 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 