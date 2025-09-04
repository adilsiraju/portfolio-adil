'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Mail, MessageCircle, Github, Phone, Linkedin, ArrowUpRight, Sparkles, Heart, Coffee } from 'lucide-react'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  description: string
  gradient: string
  hoverColor: string
  internal?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
}

export default function ContactEpilogue() {
  const { trackEvent } = useAnalytics()
  const [particles, setParticles] = useState<Particle[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Client-side accessibility checks
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [prefersReducedData, setPrefersReducedData] = useState(false)

  useEffect(() => {
    // Set client-side flag
    setIsClient(true)
    
    // Check accessibility preferences on client
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setPrefersReducedData(window.matchMedia('(prefers-reduced-data: reduce)').matches)
    }
  }, [])

  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: <Mail className="w-7 h-7" />,
      url: 'mailto:mohdadilsiraju@gmail.com',
      description: 'mohdadilsiraju@gmail.com',
      gradient: 'from-purple-500 to-pink-500',
      hoverColor: 'group-hover:text-purple-400',
      internal: true
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-7 h-7" />,
      url: 'https://wa.me/918113936995',
      description: '+91 81139 36995',
      gradient: 'from-green-500 to-emerald-500',
      hoverColor: 'group-hover:text-green-400',
      internal: true
    },
    {
      name: 'SMS',
      icon: <Phone className="w-7 h-7" />,
      url: 'sms:+918113936995',
      description: '+91 81139 36995',
      gradient: 'from-blue-500 to-cyan-500',
      hoverColor: 'group-hover:text-blue-400',
      internal: true
    },
    {
      name: 'GitHub',
      icon: <Github className="w-7 h-7" />,
      url: 'https://github.com/adilsiraju',
      description: 'github.com/adilsiraju',
      gradient: 'from-gray-500 to-slate-600',
      hoverColor: 'group-hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-7 h-7" />,
      url: 'https://www.linkedin.com/in/adilsiraju',
      description: 'linkedin.com/in/adilsiraju',
      gradient: 'from-blue-600 to-blue-500',
      hoverColor: 'group-hover:text-blue-400'
    }
  ]

  // Particle animation system
  const createParticle = useCallback((): Particle => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080
    
    return {
      id: Math.random(),
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.5 + 0.2
    }
  }, [])

  useEffect(() => {
    // Only create particles if user doesn't prefer reduced motion/data and we're on client
    if (prefersReducedMotion || prefersReducedData || !isClient) return

    const particleCount = 30
    const initialParticles = Array.from({ length: particleCount }, createParticle)
    setParticles(initialParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + particle.vx
        const newY = particle.y + particle.vy
        const width = typeof window !== 'undefined' ? window.innerWidth : 1920
        const height = typeof window !== 'undefined' ? window.innerHeight : 1080
        
        return {
          ...particle,
          // Wrap around screen edges
          x: newX < 0 ? width : newX > width ? 0 : newX,
          y: newY < 0 ? height : newY > height ? 0 : newY
        }
      }))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [createParticle, prefersReducedMotion, prefersReducedData, isClient])

  useEffect(() => {
    trackEvent('contact_section_view')
    setIsVisible(true)
  }, [trackEvent])

  const handleClick = (link: SocialLink) => {
    trackEvent('contact_link_click', {
      channel: link.name.toLowerCase(),
      url: link.url
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 py-20 px-4"
    >
      {/* Animated particles background */}
      {isClient && !prefersReducedMotion && !prefersReducedData && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                width: particle.size,
                height: particle.size
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Header section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Let&apos;s Connect</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Ready to Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Something Amazing?
            </span>
          </h2>

          <motion.p 
            className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I&apos;m always excited to collaborate on innovative projects. Whether you&apos;re looking to build AI solutions, 
            develop web applications, or explore new technologies — let&apos;s create something incredible together.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-slate-400"
            variants={itemVariants}
          >
            <Coffee className="w-5 h-5" />
            <span className="text-sm">Available for freelance projects & full-time opportunities</span>
          </motion.div>
        </motion.div>

        {/* Contact cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.internal ? '_self' : '_blank'}
              rel={link.internal ? undefined : 'noopener noreferrer'}
              onClick={() => handleClick(link)}
              className="group relative block"
              variants={itemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 overflow-hidden"
                variants={cardHoverVariants}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon container */}
                <div className={`relative mb-6 p-4 rounded-2xl bg-gradient-to-r ${link.gradient} shadow-lg inline-block`}>
                  <div className="text-white">
                    {link.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-xl font-bold text-white ${link.hoverColor} transition-colors duration-300`}>
                      {link.name}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                    {link.description}
                  </p>

                  {/* Quick action indicator */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600/50 group-hover:border-gray-500/50 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300">
                      {link.internal ? 'Direct Contact' : 'View Profile'}
                    </span>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${link.gradient} blur-xl opacity-20`} />
                </div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="inline-block p-1 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="px-8 py-4 rounded-xl bg-slate-950 hover:bg-transparent transition-colors duration-300 group">
              <p className="text-lg font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                Don&apos;t see your preferred platform? Just mention it when you reach out!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full" />
      </div>
    </section>
  )
}
