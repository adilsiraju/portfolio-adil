'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Mail, 
  MessageCircle, 
  Send, 
  Github, 
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import toast from 'react-hot-toast'
import { useAnalytics } from '@/hooks/useAnalytics'

const ContactEpilogue = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const { trackEvent, trackSectionView, trackContactFormSubmit, trackSocialLinkClick } = useAnalytics()

  useEffect(() => {
    setIsClient(true)
    // Track section view
    trackSectionView('contact')
    
    // Generate random positions after client mount to avoid hydration mismatch
    const positions = Array.from({ length: 30 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3
    }))
    setParticlePositions(positions)
  }, [trackSectionView])
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Track form submission attempt
      await trackContactFormSubmit()
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        
        // Track successful submission
        await trackEvent('contact_form_success', { 
          name: formData.name,
          email: formData.email 
        })
        
        toast.success('Message sent successfully! I\'ll get back to you soon.', {
          duration: 5000,
          style: {
            background: '#1e293b',
            color: '#ffffff',
            border: '1px solid #8b5cf6'
          }
        })
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Track failed submission
      await trackEvent('contact_form_error', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      })
      
      toast.error('Failed to send message. Please try again or contact me directly.', {
        duration: 5000,
        style: {
          background: '#1e293b',
          color: '#ffffff',
          border: '1px solid #ef4444'
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/adilsiraju',
      color: 'hover:text-gray-300'
    },
    {
      name: 'Portfolio Website',
      icon: <Mail className="w-5 h-5" />,
      url: 'https://www.adilsiraju.github.io',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:mohdadilsiraju@gmail.com',
      color: 'hover:text-purple-400'
    }
  ]

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Background effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >        {/* Floating particles */}
        {isClient && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [particle.y, particle.y - 200],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            The Story Continues
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Let&apos;s Create Together
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every great story needs a collaboration. Ready to write the next chapter?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 rounded-2xl bg-green-500/10 border border-green-500/30"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300 mb-4">
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-purple-600 hover:bg-purple-500 text-white"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="Tell me your name..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Share your ideas, questions, or just say hello..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-4 h-4" />
                  </span>
                )}              </Button>
            </form>
            )}
          </motion.div>

          {/* Contact info and social links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick connect */}            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                Quick Connect
              </h3>
              
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Thalassery, Kerala, India</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <a href="mailto:mohdadilsiraju@gmail.com" className="hover:text-purple-300 transition-colors">
                    mohdadilsiraju@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-purple-400" />
                  <a href="tel:+918113936995" className="hover:text-purple-300 transition-colors">
                    +91-8113936995
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Connect Across Platforms
              </h3>
                <div className="space-y-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-gray-300 ${link.color} transition-colors group`}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onClick={() => trackSocialLinkClick(link.name, link.url)}
                  >
                    <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to action */}            <motion.div
              className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                Open to Full-Time Opportunities
              </h3>
              <p className="text-gray-300 text-sm">
                Ready to contribute to AI/ML teams and collaborative projects that make a difference.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >          <p className="text-gray-400 italic">
            &quot;The best way to predict the future is to create it.&quot; - Peter Drucker
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactEpilogue
