'use client'

class SoundManager {
  private static instance: SoundManager
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()

  private constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  // Create hover sound programmatically
  private createHoverSound(): AudioBuffer {
    if (!this.audioContext) return null as any
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.1, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.sin(2 * Math.PI * 800 * i / this.audioContext.sampleRate) * 0.1 * Math.exp(-i / (this.audioContext.sampleRate * 0.05))
    }
    
    return buffer
  }

  // Create click sound programmatically
  private createClickSound(): AudioBuffer {
    if (!this.audioContext) return null as any
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.15, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < data.length; i++) {
      const freq1 = 1000 * Math.exp(-i / (this.audioContext.sampleRate * 0.1))
      const freq2 = 500 * Math.exp(-i / (this.audioContext.sampleRate * 0.05))
      data[i] = (Math.sin(2 * Math.PI * freq1 * i / this.audioContext.sampleRate) + 
                 Math.sin(2 * Math.PI * freq2 * i / this.audioContext.sampleRate)) * 0.05 * Math.exp(-i / (this.audioContext.sampleRate * 0.1))
    }
    
    return buffer
  }

  // Create success sound programmatically
  private createSuccessSound(): AudioBuffer {
    if (!this.audioContext) return null as any
    
    const buffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)
    
    const frequencies = [523, 659, 784] // C, E, G notes
    
    for (let i = 0; i < data.length; i++) {
      let sample = 0
      const segment = Math.floor(i / (data.length / 3))
      const freq = frequencies[segment] || frequencies[2]
      
      sample = Math.sin(2 * Math.PI * freq * i / this.audioContext.sampleRate) * 0.1 * 
               Math.exp(-i / (this.audioContext.sampleRate * 0.2))
      
      data[i] = sample
    }
    
    return buffer
  }

  async initialize() {
    if (!this.audioContext) return

    // Create sounds programmatically
    this.sounds.set('hover', this.createHoverSound())
    this.sounds.set('click', this.createClickSound())
    this.sounds.set('success', this.createSuccessSound())
  }

  playSound(soundName: string, volume: number = 0.3) {
    if (!this.audioContext || !this.sounds.has(soundName)) return

    try {
      const buffer = this.sounds.get(soundName)!
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()
      
      source.buffer = buffer
      gainNode.gain.value = volume
      
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      source.start()
    } catch (error) {
      // Silently fail for better UX
    }
  }

  // Resume audio context on user interaction
  async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }
}

export default SoundManager
