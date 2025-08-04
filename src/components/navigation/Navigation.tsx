"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme/ThemeProvider"
import { Sun, Moon, Menu, X, Play, AudioWaveform, AudioLines, HeadphoneOff, Volume2, VolumeX } from "lucide-react"
import { createPortal } from "react-dom"
import { useSounds } from "@/hooks/useSounds"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

// Animation variants for navigation items
const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false)
  const { theme, setTheme, isPlaying, setIsPlaying, setCurrentMusic, currentMusic } = useTheme()
  const { playClick, playHover, playButtonPress, playThemeChange, playMusicSelect, toggleSounds, soundsEnabled } = useSounds()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cleanup body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const toggleTheme = () => {
    playThemeChange()
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleThemeMusic = () => {
    playButtonPress()
    setIsMusicModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeMusicModal = () => {
    playClick()
    setIsMusicModalOpen(false)
    const drawer = document.querySelector("#mobile-deawer") as HTMLElement
    if (drawer) {
      drawer.style.animation = "down 0.4s ease-in-out"
    }
    // Add a small delay to ensure exit animation completes
    setTimeout(() => {
      document.body.style.overflow = "auto"
    }, 400)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold heading-gradient"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors relative group"
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={playHover}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
          {/* Theme music toggle */}
          <motion.button
              onClick={toggleThemeMusic}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors focus-ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme music"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="playing-waveform"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AudioLines className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pause-waveform"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HeadphoneOff className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.button>
          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Sound Toggle */}
            <motion.button
              onClick={toggleSounds}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors focus-ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle sounds"
            >
              <AnimatePresence mode="wait">
                {soundsEnabled ? (
                  <motion.div
                    key="volume-on"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="volume-off"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VolumeX className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors focus-ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors focus-ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Music Selection Modal/Drawer */}
      <AnimatePresence>
        {isMusicModalOpen && (
          <>
            {/* Desktop Modal */}
            <div className="fixed inset-0 z-[99998] hidden md:block">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bg-black/50 w-screen h-screen"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center p-4"
                onClick={closeMusicModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-foreground">Select Music</h3>
                    <motion.button
                      onClick={closeMusicModal}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Lofi Beats", icon: "🎵", src: "/audios/lofi.mp3", theme: "lofi" },
                      { name: "Nature Sounds", icon: "🌿", src: "/audios/nature.mp3", theme: "nature" },
                      { name: "Rain Ambience", icon: "🌧️", src: "/audios/rain.mp3", theme: "rain" },
                      { name: "Ocean Waves", icon: "🌊", src: "/audios/ocean.mp3", theme: "ocean" },
                      { name: "Forest Birds", icon: "🐦", src: "/audios/forest.mp3", theme: "forest" },
                      { name: "Cafe Ambience", icon: "☕", src: "/audios/cafe.mp3", theme: "cafe" }
                    ].map((music, index) => {
                      const isActive = currentMusic?.src === music.src
                      return (
                        <motion.button
                          key={music.name}
                          onClick={() => {
                            if (!isActive) {
                              playMusicSelect()
                              setIsPlaying(true)
                              setCurrentMusic(music)
                              setTheme(music.theme as "dark" | "light" | "lofi" | "nature" | "rain" | "ocean" | "forest" | "cafe")
                            }
                            else {
                              playClick()
                              setIsPlaying(false)
                              setCurrentMusic(null)
                            }
                            closeMusicModal()
                          }}
                          className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center space-x-3
                            ${isActive ? 'border-primary bg-primary/10 text-primary font-semibold shadow-lg' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-2xl">{music.icon}</span>
                          <span className="text-foreground font-medium flex-1">{music.name}</span>
                          {isActive && (
                            <span className="ml-2 text-lg text-primary">✓</span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Mobile Drawer - Portal */}
            {typeof window !== 'undefined' && createPortal(
              <AnimatePresence mode="wait">
                {isMusicModalOpen && (
                  <div className="fixed inset-0 z-[99999] md:hidden">
                    <motion.div
                      key="backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black/50"
                      onClick={closeMusicModal}
                    />
                    <motion.div
                      id="mobile-deawer"
                      key="drawer"
                      initial={{ y: "100vh" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100vh" }}
                      transition={{ 
                        type: "spring", 
                        damping: 25, 
                        stiffness: 200,
                        exit: {
                          type: "tween",
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      className="absolute bottom-0 left-0 right-0 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="bg-background border-t border-border rounded-t-3xl shadow-2xl">
                        {/* Drawer Handle */}
                        <div className="flex justify-center pt-3 pb-2">
                          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
                        </div>
                        
                        {/* Drawer Content */}
                        <div className="p-6 pb-8">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-foreground">Select Music</h3>
                            <motion.button
                              onClick={closeMusicModal}
                              className="p-2 rounded-full hover:bg-muted transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-5 h-5" />
                            </motion.button>
                          </div>
                          
                                                                                        <div className="space-y-3">
                    {[
                      { name: "Lofi Beats", icon: "🎵", src: "/audios/lofi.mp3", theme: "lofi" },
                      { name: "Nature Sounds", icon: "🌿", src: "/audios/nature.mp3", theme: "nature" },
                      { name: "Rain Ambience", icon: "🌧️", src: "/audios/rain.mp3", theme: "rain" },
                      { name: "Ocean Waves", icon: "🌊", src: "/audios/ocean.mp3", theme: "ocean" },
                      { name: "Forest Birds", icon: "🐦", src: "/audios/forest.mp3", theme: "forest" },
                      { name: "Cafe Ambience", icon: "☕", src: "/audios/cafe.mp3", theme: "cafe" }
                    ].map((music, index) => {
                              const isActive = currentMusic?.src === music.src
                              return (
                                <motion.button
                                  key={music.name}
                                  onClick={() => {
                                    if (!isActive) {
                                      setIsPlaying(true)
                                      setCurrentMusic(music)
                                      setTheme(music.theme as "dark" | "light" | "lofi" | "nature" | "rain" | "ocean" | "forest" | "cafe")
                                    }
                                    else {
                                      setIsPlaying(false)
                                      setCurrentMusic(null)
                                    }
                                    closeMusicModal()
                                  }}
                                  className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center space-x-3
                                    ${isActive ? 'border-primary bg-primary/10 text-primary font-semibold shadow-lg' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="text-2xl">{music.icon}</span>
                                  <span className="text-foreground font-medium flex-1">{music.name}</span>
                                  {isActive && (
                                    <span className="ml-2 text-lg text-primary">✓</span>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 