'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Code, Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-8 px-6 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <span>Crafted with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-400" />
            </motion.div>
            <span>and</span>
            <Code className="w-4 h-4 text-blue-400" />
            <span>powered by</span>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Coffee className="w-4 h-4 text-amber-400" />
            </motion.div>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mohammed Adil Siraju. 
            <span className="mx-2">•</span>
            Building the future, one line of code at a time.
          </p>
        </motion.div>
        <div className="mt-4 text-center">
          <a
            href="/resume.pdf"
            download
            className="inline-block text-sm text-purple-300 hover:text-purple-200 underline/30 hover:underline"
          >
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
