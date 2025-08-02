"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

type Theme = "dark" | "light" | "system" | "lofi" | "nature" | "rain" | "ocean" | "forest" | "cafe" | "warm" | "cool" | "neutral" | "vibrant" | "pastel" | "monochrome" | "sunset" | "midnight" | "trees" | "desert" | "aurora" | "neon" | "spring" | "summer" | "autumn" | "winter" | "cosmic" | "galaxy" | "mountain" | "city" | "vintage" | "retro" | "cyberpunk" | "steampunk" | "minimalist" | "luxury" | "rustic" | "tropical" | "arctic" | "sahara"

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
  createThemeStep: number
  setCreateThemeStep: (step: number) => void
  createThemeData: ThemeData
  setCreateThemeData: (data: ThemeData) => void
  themeList: ThemeData[]
  setThemeList: (list: ThemeData[]) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  isPlaying: false,
  setIsPlaying: () => null,
  currentMusic: null,
  setCurrentMusic: () => null,
  audioRef: null,
  createThemeStep: 1,
  setCreateThemeStep: () => null,
  createThemeData: {
    name: '',
    description: '',
    audioFile: null,
    colorScheme: '',
    tags: []
  },
  setCreateThemeData: () => null,
  themeList: [],
  setThemeList: () => null
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [createThemeStep, setCreateThemeStep] = useState(1)
  const [createThemeData, setCreateThemeData] = useState<ThemeData>({
    name: '',
    description: '',
    audioFile: null as File | null,
    colorScheme: '',
    tags: [] as string[]
  })
  const [mounted, setMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentMusic, setCurrentMusic] = useState<Music | null>(null)
  const [themeList, setThemeList] = useState<ThemeData[]>(() => {
    // Check for stored themes first
    if (typeof window !== 'undefined') {
      const storedThemeList = JSON.parse(localStorage?.getItem("theme-list") || "[]") as ThemeData[]
      if (storedThemeList.length > 0) {
        return storedThemeList
      }
    }
    // Return default themes if no stored themes exist
    return [
      { name: "Lofi Beats", src: "/audios/lofi.mp3", colorScheme: "🎵 lofi", description: "Relaxing lofi beats for focus", audioFile: null, tags: ["lofi", "relaxing", "focus"] },
      { name: "Nature Sounds", src: "/audios/nature.mp3", colorScheme: "🌿 nature", description: "Peaceful nature ambience", audioFile: null, tags: ["nature", "peaceful", "ambience"] },
      { name: "Rain Ambience", src: "/audios/rain.mp3", colorScheme: "🌧️ rain", description: "Soothing rain sounds", audioFile: null, tags: ["rain", "soothing", "ambience"] },
      { name: "Ocean Waves", src: "/audios/ocean.mp3", colorScheme: "🌊 ocean", description: "Calming ocean waves", audioFile: null, tags: ["ocean", "calming", "waves"] },
      { name: "Forest Birds", src: "/audios/forest.mp3", colorScheme: "🐦 forest", description: "Chirping forest birds", audioFile: null, tags: ["forest", "birds", "nature"] },
      { name: "Cafe Ambience", src: "/audios/cafe.mp3", colorScheme: "☕ cafe", description: "Cozy cafe atmosphere", audioFile: null, tags: ["cafe", "cozy", "ambience"] }
    ]
  })
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage?.getItem(storageKey) as Theme
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [storageKey])

  useEffect(() => {
    if (themeList.length > 0) {
      localStorage.setItem("theme-list", JSON.stringify(themeList))
    }
  }, [themeList])

  useEffect(() => {
    if (currentMusic) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [currentMusic])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove all theme classes
    root.classList.remove("light", "dark", "lofi", "nature", "rain", "ocean", "forest", "cafe", "warm", "cool", "neutral", "vibrant", "pastel", "monochrome", "sunset", "midnight", "trees", "desert", "aurora", "neon", "spring", "summer", "autumn", "winter", "cosmic", "galaxy", "mountain", "city", "vintage", "retro", "cyberpunk", "steampunk", "minimalist", "luxury", "rustic", "tropical", "arctic", "sahara")

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
    createThemeStep,
    setCreateThemeStep,
    createThemeData,
    setCreateThemeData,
    themeList,
    setThemeList
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