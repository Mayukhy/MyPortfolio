"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringHeading, setIsHoveringHeading] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [isHoveringModal, setIsHoveringModal] = useState(false)
  const [isHoveringInput, setIsHoveringInput] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  const observerRef = useRef<MutationObserver | null>(null)
  const eventListenersRef = useRef<Map<Element, { enter: () => void; leave: () => void }>>(new Map())

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback((element: Element) => {
    setIsHovering(true)
    
    // Check for specific element types
    if (element.classList.contains("hero__heading")) {
      setIsHoveringHeading(true)
    } else if (element.tagName === "BUTTON" || element.getAttribute("role") === "button") {
      setIsHoveringButton(true)
    } else if (element.tagName === "A" || element.closest("a")) {
      setIsHoveringLink(true)
    } else if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.getAttribute("contenteditable") === "true") {
      setIsHoveringInput(true)
    } else if (element.closest("[role='dialog']") || element.closest(".modal") || element.closest("[data-modal]")) {
      setIsHoveringModal(true)
    }
  }, [])

  const handleMouseLeave = useCallback((element: Element) => {
    setIsHovering(false)
    
    // Reset specific states
    if (element.classList.contains("hero__heading")) {
      setIsHoveringHeading(false)
    } else if (element.tagName === "BUTTON" || element.getAttribute("role") === "button") {
      setIsHoveringButton(false)
    } else if (element.tagName === "A" || element.closest("a")) {
      setIsHoveringLink(false)
    } else if (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.getAttribute("contenteditable") === "true") {
      setIsHoveringInput(false)
    } else if (element.closest("[role='dialog']") || element.closest(".modal") || element.closest("[data-modal]")) {
      setIsHoveringModal(false)
    }
  }, [])

  const addEventListeners = useCallback((elements: NodeListOf<Element> | Element[]) => {
    elements.forEach((el) => {
      // Skip if already has listeners
      if (eventListenersRef.current.has(el)) return
      
      const enterHandler = () => handleMouseEnter(el)
      const leaveHandler = () => handleMouseLeave(el)
      
      el.addEventListener("mouseenter", enterHandler)
      el.addEventListener("mouseleave", leaveHandler)
      
      // Store references for cleanup
      eventListenersRef.current.set(el, { enter: enterHandler, leave: leaveHandler })
    })
  }, [handleMouseEnter, handleMouseLeave])

  const removeEventListeners = useCallback((elements: NodeListOf<Element> | Element[]) => {
    elements.forEach((el) => {
      const listeners = eventListenersRef.current.get(el)
      if (listeners) {
        el.removeEventListener("mouseenter", listeners.enter)
        el.removeEventListener("mouseleave", listeners.leave)
        eventListenersRef.current.delete(el)
      }
    })
  }, [])

  useEffect(() => {
    // Check if device is desktop (not touch device and screen width > 768px)
    const checkIsDesktop = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLargeScreen = window.innerWidth > 768
      setIsDesktop(!isTouchDevice && isLargeScreen)
    }

    // Initial check
    checkIsDesktop()

    // Listen for window resize
    window.addEventListener('resize', checkIsDesktop)

    // Only add mouse listeners and setup if on desktop
    if (isDesktop) {
      // Add global mouse move listener
      window.addEventListener("mousemove", updateMousePosition)
      
      // Initial setup
      const interactiveSelectors = [
        "a", 
        "button", 
        "[role='button']", 
        ".hero__heading",
        "[data-cursor='pointer']",
        ".cursor-pointer",
        ".hover\\:cursor-pointer",
        "[class*='hover:']",
        "input",
        "textarea",
        "[contenteditable='true']",
        "[role='dialog']",
        ".modal",
        "[data-modal]",
        "[data-interactive]"
      ]
      
      const interactiveElements = document.querySelectorAll(interactiveSelectors.join(", "))
      addEventListeners(interactiveElements)

      // Set up MutationObserver to handle dynamically added elements
      observerRef.current = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const newInteractiveElements = element.querySelectorAll(interactiveSelectors.join(", "))
              
              // Also check if the element itself is interactive
              const isElementInteractive = Array.from(interactiveSelectors).some(selector => 
                element.matches(selector)
              )
              
              if (newInteractiveElements.length > 0 || isElementInteractive) {
                if (isElementInteractive) {
                  addEventListeners([element])
                }
                addEventListeners(newInteractiveElements)
              }
            }
          })
          
          // Handle removed nodes
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const removedInteractiveElements = element.querySelectorAll(interactiveSelectors.join(", "))
              
              // Check if the element itself was interactive
              const wasElementInteractive = Array.from(interactiveSelectors).some(selector => 
                element.matches(selector)
              )
              
              if (removedInteractiveElements.length > 0 || wasElementInteractive) {
                if (wasElementInteractive) {
                  removeEventListeners([element])
                }
                removeEventListeners(removedInteractiveElements)
              }
            }
          })
        })
      })

      // Start observing
      observerRef.current.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'data-cursor', 'data-interactive']
      })
    }

    return () => {
      window.removeEventListener('resize', checkIsDesktop)
      
      if (isDesktop) {
        window.removeEventListener("mousemove", updateMousePosition)
        
        // Clean up all event listeners
        const currentEventListeners = eventListenersRef.current
        currentEventListeners.forEach((listeners, element) => {
          element.removeEventListener("mouseenter", listeners.enter)
          element.removeEventListener("mouseleave", listeners.leave)
        })
        currentEventListeners.clear()
        
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }
  }, [updateMousePosition, addEventListeners, removeEventListeners, isDesktop])

  // Determine cursor scale based on hover state
  const getCursorScale = () => {
    if (isHoveringHeading) return 4
    if (isHoveringButton) return 1.5
    if (isHoveringLink) return 1.3
    if (isHoveringInput) return 1.4
    if (isHoveringModal) return 1.6
    if (isHovering) return 1.2
    return 1
  }

  // Determine if trailing cursor should be hidden
  const shouldHideTrailingCursor = isHoveringHeading || isHoveringButton || isHoveringLink || isHoveringInput || isHoveringModal

  // Get cursor icon based on hover state
  const getCursorIcon = () => {
    if (isHoveringHeading) return "🔥"
    return null
  }

  // Don't render custom cursor on mobile devices
  if (!isDesktop) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: getCursorScale(),
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {getCursorIcon() && (
          <span className="text-xs top-0 absolute">{getCursorIcon()}</span>
        )}
      </motion.div>
      
      {/* Trailing cursor */}
      {!shouldHideTrailingCursor && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-40"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 20,
            mass: 0.8,
          }}
        />
      )}
      
      {/* Outer ring */}
      {!shouldHideTrailingCursor && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 border border-primary/10 rounded-full pointer-events-none z-30"
          animate={{
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1,
          }}
        />
      )}
    </>
  )
} 