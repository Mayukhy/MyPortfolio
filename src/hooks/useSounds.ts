import { useEffect, useCallback, useState } from 'react'
import soundManager from '@/utils/sounds'
import { useTheme } from '@/components/theme/ThemeProvider'

export const useSounds = () => {
  const { setCurrentMusic, setIsPlaying, isEmojisphereActive, currentMusic, isPlaying, soundsEnabled, setSoundsEnabled } = useTheme()
  
  useEffect(() => {
    if(!soundsEnabled) {
      if(!isEmojisphereActive && currentMusic?.name === "base") {
        setCurrentMusic(null)
        setIsPlaying(false)
      }
    }
    else {
      if(!isEmojisphereActive && !isPlaying) {
        setCurrentMusic({name: "base", src: "/audios/symphony1.mp3", icon: "🎉"})
        setIsPlaying(true)
      }
    }
  }, [soundsEnabled, currentMusic?.name, isEmojisphereActive, isPlaying, setCurrentMusic, setIsPlaying])


  useEffect(() => {
    // Initialize sounds on mount
    soundManager.init()
    soundManager.setSoundsEnabled(soundsEnabled)
    
  }, [])

  const playClick = useCallback(() => {
    soundManager.play('click', 0.3)
  }, [])

  const playHover = useCallback(() => {
    soundManager.play('hover', 0.2)
  }, [])

  const playSuccess = useCallback(() => {
    soundManager.play('success', 0.4)
  }, [])

  const playError = useCallback(() => {
    soundManager.play('error', 0.3)
  }, [])

  const playNotification = useCallback(() => {
    soundManager.play('notification', 0.25)
  }, [])

  const playPageTransition = useCallback(() => {
    soundManager.play('page-transition', 0.3)
  }, [])

  const playCardFlip = useCallback(() => {
    soundManager.play('card-flip', 0.25)
  }, [])

  const playButtonPress = useCallback(() => {
    soundManager.play('button-press', 0.35)
  }, [])

  const playThemeChange = useCallback(() => {
    soundManager.play('theme-change', 0.3)
  }, [])

  const playMusicSelect = useCallback(() => {
    soundManager.play('music-select', 0.4)
  }, [])

  const toggleSounds = useCallback(() => {
    soundManager.toggleSounds()
    setSoundsEnabled(soundManager.getSoundsEnabled())
  }, [])

  const soundsOn = useCallback(() => {
    soundManager.soundsOn()
    setSoundsEnabled(soundManager.getSoundsEnabled())
  }, [])

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    playNotification,
    playPageTransition,
    playCardFlip,
    playButtonPress,
    playThemeChange,
    playMusicSelect,
    toggleSounds,
    soundsEnabled,
    soundsOn
  }
} 