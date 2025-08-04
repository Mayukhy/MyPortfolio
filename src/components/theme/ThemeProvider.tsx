"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type Theme = "dark" | "light" | "system" | "lofi" | "nature" | "rain" | "ocean" | "forest" | "cafe"

interface Music {
  name?: string
  icon?: string
  src: string
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  currentMusic: Music | null
  setCurrentMusic: (music: Music | null) => void
  audioRef: React.RefObject<HTMLAudioElement> | null
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isPlaying: false,
  setIsPlaying: () => null,
  currentMusic: null,
  setCurrentMusic: () => null,
  audioRef: null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentMusic, setCurrentMusic] = useState<Music | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage?.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    if (currentMusic) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
    console.log(currentMusic);
    console.log(audioRef.current);
    
  }, [currentMusic])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark", "lofi", "nature", "rain", "ocean", "forest", "cafe")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (mounted) {
        localStorage?.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
    isPlaying,
    setIsPlaying,
    currentMusic,
    setCurrentMusic,
    audioRef,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
} 