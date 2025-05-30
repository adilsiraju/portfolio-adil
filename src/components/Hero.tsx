'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Mail, Phone, MapPin, Github, Download, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useToast } from './ToastProvider'

// Types for our animated elements
interface ParticlePosition {
  left: number
  top: number
}

interface SparklePosition {
  x: number
  y: number
}

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([])
  const [sparklePositions, setSparklePositions] = useState<SparklePosition[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const { addToast } = useToast()

  // Generate random positions only on client-side to prevent hydration mismatch
  useEffect(() => {
    // Generate particle positions
    const particles: ParticlePosition[] = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
    setParticlePositions(particles)

    // Generate sparkle positions
    const sparkles: SparklePosition[] = Array.from({ length: 3 }, () => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 50 - 25,
    }))
    setSparklePositions(sparkles)

    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25,
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mohdadilsiraju@gmail.com')
      addToast({
        message: 'Email copied to clipboard!',
        type: 'success'
      })
    } catch (error) {
      addToast({
        message: 'Failed to copy email',
        type: 'error'
      })
    }
  }

  const handleHover = () => {
    // Sound effects removed for now
  }
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Particles - Only render after mounting to prevent hydration mismatch */}
        {isMounted && particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          style={{ x: mousePosition.x, y: mousePosition.y }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
          style={{ x: mousePosition.x * -0.5, y: mousePosition.y * -0.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
          style={{ y: y1 }}
        >          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-48 h-48 mx-auto mb-8 relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Rotating Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-purple-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Main Image Container */}
            <motion.div 
              className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                boxShadow: isHovered 
                  ? "0 25px 50px -12px rgba(59, 130, 246, 0.5)" 
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >              <Image
                src="/images/adil.jpg"
                alt="Mohammed Adil Siraju"
                fill
                className="object-cover"
                priority
              />
              
              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center"
              >
                <Sparkles className="text-white" size={32} />
              </motion.div>
            </motion.div>
            
            {/* Status Indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white relative"
          >
            <motion.span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Mohammed Adil Siraju
            </motion.span>            {/* Sparkle effects - Only render after mounting to prevent hydration mismatch */}
            {isMounted && sparklePositions.map((position, i) => (
              <motion.div
                key={i}
                className="absolute -top-2 text-yellow-400"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: position.x,
                  y: position.y
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  repeatDelay: 3
                }}
              >
                <Star size={16} fill="currentColor" />
              </motion.div>
            ))}
          </motion.h1>          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold relative"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"
            />
            AI & ML Engineering Graduate | Aspiring AI/ML Engineer
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"
            />
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            AI & ML graduate building sustainable tech solutions using Python, ML, and DevOps pipelines.
          </motion.p>          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-300"
          >
            <motion.div 
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors group"
              whileHover={{ scale: 1.05 }}
              onClick={copyEmail}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Mail size={20} />
              </motion.div>
              <span className="group-hover:font-semibold transition-all">mohdadilsiraju@gmail.com</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 hover:text-green-600 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Phone size={20} />
              </motion.div>
              <span className="group-hover:font-semibold transition-all">+91-8113936995</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 hover:text-red-600 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <MapPin size={20} />
              </motion.div>
              <span className="group-hover:font-semibold transition-all">Thalassery, Kerala</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 hover:text-purple-600 transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Github size={20} />
              </motion.div>
              <span className="group-hover:font-semibold transition-all">adilsiraju</span>
            </motion.div>
          </motion.div>          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >            <motion.a
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleHover}
              href="mailto:mohdadilsiraju@gmail.com"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={20} />
                Get In Touch
              </span>
            </motion.a>
            <motion.a
              whileHover={{ 
                scale: 1.05,
                borderColor: "#3B82F6",
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleHover}
              href="https://wa.me/918113936995"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold text-lg transition-all relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-blue-600"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <Phone size={20} />
                WhatsApp
              </span>
            </motion.a>
            <motion.a
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={handleHover}
              href="/resume.pdf"
              download
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg flex items-center gap-2"
            >
              <Download size={20} />
              Resume
            </motion.a>
          </motion.div>          {/* Scroll Down Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={scrollToAbout}
            className="mt-16 mx-auto block text-gray-400 hover:text-blue-600 transition-colors group"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm group-hover:font-semibold transition-all">Discover More</span>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
              >
                <ArrowDown size={24} />
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.7)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
