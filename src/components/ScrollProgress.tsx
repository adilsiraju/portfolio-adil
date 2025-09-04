'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const updateScrollProgress = () => {
      if (typeof window === 'undefined') return
      
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', updateScrollProgress)
      updateScrollProgress() // Initial calculation
      
      return () => window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    isClient ? (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    ) : null
  )
}

export default ScrollProgress
