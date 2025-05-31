'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Code, 
  Database,
  Cloud,
  GitBranch,
  Cpu,
  Globe
} from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface Experience {
  id: string
  title: string
  company: string
  duration: string
  location: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
  icon: React.ReactNode
  color: string
}

const experiences: Experience[] = [
  {
    id: 'accenture',
    title: 'Software Developer',
    company: 'Accenture UK',
    duration: 'Mar 2025',
    location: 'Remote',
    type: 'Virtual Internship',
    description: 'Gained comprehensive exposure to the full Software Development Lifecycle in a global tech consulting environment.',
    achievements: [
      'Researched and presented key findings on emerging DevOps trends',
      'Conducted comparative analysis of Agile and Waterfall methodologies',
      'Designed efficient algorithms for complex problem-solving scenarios',
      'Successfully debugged and resolved Python application issues'
    ],
    technologies: ['Python', 'DevOps', 'Agile', 'Algorithm Design'],
    icon: <Globe className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'rooman',
    title: 'AI DevOps Intern',
    company: 'Rooman Technology x NASSCOM',
    duration: 'Sep 2024 - Feb 2025',
    location: 'Mangalore',
    type: 'On-site Internship',
    description: 'Specialized in implementing DevOps practices for AI model development and deployment in real-world scenarios.',
    achievements: [
      'Implemented CI/CD pipelines for automated ML model deployment',
      'Mastered containerization and orchestration for AI applications',
      'Collaborated in team environments simulating production workflows',
      'Gained expertise in version control and automated testing for ML'
    ],
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'CI/CD', 'ML Ops'],
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  }
]

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])

  const { trackSectionView, trackEvent } = useAnalytics()

  useEffect(() => {
    setIsClient(true)
    // Track section view
    trackSectionView('experience')
    
    // Generate random positions for background particles
    const positions = Array.from({ length: 20 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4
    }))
    setParticlePositions(positions)
  }, [trackSectionView])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Background effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Floating particles */}
        {isClient && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [particle.y, particle.y - 300],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6"
          >
            <Briefcase className="w-4 h-4" />
            Professional Journey
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From virtual internships at global tech giants to hands-on DevOps experience, 
            each role has shaped my understanding of AI and software development.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={`flex flex-col lg:flex-row gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -10 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Company header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} shadow-lg`}>
                        {exp.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-xl text-blue-300 font-semibold mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline connector */}
                <div className="flex lg:flex-col items-center lg:w-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="w-px h-20 lg:h-32 bg-gradient-to-b from-blue-500/50 to-transparent" />
                  )}
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-300 mb-8">
            Ready to add more exciting chapters to this journey?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Let&apos;s Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
