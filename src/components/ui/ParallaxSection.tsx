"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
  direction?: "up" | "down"
  opacity?: boolean
  scale?: boolean
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
  offset = 0,
  direction = "up",
  opacity = true,
  scale = false
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset, -offset * speed] : [offset, offset * speed]
  )

  const opacityTransform = opacity
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])
    : undefined

  const scaleTransform = scale
    ? useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
    : undefined

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: yTransform,
        opacity: opacityTransform,
        scale: scaleTransform
      }}
    >
      {children}
    </motion.div>
  )
} 