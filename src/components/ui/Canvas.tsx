"use client"

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface CanvasProps {
  details: {
    startIndex: number
    numImages: number
    duration: number
    size: number
    top: number
    left: number
    zIndex: number
    section: string
    emoji: string
  }
}

export default function Canvas({ details }: CanvasProps) {
  const { startIndex, numImages, duration, size, top, left, zIndex, section, emoji } = details
  const [index, setIndex] = useState({ value: startIndex })
  const canvasRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])

  useGSAP(() => {
    // Original animation for cycling through emojis
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) })
      },
    })

    // Initial fade in animation
    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })

    // Scroll-triggered animations
    if (containerRef.current) {
      // Staggered entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
        },
      })

      tl.fromTo(
        containerRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -15,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }
      )

      // Single optimized translation trigger
      const translateTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        animation: gsap.to(containerRef.current, {
          y: -150,
          duration: 1,
          ease: "none",
        }),
      })

      // Light scale effect
      const scaleTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.3,
        animation: gsap.to(containerRef.current, {
          scale: 1.05,
          duration: 1,
          ease: "none",
        }),
      })

      // Store triggers for cleanup
      scrollTriggersRef.current = [translateTrigger, scaleTrigger]
    }

    // Cleanup function
    return () => {
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger) trigger.kill()
      })
    }
  })

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      style={{
        position: "absolute",
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
        transformOrigin: "center center",
      }}
    >
      <div
        ref={canvasRef}
        className={`w-full h-full inline-flex items-center justify-center text-6xl md:text-8xl emoji-glow`}
      >
        {emoji}
      </div>
    </div>
  )
} 