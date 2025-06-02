'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Mail, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const navItems: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
    href: '#story-hero'
  },
  {
    id: 'about',
    label: 'About',
    icon: <User className="w-5 h-5" />,
    href: '#magical-about'
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <Briefcase className="w-5 h-5" />,
    href: '#experience'
  },
  {
    id: 'education',
    label: 'Education',
    icon: <GraduationCap className="w-5 h-5" />,
    href: '#education'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: <Code className="w-5 h-5" />,
    href: '#projects'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: <Mail className="w-5 h-5" />,
    href: '#contact'
  }
]

const VerticalNavigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (sectionId) {
              setActiveSection(sectionId.replace('-section', ''))
            }
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    // Observe all sections
    navItems.forEach(item => {
      const element = document.querySelector(item.href)
      if (element) {
        observer.observe(element)
      }
    })

    // Show navigation after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50"
      >
        <div className="flex flex-col gap-2 p-4 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => scrollToSection(item.href)}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeSection === item.id || activeSection.includes(item.id)
                  ? 'bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {item.icon}
                {(activeSection === item.id || activeSection.includes(item.id)) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -inset-1 bg-purple-500/30 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              
              {/* Tooltip */}
              <motion.div
                className="absolute left-full ml-4 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={false}
              >
                {item.label}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900/90 rotate-45" />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-black/20 backdrop-blur-xl rounded-full border border-white/10 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 z-40 p-6"
            >
              <div className="mt-20 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                      activeSection === item.id || activeSection.includes(item.id)
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>

              {/* Footer in mobile nav */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Mohammed Adil Siraju</p>
                  <p className="text-xs text-gray-600">AI & ML Engineer</p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default VerticalNavigation
