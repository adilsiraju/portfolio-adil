'use client'

import { useEffect, useState } from 'react'

interface AccessibilityPreferences {
  prefersReducedMotion: boolean
  prefersHighContrast: boolean
  prefersDarkMode: boolean
  prefersReducedData: boolean
}

export const useAccessibilityPreferences = (): AccessibilityPreferences => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersDarkMode: false,
    prefersReducedData: false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updatePreferences = () => {
      setPreferences({
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        prefersHighContrast: window.matchMedia('(prefers-contrast: high)').matches,
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches
      })
    }

    // Initial check
    updatePreferences()

    // Create media query listeners
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)')
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const reducedDataQuery = window.matchMedia('(prefers-reduced-data: reduce)')

    // Add listeners
    reducedMotionQuery.addEventListener('change', updatePreferences)
    highContrastQuery.addEventListener('change', updatePreferences)
    darkModeQuery.addEventListener('change', updatePreferences)
    reducedDataQuery.addEventListener('change', updatePreferences)

    return () => {
      reducedMotionQuery.removeEventListener('change', updatePreferences)
      highContrastQuery.removeEventListener('change', updatePreferences)
      darkModeQuery.removeEventListener('change', updatePreferences)
      reducedDataQuery.removeEventListener('change', updatePreferences)
    }
  }, [])

  return preferences
}

export const useReducedMotion = () => {
  const { prefersReducedMotion } = useAccessibilityPreferences()
  return prefersReducedMotion
}

export const useHighContrast = () => {
  const { prefersHighContrast } = useAccessibilityPreferences()
  return prefersHighContrast
}

export const useReducedData = () => {
  const { prefersReducedData } = useAccessibilityPreferences()
  return prefersReducedData
}