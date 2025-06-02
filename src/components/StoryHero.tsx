'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Mouse, Sparkles, Code2, Brain, Zap } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface StoryStep {
  id: string
  title: string
  subtitle: string
  description: string
  backgroundClass: string
  icon: React.ReactNode
}

const storySteps: StoryStep[] = [
  {
    id: 'intro',
    title: "Welcome, Explorer",
    subtitle: "You've discovered something special...",
    description: "A digital realm where code meets creativity, and AI dreams become reality.",
    backgroundClass: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
    icon: <Sparkles className="w-8 h-8 text-yellow-400" />
  },  {
    id: 'identity',
    title: "Meet the Engineer",
    subtitle: "Mohammed Adil Siraju",
    description: "Aspiring AI & ML Engineer with expertise in Python, DevOps, and sustainable innovation.",
    backgroundClass: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900",
    icon: <Brain className="w-8 h-8 text-emerald-400" />
  },  {
    id: 'mission',
    title: "The Innovation Journey",
    subtitle: "From Internships to Impact",
    description: "Transforming ideas into reality through AI/ML, DevOps, and sustainable technology solutions.",
    backgroundClass: "bg-gradient-to-br from-orange-900 via-red-900 to-pink-900",
    icon: <Code2 className="w-8 h-8 text-orange-400" />
  },  {
    id: 'invitation',
    title: "Ready to Collaborate?",
    subtitle: "Open to Full-Time Opportunities",
    description: "Explore my journey from internships at Accenture, Wells Fargo, Deloitte to building EcoVest.",
    backgroundClass: "bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900",
    icon: <Zap className="w-8 h-8 text-violet-400" />
  }
]

const StoryHero = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [backgroundParticles, setBackgroundParticles] = useState<Array<{x: number, y: number, duration: number}>>([])
  const [floatingParticles, setFloatingParticles] = useState<Array<{x: number, y: number, delay: number, repeatDelay: number}>>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { trackEvent, trackSectionView } = useAnalytics()

  // Track hero view on component mount
  useEffect(() => {
    trackSectionView('hero')
  }, [trackSectionView])

  // Safe window size hook
  useEffect(() => {
    setIsClient(true)
    const updateWindowSize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      
      // Regenerate particles when window size changes
      const bgParticles = Array.from({ length: 50 }, () => ({
        x: Math.random() * newSize.width,
        y: Math.random() * newSize.height,
        duration: Math.random() * 10 + 10
      }))
      setBackgroundParticles(bgParticles)

      const floatParticles = Array.from({ length: 30 }, () => ({
        x: Math.random() * newSize.width,
        y: Math.random() * newSize.height,
        delay: Math.random() * 2,
        repeatDelay: Math.random() * 3
      }))
      setFloatingParticles(floatParticles)
    }

    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)  }, [])

  useEffect(() => {
    // Auto-advance story after 4 seconds, but keep same background color throughout all steps
    timeoutRef.current = setTimeout(() => {
      if (currentStep < storySteps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        setShowContinue(true)
      }
    }, 4000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentStep])
  const handleContinue = () => {
    if (currentStep < storySteps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setShowContinue(false)
      // Track story progression
      trackEvent('story_step_progress', { 
        step: currentStep + 1, 
        stepName: storySteps[currentStep + 1]?.id 
      })
    } else {
      setIsCompleted(true)
      trackEvent('story_completed')
    }
  }

  const handleEnterPortfolio = () => {
    trackEvent('portfolio_entry_click')
    const aboutSection = document.querySelector('#magical-about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  if (isCompleted) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">        <div className="absolute inset-0">          {/* Animated background particles */}
          {isClient && backgroundParticles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20"
              initial={{ 
                x: particle.x, 
                y: particle.y 
              }}
              animate={{
                x: [particle.x, particle.x + 100, particle.x - 100, particle.x],
                y: [particle.y, particle.y + 100, particle.y - 100, particle.y],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-6"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Welcome
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            To the digital universe of Mohammed Adil Siraju
          </motion.p>

          <motion.button
            onClick={handleEnterPortfolio}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Begin the Journey
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            
            {/* Hover effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400"
            >
              <Mouse className="w-6 h-6 mb-2" />
              <span className="text-sm">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    )
  }
  // Get current story step
  const currentStoryStep = storySteps[currentStep]

  // Initial welcome screen with all 4 story steps (same background color throughout)
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}      <div className="absolute inset-0">        {isClient && floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: particle.repeatDelay
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center z-10 px-6 max-w-4xl"
        >
          {/* Story step icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 flex justify-center"
          >
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
              {currentStoryStep.icon}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {currentStoryStep.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            className="text-2xl md:text-3xl text-white/80 mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {currentStoryStep.subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {currentStoryStep.description}
          </motion.p>

          {/* Continue button */}
          <AnimatePresence>
            {showContinue && (
              <motion.button
                onClick={handleContinue}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <span className="flex items-center gap-2">
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {storySteps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentStep ? 'bg-white' : 'bg-white/30'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </section>
  )
}

export default StoryHero
