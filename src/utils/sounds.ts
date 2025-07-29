// Sound utility for interaction effects
class SoundManager {
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private isEnabled = true

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  // Enable/disable sounds
  toggleSounds() {
    this.isEnabled = !this.isEnabled
    localStorage.setItem('sounds-enabled', this.isEnabled.toString())
  }

  setSoundsEnabled(enabled: boolean) {
    this.isEnabled = enabled
    localStorage.setItem('sounds-enabled', enabled.toString())
  }

  getSoundsEnabled(): boolean {
    return this.isEnabled
  }

  // Initialize sounds
  async init() {
    if (!this.audioContext) return

    try {
      // Load sound effects
      await this.loadSound('click', this.generateClickSound())
      await this.loadSound('hover', this.generateHoverSound())
      await this.loadSound('success', this.generateSuccessSound())
      await this.loadSound('error', this.generateErrorSound())
      await this.loadSound('notification', this.generateNotificationSound())
      await this.loadSound('page-transition', this.generatePageTransitionSound())
      await this.loadSound('card-flip', this.generateCardFlipSound())
      await this.loadSound('button-press', this.generateButtonPressSound())
      await this.loadSound('theme-change', this.generateThemeChangeSound())
      await this.loadSound('music-select', this.generateMusicSelectSound())
    } catch (error) {
      console.warn('Failed to initialize sounds:', error)
    }
  }

  // Load sound buffer
  private async loadSound(name: string, audioBuffer: AudioBuffer) {
    this.sounds.set(name, audioBuffer)
  }

  // Play sound effect
  play(soundName: string, volume: number = 0.3) {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(soundName)) return

    const source = this.audioContext.createBufferSource()
    const gainNode = this.audioContext.createGain()
    
    source.buffer = this.sounds.get(soundName)!
    gainNode.gain.value = volume
    
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    source.start(0)
  }

  // Generate different sound effects
  private generateClickSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.1
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 800 + 400 * Math.exp(-t * 20)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 10) * 0.3
    }
    
    return buffer
  }

  private generateHoverSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.05
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 600 + 200 * Math.exp(-t * 15)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 8) * 0.2
    }
    
    return buffer
  }

  private generateSuccessSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.3
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 400 + 600 * Math.exp(-t * 5)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 3) * 0.4
    }
    
    return buffer
  }

  private generateErrorSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.2
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 200 + 100 * Math.exp(-t * 8)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 5) * 0.3
    }
    
    return buffer
  }

  private generateNotificationSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.15
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 800 + 400 * Math.sin(t * 20)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 6) * 0.25
    }
    
    return buffer
  }

  private generatePageTransitionSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.4
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 300 + 700 * Math.exp(-t * 4)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.3
    }
    
    return buffer
  }

  private generateCardFlipSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.2
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 500 + 300 * Math.sin(t * 15)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 4) * 0.25
    }
    
    return buffer
  }

  private generateButtonPressSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.08
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 1000 + 500 * Math.exp(-t * 25)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 12) * 0.35
    }
    
    return buffer
  }

  private generateThemeChangeSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.25
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 600 + 400 * Math.sin(t * 8)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 3) * 0.3
    }
    
    return buffer
  }

  private generateMusicSelectSound(): AudioBuffer {
    if (!this.audioContext) throw new Error('AudioContext not available')
    
    const sampleRate = this.audioContext.sampleRate
    const duration = 0.3
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      const frequency = 400 + 800 * Math.exp(-t * 3)
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.4
    }
    
    return buffer
  }
}

// Create singleton instance
const soundManager = new SoundManager()

export default soundManager 