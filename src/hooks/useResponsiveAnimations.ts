'use client'

import { useState, useEffect } from 'react'

interface ResponsiveAnimationConfig {
  isMobile: boolean
  prefersReducedMotion: boolean
  shouldUseReducedAnimations: boolean
  getAnimationDuration: (desktopDuration: number) => number
  getSpringConfig: () => object
  getStaggerDelay: (desktopDelay: number) => number
}

export const useResponsiveAnimations = (): ResponsiveAnimationConfig => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set client state immediately to prevent hydration issues
    setIsClient(true)
    
    if (typeof window !== 'undefined') {
      // Initialize states immediately
      const checkMobile = () => window.innerWidth < 768
      const initialMobile = checkMobile()
      setIsMobile(initialMobile)
      
      // Check for reduced motion preference
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(motionQuery.matches)
      
      // Listen for viewport changes (debounced)
      let timeoutId: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setIsMobile(checkMobile())
        }, 100)
      }
      
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      
      window.addEventListener('resize', handleResize, { passive: true })
      motionQuery.addEventListener('change', handleMotionChange)
      
      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('resize', handleResize)
        motionQuery.removeEventListener('change', handleMotionChange)
      }
    }
  }, [])

  const shouldUseReducedAnimations = !isClient || prefersReducedMotion || isMobile

  return {
    isMobile,
    prefersReducedMotion,
    shouldUseReducedAnimations,
    
    // Reduce animation duration on mobile by 50%
    getAnimationDuration: (desktopDuration: number) => 
      shouldUseReducedAnimations ? Math.max(0.1, desktopDuration * 0.5) : desktopDuration,
    
    // Use lighter spring animations on mobile
    getSpringConfig: () => shouldUseReducedAnimations 
      ? { type: 'tween', duration: 0.3, ease: 'easeOut' }
      : { type: 'spring', stiffness: 400, damping: 30 },
    
    // Reduce stagger delays on mobile
    getStaggerDelay: (desktopDelay: number) => 
      shouldUseReducedAnimations ? Math.max(0.05, desktopDelay * 0.5) : desktopDelay
  }
}