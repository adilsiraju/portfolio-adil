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
    setIsClient(true)
    
    if (typeof window !== 'undefined') {
      // Check for mobile device
      const checkMobile = () => window.innerWidth < 768
      setIsMobile(checkMobile())
      
      // Check for reduced motion preference
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(motionQuery.matches)
      
      // Listen for viewport changes
      const handleResize = () => setIsMobile(checkMobile())
      const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
      
      window.addEventListener('resize', handleResize)
      motionQuery.addEventListener('change', handleMotionChange)
      
      return () => {
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