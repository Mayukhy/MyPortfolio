"use client"

import { useTheme } from '@/components/theme/ThemeProvider'
import { useState, useEffect } from 'react'

export function useScrollSection() {
  const [currentSection, setCurrentSection] = useState('hero')
  const { isEmojisphereActive, setIsEmojisphereActive } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Get all sections
      const sections = ['hero', 'about', 'projects', 'testimonials', 'contact']
      let activeSection = 'hero'

      // Find which section is currently in view
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            activeSection = section
          }
        }
      })

      setCurrentSection(activeSection)
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Activate Emojisphere when user clicks on hero banner
  const activateEmojisphere = () => {
    setIsEmojisphereActive(true)
  }

  return {
    currentSection,
    isEmojisphereActive,
    activateEmojisphere
  }
} 