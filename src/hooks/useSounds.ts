import { useEffect, useCallback, useState } from 'react'
import soundManager from '@/utils/sounds'

export const useSounds = () => {
  const [soundsEnabled, setSoundsEnabled] = useState(false)

  useEffect(() => {
    // Initialize sounds on mount
    soundManager.init()
    
    // Load sound preference from localStorage
    const soundsEnabled = localStorage.getItem('sounds-enabled')
    if (soundsEnabled !== null) {
      const enabled = soundsEnabled === 'true'
      soundManager.setSoundsEnabled(enabled)
      setSoundsEnabled(enabled)
    }
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
  }
} 