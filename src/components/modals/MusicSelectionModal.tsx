"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Edit } from "lucide-react"
import { createPortal } from "react-dom"
import { useTheme } from "@/components/theme/ThemeProvider"
import { useSounds } from "@/hooks/useSounds"

interface MusicSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTheme: () => void
  onEditTheme: (e: React.MouseEvent<HTMLSpanElement>, music: ThemeData) => void
}

export default function MusicSelectionModal({ isOpen, onClose, onCreateTheme, onEditTheme }: MusicSelectionModalProps) {
  const { themeList, currentMusic, setCurrentMusic, setIsPlaying, setTheme } = useTheme()
  const { playMusicSelect, playClick } = useSounds()

  // Cleanup body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleMusicSelect = (music: any) => {
    const isActive = currentMusic?.name === music.name
    
    if (!isActive ) {
      playMusicSelect()
      music.src ? setIsPlaying(true) : setIsPlaying(false)
      !music.src ? setCurrentMusic({...music, src: ""}) : setCurrentMusic(music)
      setTheme(music.colorScheme.split(" ")[1] as "dark" | "light" | "lofi" | "nature" | "rain" | "ocean" | "forest" | "cafe")
    } else {
      playClick()
      setIsPlaying(false)
      setCurrentMusic(null)
    }
    onClose()
  }

  const handleCreateTheme = () => {
    onCreateTheme()
  }

  if (!isOpen) return null

  return (
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
          onClick={onClose}
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
              <h3 className="text-xl font-semibold text-foreground">Select Theme Experience</h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {themeList.map((music, index) => {
                const isActive = currentMusic?.name === music.name
                return (
                  <motion.button
                    key={music.name}
                    onClick={() => handleMusicSelect(music)}
                    className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center space-x-3
                      ${isActive ? 'border-primary bg-primary/10 text-primary font-semibold shadow-lg' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{music.colorScheme.split(" ")[0]}</span>
                    <span className="text-foreground font-medium flex-1">{music.name}</span>
                    {isActive && (
                      <span className="ml-2 text-lg text-primary">✓</span>
                    )}
                    { music.id && <span
                    onClick={(e) => onEditTheme(e, music)}
                    className="ml-2 text-lg text-primary"><Edit/></span>}
                  </motion.button>
                )
              })}
              <motion.button 
                onClick={handleCreateTheme}
                className="w-full p-3 rounded-lg bg-primary text-white flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="w-5 h-5 light:text-white dark:text-black" />
                </motion.div>
                <span className="font-medium light:text-white dark:text-black">Create New Theme Experience</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Mobile Drawer - Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence mode="wait">
          {isOpen && (
            <div className="fixed inset-0 z-[99999] md:hidden">
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
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
                      <h3 className="text-xl font-semibold text-foreground">Select Theme Experience</h3>
                      <motion.button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                    
                    <div className="space-y-3">
                      {themeList.map((music, index) => {
                        const isActive = currentMusic?.name === music.name
                        return (
                          <motion.button
                            key={music.name}
                            onClick={() => handleMusicSelect(music)}
                            className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center space-x-3
                              ${isActive ? 'border-primary bg-primary/10 text-primary font-semibold shadow-lg' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-2xl">{music.colorScheme.split(" ")[0]}</span>
                            <span className="text-foreground font-medium flex-1">{music.name}</span>
                            {isActive && (
                              <span className="ml-2 text-lg text-primary">✓</span>
                            )}
                            { music.id && <span
                            onClick={(e) => onEditTheme(e, music)}
                            className="ml-2 text-lg text-primary"><Edit/></span>}
                          </motion.button>
                        )
                      })}
                      <motion.button 
                        onClick={handleCreateTheme}
                        className="w-full p-3 rounded-lg bg-primary text-white flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors mt-3"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <motion.div
                          whileHover={{ rotate: 90 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Plus className="w-5 h-5 dark:text-black" />
                        </motion.div>
                        <span className="font-medium dark:text-black">Create New Theme Experience</span>
                      </motion.button>
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
  )
} 