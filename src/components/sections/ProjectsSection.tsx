"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Github, Youtube } from "lucide-react"
import { useDrag } from "@use-gesture/react"
import { useSounds } from "@/hooks/useSounds"
import { randomCanvasData } from "@/data/data"
import Canvas from "../ui/Canvas"
import { useTheme } from "../theme/ThemeProvider"
import { filterTags, projects } from "@/constants"

const CARD_WIDTH = 400
const CARD_GAP = 40
const SWIPE_THRESHOLD = 120
const MAX_DRAG = 120
const TAB_CARD_WIDTH = 280
// Mobile responsive constants
const MOBILE_CARD_WIDTH = 230
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

// New Project Card Grid Component
function ProjectCardGrid({ projects, isInView }: { projects: any[], isInView: boolean }) {
  const { playHover, playClick } = useSounds()
  const { isMobile } = useTheme()
  
  // State for tracking loaded images
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  
  const handleImageLoad = (projectId: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(projectId)
      return newSet
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-[16px] md:mx-0 mt-14"
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="group relative"
          // whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative bg-card hover:translate-y-[-8px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30">
            {/* Image Container */}
            <div className="relative h-48 md:h-56 overflow-hidden">
              {/* Blur Placeholder */}
              <motion.div
                className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
                animate={{
                  opacity: loadedImages.has(project.id) ? 0 : 1
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(project.id)}
                whileHover={{ scale: 1.1 }}
                animate={{
                  filter: loadedImages.has(project.id) ? "none" : "blur(20px) brightness(0.8)"
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <motion.h3
                className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {project.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-muted-foreground mb-4 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                {project.description}
              </motion.p>

              {/* Action Buttons */}
              <div className="relative flex gap-2 mb-3 duration-300 z-30">
                {project.liveUrl && (
                  <motion.a
                    aria-label="View live project"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={playHover}
                    onClick={playClick}
                  >
                    <ExternalLink className="w-4 h-4 light:text-black light:bg-black" />
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    aria-label="View source code"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={playHover}
                    onClick={playClick}
                  >
                    <Github className="w-4 h-4 light:text-black light:bg-black" />
                  </motion.a>
                )}
                {project.demoVideo && (
                  <motion.a
                    aria-label="View demo video"
                    href={project.demoVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={playHover}
                    onClick={playClick}
                  >
                    <Youtube className="w-4 h-4 light:text-black light:bg-black" />
                  </motion.a>
                )}
              </div>

              {/* Associated With Badge */}
              {project.asociatedWith && (
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-md rounded-full">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Associated with {isMobile ? project.asociatedWith[1] : project.asociatedWith[0]}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Technologies */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {project.technologies.map((tech: string, techIndex: number) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2 + techIndex * 0.05,
                      duration: 0.3 
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))"
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [index, setIndex] = useState(2)
  const [isDragging, setIsDragging] = useState(false)
  const [currentTag, setCurrentTag] = useState("All")
  const [dragX, setDragX] = useState(0)
  const hasSwipedRef = useRef(false)
  const [windowWidth, setWindowWidth] = useState(1024) // Default desktop width
  const [mounted, setMounted] = useState(false)
  const { playCardFlip, playHover, playClick } = useSounds()
  const {isEmojisphereActive, isMobile} = useTheme()

  const filteredProjects = projects.filter(project => {
    if (currentTag === "All") return true
    return project.technologies.includes(currentTag)
  })

  const handleTagClick = (tag: string) => {
    setCurrentTag(tag)
  }

  
  // Parallax effects
  const projectsRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  })
  
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const carouselY = useTransform(scrollYProgress, [0, 1], [0, -100])
  useEffect(() => {
    setMounted(true)
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
    <section ref={projectsRef} id="projects" className="section-padding relative overflow-hidden z-20">
      { isEmojisphereActive && !isMobile && randomCanvasData[3].map((canvasDetails, index) => (
        <Canvas key={`projects-${index}`} details={canvasDetails} />
      ))}
      <div className="md:container mx-auto px-0 md:px-4 lg:px-[24px]">
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

        <div className="flex flex-wrap gap-2 md:px-0 px-[16px] justify-center items-center space-x-2 mb-4">
          {filterTags.map((tag) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHover}
              onTapStart={playClick}
            key={tag} onClick={() => handleTagClick(tag)} className={`px-4 py-2 rounded-full md:text-base text-sm z-30 ${currentTag === tag ? "bg-primary text-white dark:text-black cyberpunk:text-black" : "bg-muted text-muted-foreground"}`}>
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Conditional Rendering */}
        {!mounted ? (
          <div className="w-full md:min-h-[600px] min-h-[400px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        ) : currentTag === "All" ? (
          // 3D Carousel for "All" tag
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="w-full md:mt-10 mt-14 md:min-h-[600px] min-h-[420px] overflow-hidden flex items-center justify-center relative"
              style={{ y: carouselY }}
            >
            <div
              className="w-full h-full flex items-center justify-center"
              {...bind()}
            >
              {filteredProjects.map((project, i) => {
                const offset = mod(i - index, filteredProjects.length)
                const isLeft = offset > filteredProjects.length / 2
                const visualOffset = isLeft ? offset - projects.length : offset
                const isCenter = visualOffset === 0

                const zIndex = 1000 - Math.abs(visualOffset)
                
                const scaleMap: Record<string, number> = {
                  "-5": 0.7,
                  "-4": 0.75,
                  "-3": 0.8,
                  "-2": 0.85,
                  "-1": 0.9,
                  "0": isDragging ? 1.05 : 1,
                  "1": 0.9,
                  "2": 0.85,
                  "3": 0.8,
                  "4": 0.75,
                  "5": 0.7,
                }

                const scale = scaleMap[String(visualOffset)] ?? 0.5

                // Define transform maps - adjusted for mobile
                const offsetMap: Record<string, { x: number; z: number; rotate: number }> = {
                  "-5": { x: -120, z: -100, rotate: 75 },
                  "-4": { x: -100, z: -80, rotate: 60 },
                  "-3": { x: -80, z: -60, rotate: 45 },
                  "-2": { x: -50, z: -40, rotate: 30 },
                  "-1": { x: -25, z: -20, rotate: 15 },
                  "0": { x: 0, z: 0, rotate: 0 },
                  "1": { x: 25, z: -20, rotate: -15 },
                  "2": { x: 50, z: -40, rotate: -30 },
                  "3": { x: 80, z: -60, rotate: -45 },
                  "4": { x: 100, z: -80, rotate: -60 },
                  "5": { x: 120, z: -100, rotate: -75 },
                }

                const key = String(visualOffset)
                const transformValues = offsetMap[key] || { x: 100 * visualOffset, z: -65, rotate: visualOffset < 0 ? 65 : -65 }
                
                // Responsive card width
                const cardWidth = windowWidth < 649 ? MOBILE_CARD_WIDTH : windowWidth < 990 ? TAB_CARD_WIDTH : CARD_WIDTH
                const cardGap = windowWidth <= 768 ? MOBILE_CARD_GAP : CARD_GAP
                const x = isCenter
                  ? dragX
                  : visualOffset * (cardWidth * 0.23 + cardGap * 0.1)
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
                      height: windowWidth < 650 ? "300px" : windowWidth < 1024 ? "350px" : "450px",
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
                        playCardFlip()
                        setIndex(i)
                      }
                    }}
                  >
                    <ProjectCard project={project} index={i} isCenter={isCenter} windowWidth={windowWidth} isClient={mounted} />
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
            className="flex justify-center items-center space-x-2 md:mt-8"
          >
            {filteredProjects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  playClick()
                  setIndex(i)
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-muted"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={playHover}
              />
            ))}
          </motion.div>
          </>
        ) : (
          // Project Card Grid for other tags
          <ProjectCardGrid projects={filteredProjects} isInView={isInView} />
        )}
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
    liveUrl?: string
    githubUrl?: string
    featured: boolean
    asociatedWith?: string[]
    demoVideo?: string
  }
  index: number
  isCenter: boolean
  windowWidth: number
  isClient: boolean
}

function ProjectCard({ project, index, isCenter, windowWidth, isClient }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { playHover, playClick } = useSounds()
  const { isMobile } = useTheme()

  return (
    <motion.div
      className="w-full h-full flex flex-col group relative overflow-hidden"
      onHoverStart={() => {
        setIsHovered(true)
        playHover()
      }}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 dark:from-background/80 dark:via-background/60 dark:to-background/80 lofi:from-purple-500/20 lofi:via-purple-600/10 lofi:to-purple-700/20 nature:from-green-500/20 nature:via-green-600/10 nature:to-green-700/20 rain:from-blue-500/20 rain:via-blue-600/10 rain:to-blue-700/20 ocean:from-cyan-500/20 ocean:via-cyan-600/10 ocean:to-cyan-700/20 forest:from-amber-500/20 forest:via-amber-600/10 forest:to-amber-700/20 cafe:from-orange-500/20 cafe:via-orange-600/10 cafe:to-orange-700/20 symphony1:from-purple-500/20 symphony1:via-purple-600/10 symphony1:to-purple-700/20 symphony2:from-pink-500/20 symphony2:via-pink-600/10 symphony2:to-pink-700/20 warm:from-rose-500/20 warm:via-rose-600/10 warm:to-rose-700/20 cool:from-cyan-500/20 cool:via-cyan-600/10 cool:to-cyan-700/20 neutral:from-gray-500/20 neutral:via-gray-600/10 neutral:to-gray-700/20 vibrant:from-yellow-500/20 vibrant:via-yellow-600/10 vibrant:to-yellow-700/20 pastel:from-pink-500/20 pastel:via-pink-600/10 pastel:to-pink-700/20 monochrome:from-gray-500/20 monochrome:via-gray-600/10 monochrome:to-gray-700/20 sunset:from-orange-500/20 sunset:via-orange-600/10 sunset:to-orange-700/20 midnight:from-indigo-500/20 midnight:via-indigo-600/10 midnight:to-indigo-700/20 trees:from-green-500/20 trees:via-green-600/10 trees:to-green-700/20 desert:from-amber-500/20 desert:via-amber-600/10 desert:to-amber-700/20 aurora:from-emerald-500/20 aurora:via-emerald-600/10 aurora:to-emerald-700/20 neon:from-green-500/20 neon:via-green-600/10 neon:to-green-700/20 spring:from-lime-500/20 spring:via-lime-600/10 spring:to-lime-700/20 summer:from-yellow-500/20 summer:via-yellow-600/10 summer:to-yellow-700/20 autumn:from-orange-500/20 autumn:via-orange-600/10 autumn:to-orange-700/20 winter:from-cyan-500/20 winter:via-cyan-600/10 winter:to-cyan-700/20 cosmic:from-purple-500/20 cosmic:via-purple-600/10 cosmic:to-purple-700/20 galaxy:from-indigo-500/20 galaxy:via-indigo-600/10 galaxy:to-indigo-700/20 mountain:from-gray-500/20 mountain:via-gray-600/10 mountain:to-gray-700/20 city:from-yellow-500/20 city:via-yellow-600/10 city:to-yellow-700/20 vintage:from-amber-500/20 vintage:via-amber-600/10 vintage:to-amber-700/20 retro:from-pink-500/20 retro:via-pink-600/10 retro:to-pink-700/20 cyberpunk:from-cyan-500/20 cyberpunk:via-cyan-600/10 cyberpunk:to-cyan-700/20 steampunk:from-amber-500/20 steampunk:via-amber-600/10 steampunk:to-amber-700/20 minimalist:from-gray-500/20 minimalist:via-gray-600/10 minimalist:to-gray-700/20 luxury:from-yellow-500/20 luxury:via-yellow-600/10 luxury:to-yellow-700/20 rustic:from-amber-500/20 rustic:via-amber-600/10 rustic:to-amber-700/20 tropical:from-emerald-500/20 tropical:via-emerald-600/10 tropical:to-emerald-700/20 arctic:from-cyan-500/20 arctic:via-cyan-600/10 arctic:to-cyan-700/20 sahara:from-yellow-500/20 sahara:via-yellow-600/10 sahara:to-yellow-700/20 dark-red:from-red-500/20 dark-red:via-red-600/10 dark-red:to-red-700/20"
                            animate={{
          opacity: windowWidth <= 768 ? 1 : (isHovered ? 1 : 0.5),
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glassmorphism Card */}
      <div className="relative w-full h-full flex flex-col bg-card/80 rounded-xl overflow-hidden shadow-2xl">
        {/* Full Image Container */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Blur Placeholder */}
          <motion.div
            className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
            animate={{
              opacity: imageLoaded ? 0 : 1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Image - Full Card */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            animate={{
              scale: windowWidth <= 768 ? 1.05 : (isHovered ? 1.15 : 1),
              filter: isCenter 
                ? (imageLoaded ? "" : "blur(20px) brightness(0.8)")
                : (isHovered && windowWidth > 768 ? "brightness(0.9) contrast(1.3)" : isHovered && windowWidth < 768 ? "brightness(0.9) contrast(1.3) grayscale(100%)" : (imageLoaded ? "brightness(0.8) grayscale(100%) contrast(1.2)" : "blur(20px) brightness(0.8) grayscale(100%) contrast(1.2)"))
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          {/* Background Overlay - Only for center card */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/80"
            animate={{
              opacity: (windowWidth <= 768 && isCenter) ? 0.8 : (isCenter && isHovered) ? 0.8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Background Overlay - Only for non-center cards */}
           { !isCenter && <motion.div
            className="absolute inset-0 bg-muted/60"
            transition={{ duration: 0.3 }}
          />}

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
              {project.liveUrl && <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white/30 dark:hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={playHover}
                onClick={playClick}
                aria-label="View live project"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.a>}
              {project.githubUrl && <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white/30 dark:hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={playHover}
                onClick={playClick}
                aria-label="View source code"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.a>}
              {project.demoVideo && (
                <motion.a
                href={project.demoVideo}
                target="_blank"
                className="p-2 sm:p-3 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-full hover:bg-white/30 dark:hover:bg-black/60 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={playHover}
                onClick={playClick}
                aria-label="View demo video"
                >
                  <Youtube className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </motion.a>
              )}
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
            className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-background/40 dark:to-background/60 lofi:from-purple-500/30 lofi:to-purple-600/40 nature:from-green-500/30 nature:to-green-600/40 rain:from-blue-500/30 rain:to-blue-600/40 ocean:from-cyan-500/30 ocean:to-cyan-600/40 forest:from-amber-500/30 forest:to-amber-600/40 cafe:from-orange-500/30 cafe:to-orange-600/40 symphony1:from-purple-500/30 symphony1:to-purple-600/40 symphony2:from-pink-500/30 symphony2:to-pink-600/40 warm:from-rose-500/30 warm:to-rose-600/40 cool:from-cyan-500/30 cool:to-cyan-600/40 neutral:from-gray-500/30 neutral:to-gray-600/40 vibrant:from-yellow-500/30 vibrant:to-yellow-600/40 pastel:from-pink-500/30 pastel:to-pink-600/40 monochrome:from-gray-500/30 monochrome:to-gray-600/40 sunset:from-orange-500/30 sunset:to-orange-600/40 midnight:from-indigo-500/30 midnight:to-indigo-600/40 trees:from-green-500/30 trees:to-green-600/40 desert:from-amber-500/30 desert:to-amber-600/40 aurora:from-emerald-500/30 aurora:to-emerald-600/40 neon:from-green-500/30 neon:to-green-600/40 spring:from-lime-500/30 spring:to-lime-600/40 summer:from-yellow-500/30 summer:to-yellow-600/40 autumn:from-orange-500/30 autumn:to-orange-600/40 winter:from-cyan-500/30 winter:to-cyan-600/40 cosmic:from-purple-500/30 cosmic:to-purple-600/40 galaxy:from-indigo-500/30 galaxy:to-indigo-600/40 mountain:from-gray-500/30 mountain:to-gray-600/40 city:from-yellow-500/30 city:to-yellow-600/40 vintage:from-amber-500/30 vintage:to-amber-600/40 retro:from-pink-500/30 retro:to-pink-600/40 cyberpunk:from-cyan-500/30 cyberpunk:to-cyan-600/40 steampunk:from-amber-500/30 steampunk:to-amber-600/40 minimalist:from-gray-500/30 minimalist:to-gray-600/40 luxury:from-yellow-500/30 luxury:to-yellow-600/40 rustic:from-amber-500/30 rustic:to-amber-600/40 tropical:from-emerald-500/30 tropical:to-emerald-600/40 arctic:from-cyan-500/30 arctic:to-cyan-600/40 sahara:from-yellow-500/30 sahara:to-yellow-600/40 dark-red:from-red-500/30 dark-red:to-red-600/40 rounded-full blur-xl"
            animate={{
              scale: windowWidth <= 768 ? 1.1 : (isHovered ? 1.2 : 1),
              rotate: windowWidth <= 768 ? 90 : (isHovered ? 180 : 0),
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          
          <motion.div
            className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-secondary/20 to-accent/20 dark:from-background/40 dark:to-background/60 lofi:from-purple-600/30 lofi:to-purple-700/40 nature:from-green-600/30 nature:to-green-700/40 rain:from-blue-600/30 rain:to-blue-700/40 ocean:from-cyan-600/30 ocean:to-cyan-700/40 forest:from-amber-600/30 forest:to-amber-700/40 cafe:from-orange-600/30 cafe:to-orange-700/40 symphony1:from-purple-600/30 symphony1:to-purple-700/40 symphony2:from-pink-600/30 symphony2:to-pink-700/40 warm:from-rose-600/30 warm:to-rose-700/40 cool:from-cyan-600/30 cool:to-cyan-700/40 neutral:from-gray-600/30 neutral:to-gray-700/40 vibrant:from-yellow-600/30 vibrant:to-yellow-700/40 pastel:from-pink-600/30 pastel:to-pink-700/40 monochrome:from-gray-600/30 monochrome:to-gray-700/40 sunset:from-orange-600/30 sunset:to-orange-700/40 midnight:from-indigo-600/30 midnight:to-indigo-700/40 trees:from-green-600/30 trees:to-green-700/40 desert:from-amber-600/30 desert:to-amber-700/40 aurora:from-emerald-600/30 aurora:to-emerald-700/40 neon:from-green-600/30 neon:to-green-700/40 spring:from-lime-600/30 spring:to-lime-700/40 summer:from-yellow-600/30 summer:to-yellow-700/40 autumn:from-orange-600/30 autumn:to-orange-700/40 winter:from-cyan-600/30 winter:to-cyan-700/40 cosmic:from-purple-600/30 cosmic:to-purple-700/40 galaxy:from-indigo-600/30 galaxy:to-indigo-700/40 mountain:from-gray-600/30 mountain:to-gray-700/40 city:from-yellow-600/30 city:to-yellow-700/40 vintage:from-amber-600/30 vintage:to-amber-700/40 retro:from-pink-600/30 retro:to-pink-700/40 cyberpunk:from-cyan-600/30 cyberpunk:to-cyan-700/40 steampunk:from-amber-600/30 steampunk:to-amber-700/40 minimalist:from-gray-600/30 minimalist:to-gray-700/40 luxury:from-yellow-600/30 luxury:to-yellow-700/40 rustic:from-amber-600/30 rustic:to-amber-700/40 tropical:from-emerald-600/30 tropical:to-emerald-700/40 arctic:from-cyan-600/30 arctic:to-cyan-700/40 sahara:from-yellow-600/30 sahara:to-yellow-700/40 dark-red:from-red-600/30 dark-red:to-red-700/40 rounded-full blur-xl"
            animate={{
              scale: windowWidth <= 768 ? 1.15 : (isHovered ? 1.3 : 1),
              rotate: windowWidth <= 768 ? -90 : (isHovered ? -180 : 0),
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

              {/* Title */}
              <motion.h3
                className="text-sm sm:text-xl font-bold mb-2 sm:mb-3 mt-2 sm:mt-4 text-white dark:text-foreground lofi:text-purple-200 nature:text-green-200 rain:text-blue-200 ocean:text-cyan-200 forest:text-amber-200 cafe:text-orange-200 symphony1:text-purple-200 symphony2:text-pink-200 warm:text-rose-200 cool:text-cyan-200 neutral:text-gray-200 vibrant:text-yellow-200 pastel:text-pink-200 monochrome:text-gray-200 sunset:text-orange-200 midnight:text-indigo-200 trees:text-green-200 desert:text-amber-200 aurora:text-emerald-200 neon:text-green-200 spring:text-lime-200 summer:text-yellow-200 autumn:text-orange-200 winter:text-cyan-200 cosmic:text-purple-200 galaxy:text-indigo-200 mountain:text-gray-200 city:text-yellow-200 vintage:text-amber-200 retro:text-pink-200 cyberpunk:text-cyan-200 steampunk:text-amber-200 minimalist:text-gray-200 luxury:text-yellow-200 rustic:text-amber-200 tropical:text-emerald-200 arctic:text-cyan-200 sahara:text-yellow-200 dark-red:text-red-200 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  color: windowWidth <= 768 ? "#3B82F6" : 
                    document.documentElement.classList.contains('lofi') ? "#C084FC" :
                    document.documentElement.classList.contains('nature') ? "#86EFAC" :
                    document.documentElement.classList.contains('rain') ? "#93C5FD" :
                    document.documentElement.classList.contains('ocean') ? "#67E8F9" :
                    document.documentElement.classList.contains('forest') ? "#FCD34D" :
                    document.documentElement.classList.contains('cafe') ? "#FDBA74" :
                    document.documentElement.classList.contains('symphony1') ? "#A855F7" :
                    document.documentElement.classList.contains('symphony2') ? "#EC4899" :
                    document.documentElement.classList.contains('warm') ? "#FB7185" :
                    document.documentElement.classList.contains('cool') ? "#06B6D4" :
                    document.documentElement.classList.contains('neutral') ? "#6B7280" :
                    document.documentElement.classList.contains('vibrant') ? "#F59E0B" :
                    document.documentElement.classList.contains('pastel') ? "#F472B6" :
                    document.documentElement.classList.contains('monochrome') ? "#374151" :
                    document.documentElement.classList.contains('sunset') ? "#F97316" :
                    document.documentElement.classList.contains('midnight') ? "#6366F1" :
                    document.documentElement.classList.contains('trees') ? "#16A34A" :
                    document.documentElement.classList.contains('desert') ? "#D97706" :
                    document.documentElement.classList.contains('aurora') ? "#10B981" :
                    document.documentElement.classList.contains('neon') ? "#22C55E" :
                    document.documentElement.classList.contains('spring') ? "#84CC16" :
                    document.documentElement.classList.contains('summer') ? "#EAB308" :
                    document.documentElement.classList.contains('autumn') ? "#F97316" :
                    document.documentElement.classList.contains('winter') ? "#7DD3FC" :
                    document.documentElement.classList.contains('cosmic') ? "#A855F7" :
                    document.documentElement.classList.contains('galaxy') ? "#6366F1" :
                    document.documentElement.classList.contains('mountain') ? "#6B7280" :
                    document.documentElement.classList.contains('city') ? "#F59E0B" :
                    document.documentElement.classList.contains('vintage') ? "#B45309" :
                    document.documentElement.classList.contains('retro') ? "#EC4899" :
                    document.documentElement.classList.contains('cyberpunk') ? "#06B6D4" :
                    document.documentElement.classList.contains('steampunk') ? "#B45309" :
                    document.documentElement.classList.contains('minimalist') ? "#6B7280" :
                    document.documentElement.classList.contains('luxury') ? "#F59E0B" :
                    document.documentElement.classList.contains('rustic') ? "#92400E" :
                    document.documentElement.classList.contains('tropical') ? "#10B981" :
                    document.documentElement.classList.contains('arctic') ? "#7DD3FC" :
                    document.documentElement.classList.contains('sahara') ? "#F59E0B" :
                    document.documentElement.classList.contains('dark-red') ? "#DC2626" : "#3B82F6"
                }}
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

              {/* Associated With Badge */}
              {project.asociatedWith && (
                <motion.div
                  className="mb-3 sm:mb-4 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                >
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 dark:from-emerald-400/40 dark:to-teal-400/40 backdrop-blur-md rounded-full"
                    whileHover={{ 
                      scale: 1.05,

                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-emerald-100 dark:text-emerald-200">
                      Associated with  { isMobile ? project.asociatedWith[1] : project.asociatedWith[0]}
                    </span>
                  </motion.div>
                </motion.div>
              )}

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
                    className="px-2 sm:px-3 py-1 text-xs font-medium bg-white/20 dark:bg-black/40 text-white dark:text-foreground lofi:bg-purple-500/30 lofi:text-purple-100 nature:bg-green-500/30 nature:text-green-100 rain:bg-blue-500/30 rain:text-blue-100 ocean:bg-cyan-500/30 ocean:text-cyan-100 forest:bg-amber-500/30 forest:text-amber-100 cafe:bg-orange-500/30 cafe:text-orange-100 symphony1:bg-purple-500/30 symphony1:text-purple-100 symphony2:bg-pink-500/30 symphony2:text-pink-100 warm:bg-rose-500/30 warm:text-rose-100 cool:bg-cyan-500/30 cool:text-cyan-100 neutral:bg-gray-500/30 neutral:text-gray-100 vibrant:bg-yellow-500/30 vibrant:text-yellow-100 pastel:bg-pink-500/30 pastel:text-pink-100 monochrome:bg-gray-500/30 monochrome:text-gray-100 sunset:bg-orange-500/30 sunset:text-orange-100 midnight:bg-indigo-500/30 midnight:text-indigo-100 trees:bg-green-500/30 trees:text-green-100 desert:bg-amber-500/30 desert:text-amber-100 aurora:bg-emerald-500/30 aurora:text-emerald-100 neon:bg-green-500/30 neon:text-green-100 spring:bg-lime-500/30 spring:text-lime-100 summer:bg-yellow-500/30 summer:text-yellow-100 autumn:bg-orange-500/30 autumn:text-orange-100 winter:bg-cyan-500/30 winter:text-cyan-100 cosmic:bg-purple-500/30 cosmic:text-purple-100 galaxy:bg-indigo-500/30 galaxy:text-indigo-100 mountain:bg-gray-500/30 mountain:text-gray-100 city:bg-yellow-500/30 city:text-yellow-100 vintage:bg-amber-500/30 vintage:text-amber-100 retro:bg-pink-500/30 retro:text-pink-100 cyberpunk:bg-cyan-500/30 cyberpunk:text-cyan-100 steampunk:bg-amber-500/30 steampunk:text-amber-100 minimalist:bg-gray-500/30 minimalist:text-gray-100 luxury:bg-yellow-500/30 luxury:text-yellow-100 rustic:bg-amber-500/30 rustic:text-amber-100 tropical:bg-emerald-500/30 tropical:text-emerald-100 arctic:bg-cyan-500/30 arctic:text-cyan-100 sahara:bg-yellow-500/30 sahara:text-yellow-100 dark-red:bg-red-500/30 dark-red:text-red-100 rounded-full backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.2 + techIndex * 0.1,
                      duration: 0.3 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: windowWidth <= 768 ? "#DBEAFE" :
                        document.documentElement.classList.contains('lofi') ? "#E9D5FF" :
                        document.documentElement.classList.contains('nature') ? "#DCFCE7" :
                        document.documentElement.classList.contains('rain') ? "#DBEAFE" :
                        document.documentElement.classList.contains('ocean') ? "#CFFAFE" :
                        document.documentElement.classList.contains('forest') ? "#FEF3C7" :
                        document.documentElement.classList.contains('cafe') ? "#FED7AA" :
                        document.documentElement.classList.contains('symphony1') ? "#F3E8FF" :
                        document.documentElement.classList.contains('symphony2') ? "#FCE7F3" :
                        document.documentElement.classList.contains('warm') ? "#FEE2E2" :
                        document.documentElement.classList.contains('cool') ? "#CFFAFE" :
                        document.documentElement.classList.contains('neutral') ? "#F3F4F6" :
                        document.documentElement.classList.contains('vibrant') ? "#FEF3C7" :
                        document.documentElement.classList.contains('pastel') ? "#FCE7F3" :
                        document.documentElement.classList.contains('monochrome') ? "#F3F4F6" :
                        document.documentElement.classList.contains('sunset') ? "#FED7AA" :
                        document.documentElement.classList.contains('midnight') ? "#E0E7FF" :
                        document.documentElement.classList.contains('trees') ? "#DCFCE7" :
                        document.documentElement.classList.contains('desert') ? "#FEF3C7" :
                        document.documentElement.classList.contains('aurora') ? "#DCFCE7" :
                        document.documentElement.classList.contains('neon') ? "#DCFCE7" :
                        document.documentElement.classList.contains('spring') ? "#DCFCE7" :
                        document.documentElement.classList.contains('summer') ? "#FEF3C7" :
                        document.documentElement.classList.contains('autumn') ? "#FED7AA" :
                        document.documentElement.classList.contains('winter') ? "#CFFAFE" :
                        document.documentElement.classList.contains('cosmic') ? "#F3E8FF" :
                        document.documentElement.classList.contains('galaxy') ? "#E0E7FF" :
                        document.documentElement.classList.contains('mountain') ? "#F3F4F6" :
                        document.documentElement.classList.contains('city') ? "#FEF3C7" :
                        document.documentElement.classList.contains('vintage') ? "#FEF3C7" :
                        document.documentElement.classList.contains('retro') ? "#FCE7F3" :
                        document.documentElement.classList.contains('cyberpunk') ? "#CFFAFE" :
                        document.documentElement.classList.contains('steampunk') ? "#FEF3C7" :
                        document.documentElement.classList.contains('minimalist') ? "#F3F4F6" :
                        document.documentElement.classList.contains('luxury') ? "#FEF3C7" :
                        document.documentElement.classList.contains('rustic') ? "#FEF3C7" :
                        document.documentElement.classList.contains('tropical') ? "#DCFCE7" :
                        document.documentElement.classList.contains('arctic') ? "#CFFAFE" :
                        document.documentElement.classList.contains('sahara') ? "#FEF3C7" :
                        document.documentElement.classList.contains('dark-red') ? "#FEE2E2" : "#DBEAFE",
                      border: "none",
                      color: windowWidth <= 768 ? "#1F2937" :
                        document.documentElement.classList.contains('lofi') ? "#581C87" :
                        document.documentElement.classList.contains('nature') ? "#166534" :
                        document.documentElement.classList.contains('rain') ? "#1E40AF" :
                        document.documentElement.classList.contains('ocean') ? "#0E7490" :
                        document.documentElement.classList.contains('forest') ? "#92400E" :
                        document.documentElement.classList.contains('cafe') ? "#C2410C" :
                        document.documentElement.classList.contains('symphony1') ? "#6B21A8" :
                        document.documentElement.classList.contains('symphony2') ? "#BE185D" :
                        document.documentElement.classList.contains('warm') ? "#BE185D" :
                        document.documentElement.classList.contains('cool') ? "#0E7490" :
                        document.documentElement.classList.contains('neutral') ? "#374151" :
                        document.documentElement.classList.contains('vibrant') ? "#92400E" :
                        document.documentElement.classList.contains('pastel') ? "#BE185D" :
                        document.documentElement.classList.contains('monochrome') ? "#374151" :
                        document.documentElement.classList.contains('sunset') ? "#C2410C" :
                        document.documentElement.classList.contains('midnight') ? "#3730A3" :
                        document.documentElement.classList.contains('trees') ? "#15803D" :
                        document.documentElement.classList.contains('desert') ? "#92400E" :
                        document.documentElement.classList.contains('aurora') ? "#15803D" :
                        document.documentElement.classList.contains('neon') ? "#15803D" :
                        document.documentElement.classList.contains('spring') ? "#65A30D" :
                        document.documentElement.classList.contains('summer') ? "#A16207" :
                        document.documentElement.classList.contains('autumn') ? "#C2410C" :
                        document.documentElement.classList.contains('winter') ? "#0E7490" :
                        document.documentElement.classList.contains('cosmic') ? "#6B21A8" :
                        document.documentElement.classList.contains('galaxy') ? "#3730A3" :
                        document.documentElement.classList.contains('mountain') ? "#374151" :
                        document.documentElement.classList.contains('city') ? "#A16207" :
                        document.documentElement.classList.contains('vintage') ? "#92400E" :
                        document.documentElement.classList.contains('retro') ? "#BE185D" :
                        document.documentElement.classList.contains('cyberpunk') ? "#0E7490" :
                        document.documentElement.classList.contains('steampunk') ? "#92400E" :
                        document.documentElement.classList.contains('minimalist') ? "#374151" :
                        document.documentElement.classList.contains('luxury') ? "#A16207" :
                        document.documentElement.classList.contains('rustic') ? "#92400E" :
                        document.documentElement.classList.contains('tropical') ? "#15803D" :
                        document.documentElement.classList.contains('arctic') ? "#0E7490" :
                        document.documentElement.classList.contains('sahara') ? "#A16207" :
                        document.documentElement.classList.contains('dark-red') ? "#991B1B" : "#1F2937",
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
              className="absolute backdrop-blur-md bg-black/50 dark:bg-background/80 inset-0 bg-gradient-to-r from-primary/5 to-accent/5 lofi:from-purple-500/10 lofi:to-purple-600/10 nature:from-green-500/10 nature:to-green-600/10 rain:from-blue-500/10 rain:to-blue-600/10 ocean:from-cyan-500/10 ocean:to-cyan-600/10 forest:from-amber-500/10 forest:to-amber-600/10 cafe:from-orange-500/10 cafe:to-orange-600/10 symphony1:from-purple-500/10 symphony1:to-purple-600/10 symphony2:from-pink-500/10 symphony2:to-pink-600/10 warm:from-rose-500/10 warm:to-rose-600/10 cool:from-cyan-500/10 cool:to-cyan-600/10 neutral:from-gray-500/10 neutral:to-gray-600/10 vibrant:from-yellow-500/10 vibrant:to-yellow-600/10 pastel:from-pink-500/10 pastel:to-pink-600/10 monochrome:from-gray-500/10 monochrome:to-gray-600/10 sunset:from-orange-500/10 sunset:to-orange-600/10 midnight:from-indigo-500/10 midnight:to-indigo-600/10 trees:from-green-500/10 trees:to-green-600/10 desert:from-amber-500/10 desert:to-amber-600/10 aurora:from-emerald-500/10 aurora:to-emerald-600/10 neon:from-green-500/10 neon:to-green-600/10 spring:from-lime-500/10 spring:to-lime-600/10 summer:from-yellow-500/10 summer:to-yellow-600/10 autumn:from-orange-500/10 autumn:to-orange-600/10 winter:from-cyan-500/10 winter:to-cyan-600/10 cosmic:from-purple-500/10 cosmic:to-purple-600/10 galaxy:from-indigo-500/10 galaxy:to-indigo-600/10 mountain:from-gray-500/10 mountain:to-gray-600/10 city:from-yellow-500/10 city:to-yellow-600/10 vintage:from-amber-500/10 vintage:to-amber-600/10 retro:from-pink-500/10 retro:to-pink-600/10 cyberpunk:from-cyan-500/10 cyberpunk:to-cyan-600/10 steampunk:from-amber-500/10 steampunk:to-amber-600/10 minimalist:from-gray-500/10 minimalist:to-gray-600/10 luxury:from-yellow-500/10 luxury:to-yellow-600/10 rustic:from-amber-500/10 rustic:to-amber-600/10 tropical:from-emerald-500/10 tropical:to-emerald-600/10 arctic:from-cyan-500/10 arctic:to-cyan-600/10 sahara:from-yellow-500/10 sahara:to-yellow-600/10 dark-red:from-red-500/10 dark-red:to-red-600/10 rounded-xl"
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