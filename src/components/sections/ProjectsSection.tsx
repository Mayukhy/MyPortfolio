"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github } from "lucide-react"
import { useDrag } from "@use-gesture/react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and responsive design.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A creative portfolio website showcasing projects with smooth animations and modern design principles.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard with interactive maps, detailed forecasts, and location-based weather information.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS Grid"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Social Media Clone",
    description: "A social media platform with user authentication, real-time messaging, and content sharing capabilities.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "AI Chat Application",
    description: "An AI-powered chat application with natural language processing and intelligent response generation.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "OpenAI API", "Node.js", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 7,
    title: "YT AI Application",
    description: "An AI-powered Video/ Studio with AI companion intelligent response generation.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "OpenAI API", "Node.js", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

const CARD_WIDTH = 400
const CARD_GAP = 40
const SWIPE_THRESHOLD = 120
const MAX_DRAG = 120
const TAB_CARD_WIDTH = 280
// Mobile responsive constants
const MOBILE_CARD_WIDTH = 180
const MOBILE_CARD_GAP = 20

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

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(2)
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const hasSwipedRef = useRef(false)
  const [windowWidth, setWindowWidth] = useState(1024) // Default desktop width
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setWindowWidth(window.innerWidth)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mod = (n: number, m: number) => ((n % m) + m) % m

  const bind = useDrag(
    ({ down, movement: [mx], last }: any) => {
      setIsDragging(down)

      const clampedX = Math.max(-MAX_DRAG, Math.min(mx, MAX_DRAG))
      setDragX(down ? clampedX : 0)

      if (down && !hasSwipedRef.current) {
        if (mx > SWIPE_THRESHOLD) {
          setIndex((prev) => mod(prev - 1, projects.length))
          hasSwipedRef.current = true
        } else if (mx < -SWIPE_THRESHOLD) {
          setIndex((prev) => mod(prev + 1, projects.length))
          hasSwipedRef.current = true
        }
      }

      if (last) {
        setDragX(0)
        hasSwipedRef.current = false
      }
    },
    { filterTaps: true }
  )

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="heading-gradient">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore my latest work showcasing modern web development techniques and creative design solutions.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full md:min-h-[600px] min-h-[400px] overflow-hidden flex items-center justify-center relative"
        >
          <div
            className="projucts__container relative w-full h-full flex justify-center items-center"
            {...bind()}
          >
            {projects.map((project, i) => {
              const offset = mod(i - index, projects.length)
              const isLeft = offset > projects.length / 2
              const visualOffset = isLeft ? offset - projects.length : offset
              const isCenter = visualOffset === 0

              const zIndex = 1000 - Math.abs(visualOffset)
              
              const scaleMap: Record<string, number> = {
                "-3": 0.7,
                "-2": 0.75,
                "-1": 0.8,
                "0": isDragging ? 1.05 : 1,
                "1": 0.8,
                "2": 0.75,
                "3": 0.7,
              }

              const scale = scaleMap[String(visualOffset)] ?? 0.5

              // Define transform maps - adjusted for mobile
              const offsetMap: Record<string, { x: number; z: number; rotate: number }> = {
                "-3": { x: -80, z: -60, rotate: 45 },
                "-2": { x: -50, z: -40, rotate: 30 },
                "-1": { x: -25, z: -20, rotate: 15 },
                "0": { x: 0, z: 0, rotate: 0 },
                "1": { x: 25, z: -20, rotate: -15 },
                "2": { x: 50, z: -40, rotate: -30 },
                "3": { x: 80, z: -60, rotate: -45 },
              }

              const key = String(visualOffset)
              const transformValues = offsetMap[key] || { x: 150 * visualOffset, z: -60, rotate: visualOffset < 0 ? 60 : -60 }
              
              // Responsive card width
              const cardWidth = windowWidth < 649 ? MOBILE_CARD_WIDTH : windowWidth < 990 ? TAB_CARD_WIDTH : CARD_WIDTH
              const cardGap = windowWidth <= 768 ? MOBILE_CARD_GAP : CARD_GAP
              const x = isCenter
                ? dragX
                : visualOffset * (cardWidth * 0.3 + cardGap * 0.1)
              const translateX = isCenter ? dragX : transformValues.x
              const translateZ = transformValues.z
              const rotateY = transformValues.rotate

              const transform = `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg)`

              return (
                <motion.div
                  key={project.id}
                  animate={{ x, scale, zIndex, rotateY }}
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className="absolute bg-card rounded-xl shadow-xl overflow-hidden"
                  style={{
                    width: `${cardWidth}px`,
                    height: windowWidth < 650 ? "250px" : windowWidth < 1024 ? "350px" : "450px",
                    top: "50%",
                    left: "50%",
                    transform,
                    transformStyle: "preserve-3d",
                    cursor: "grab",
                    boxShadow:
                      isCenter && isDragging
                        ? "0 15px 40px rgba(0,0,0,0.2)"
                        : "0 8px 20px rgba(0,0,0,0.1)",
                    opacity: scale < 0.5 ? 0 : 1,
                  }}
                  onClick={() => {
                    if (!isDragging && !isCenter) {
                      setIndex(i)
                    }
                  }}
                >
                  <ProjectCard project={project} index={i} isCenter={isCenter} windowWidth={windowWidth} isClient={isClient} />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center items-center space-x-2 mt-4 md:mt-8"
        >
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                i === index ? "bg-primary" : "bg-muted"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    technologies: string[]
    liveUrl: string
    githubUrl: string
    featured: boolean
  }
  index: number
  isCenter: boolean
  windowWidth: number
  isClient: boolean
}

function ProjectCard({ project, index, isCenter, windowWidth, isClient }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="w-full h-full flex flex-col group relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 dark:from-background/80 dark:via-background/60 dark:to-background/80"
                            animate={{
          opacity: windowWidth <= 768 ? 1 : (isHovered ? 1 : 0.5),
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glassmorphism Card */}
      <div className="relative w-full h-full flex flex-col bg-card/80 rounded-xl overflow-hidden shadow-2xl">
        {/* Full Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Image - Full Card */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: windowWidth <= 768 ? 1.05 : (isHovered ? 1.15 : 1),
              filter: isCenter 
                ? (windowWidth <= 768 ? "brightness(1.05) contrast(1.05)" : (isHovered ? "brightness(1.1) contrast(1.1)" : ""))
                : (isHovered ? "grayscale(100%) brightness(0.9) contrast(1.3)" : "grayscale(100%) brightness(0.8) contrast(1.2)")
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Gradient Overlay - Only for center card */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/80"
                                      animate={{
              opacity: (windowWidth <= 768 && isCenter) ? 0.8 : (isCenter && isHovered) ? 0.8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating Action Buttons - Only for center card */}
          {isCenter && (
            <motion.div
              className="absolute top-2 sm:top-4 z-[20] right-2 sm:right-4 gap-1 flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: windowWidth <= 768 ? 1 : (isHovered ? 1 : 0),
                x: windowWidth <= 768 ? 0 : isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <motion.a
                href={project.liveUrl}
                className="p-2 sm:p-3 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white/30 dark:hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View live project"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                className="p-2 sm:p-3 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white/30 dark:hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="View source code"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.a>
            </motion.div>
          )}

          {/* Content Overlay - Only for center card */}
          {isCenter && (
            <motion.div
              className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-6 ${windowWidth <= 768 ? "backdrop-blur-md bg-black/20 dark:bg-black/40" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: windowWidth <= 768 ? 1 : (isHovered ? 1 : 0),
                y: windowWidth <= 768 ? 0 : isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Animated Background Elements */}
              <motion.div
                className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-background/40 dark:to-background/60 rounded-full blur-xl"
                animate={{
                  scale: windowWidth <= 768 ? 1.1 : (isHovered ? 1.2 : 1),
                  rotate: windowWidth <= 768 ? 90 : (isHovered ? 180 : 0),
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              
              <motion.div
                className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-background/40 dark:to-background/60 rounded-full blur-xl"
                animate={{
                  scale: windowWidth <= 768 ? 1.15 : (isHovered ? 1.3 : 1),
                  rotate: windowWidth <= 768 ? -90 : (isHovered ? -180 : 0),
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Title */}
              <motion.h3
                className="text-sm sm:text-xl font-bold mb-2 sm:mb-3 mt-2 sm:mt-4 text-white dark:text-foreground relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ color: "#3B82F6" }}
              >
                {project.title}
              </motion.h3>
              
              {/* Description */}
              <motion.p
                className="text-white/90 dark:text-muted-foreground mb-3 sm:mb-6 leading-relaxed flex-1 relative z-10 text-xs sm:text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                {project.description}
              </motion.p>

              {/* Technologies */}
              <motion.div
                className="flex flex-wrap gap-1 sm:gap-2 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {project.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-2 sm:px-3 py-1 text-xs font-medium bg-white/20 dark:bg-black/40 text-white dark:text-foreground rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2 + techIndex * 0.1,
                      duration: 0.3 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#DBEAFE",
                      border: "none",
                      color: "#1F2937",
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Hover Glow Effect - Only for center card */}
          {isCenter && (
            <motion.div
              className="absolute backdrop-blur-md bg-black/50 dark:bg-background/80 inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl"
              animate={{
                opacity: windowWidth <= 768 ? 0.3 : (isHovered ? 1 : 0),
              }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
} 