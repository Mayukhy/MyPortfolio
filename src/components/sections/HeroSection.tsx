"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { useSounds } from "@/hooks/useSounds"
import Canvas from "../ui/Canvas"
import { randomCanvasData } from "@/data/data"
import { useTheme } from "../theme/ThemeProvider"
import { useRef } from "react"
import { gsap } from "gsap"

const floatingElements = [
  { icon: "⚡", delay: 0 },
  { icon: "🚀", delay: 0.2 },
  { icon: "💡", delay: 0.4 },
  { icon: "🎨", delay: 0.6 },
]

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

export default function HeroSection() {
  const { playHover, playClick, soundsEnabled } = useSounds()
  const {isEmojisphereActive, setIsEmojisphereActive, setTheme, setCurrentMusic, setIsPlaying, isMobile} = useTheme()
  const growingSpan = useRef(null)
  const headingref = useRef(null)
  
  // Parallax effects
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleEmojiSphere = (e: React.MouseEvent) => {
    playClick()
    
    // Set "to-dark" theme immediately
    if(!isEmojisphereActive) {
      setTheme("to-dark-red")
    } else {
      setTheme("to-light")
    }
    
    // Set the growing span position and initial scale
    gsap.set(growingSpan.current, {
      top: e.clientY,
      left: e.clientX,
      scale: 0,
    });
     setIsEmojisphereActive(!isEmojisphereActive)
    setTimeout(() => {
      if(!isEmojisphereActive) {
        setTheme("dark-red")
        setCurrentMusic({name: "Emoji Sphere", src: "/audios/symphony2.mp3", icon: "🎉"})
        setIsPlaying(true)
      } else {
        setTheme("light")
        if(!soundsEnabled) {
          setCurrentMusic(null)
          setIsPlaying(false)
        } else {
          setCurrentMusic({name: "base", src: "/audios/symphony1.mp3", icon: "🎉"})
          setIsPlaying(true)
        }
      }
    }, 900);
    // Animate the growing span
    gsap.to(growingSpan.current, {
      scale: 3000,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(growingSpan.current, {
          scale: 0,
          clearProps: "all",
          opacity: 0
        });
      },
    });
  }

  return (
    <section ref={heroRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Growing Span for Transition Effect */}
      <span
        ref={growingSpan}
        className={`fixed w-1 h-1 rounded-full pointer-events-none z-10 ${
          !isEmojisphereActive ? "bg-white" : "bg-red-950"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Emojisphere Component */}
      { isEmojisphereActive && !isMobile && randomCanvasData[1].map((canvasDetails, index) => (
        <div key={`hero-${index}`} className="z-30">
          <Canvas details={canvasDetails} />
        </div>
      ))}
      
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ delay: element.delay, duration: 1 }}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + (index % 2) * 40}%`,
            y: floatingY
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20"
        style={{ y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            className="text-lg text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            ref={headingref}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold cursor-pointer select-none group hero__heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEmojiSphere}
            onHoverStart={playHover}
          >
            <span className="heading-gradient">Creative</span>
            <br />
            <span className="text-foreground">Developer</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Crafting digital experiences with modern technologies and creative design.
            <br />
            <span className="text-primary font-medium">React • Next.js • TypeScript • Framer Motion</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHover}
              onClick={playClick}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className={`px-8 py-4 dark:text-white border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted transition-all duration-300 focus-ring`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHover}
              onClick={playClick}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors focus-ring"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                onHoverStart={playHover}
                onClick={playClick}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
} 