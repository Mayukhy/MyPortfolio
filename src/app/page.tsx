"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import TestimonialSection from "@/components/sections/TestimonialSection"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"
import LoadingScreen from "@/components/LoadingScreen"
import { useTheme } from "@/components/theme/ThemeProvider"

// Page load animation variants
const pageVariants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { currentMusic, audioRef } = useTheme()
  useEffect(() => {
    // Simulate page load time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // Slightly longer than loading screen

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {currentMusic && (
          <audio ref={audioRef} src={currentMusic.src} loop />
        )}
        {!isLoading && (
          <motion.div
            key="content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-background text-foreground"
          >
            <Navigation />
            
            <motion.main
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={sectionVariants}>
                <HeroSection />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <AboutSection />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <ProjectsSection />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <TestimonialSection />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <ContactSection />
              </motion.div>
            </motion.main>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}