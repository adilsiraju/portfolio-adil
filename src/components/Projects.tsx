'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Rocket, 
  ExternalLink, 
  Github, 
  Leaf,
  Lock,
  Zap
} from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  features: string[]
  impact: string
  status: 'In Development' | 'Completed' | 'Maintenance'
  category: 'Sustainability' | 'Security' | 'AI/ML' | 'Web Development'
  icon: React.ReactNode
  color: string
  backgroundGradient: string
  demoUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: 'ecovest',
    title: 'EcoVest',
    description: 'A comprehensive web platform enabling sustainable investing by connecting users with eco-initiatives.',
    longDescription: 'EcoVest revolutionizes sustainable investing by providing an accessible platform where users can discover, invest in, and track eco-friendly initiatives. The platform features real-time environmental impact tracking through carbon footprint, energy consumption, and water usage metrics.',
    technologies: ['Django', 'Python', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL'],
    features: [
      'Real-time environmental impact tracking',
      'Carbon footprint monitoring and analytics',
      'Energy consumption metrics dashboard',
      'Water usage impact visualization',
      'User-friendly investment interface',
      'Eco-initiative discovery and filtering',
      'Impact reporting and portfolio management'
    ],
    impact: 'Democratizing sustainable investing and making environmental impact measurable and actionable for everyday investors.',
    status: 'In Development',
    category: 'Sustainability',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600',
    backgroundGradient: 'from-green-900/20 to-emerald-900/20',
    demoUrl: '',
    githubUrl: ''
  },
  {
    id: 'password-manager',
    title: 'Simple Password Manager',
    description: 'A secure CLI-based password manager with advanced encryption and master key authentication.',
    longDescription: 'A command-line password manager built with security-first principles, featuring strong encryption algorithms and master key authentication. Designed for developers and security-conscious users who prefer terminal-based tools.',
    technologies: ['Python', 'Cryptography', 'CLI', 'Encryption', 'Security'],
    features: [
      'Advanced encryption using industry-standard algorithms',
      'Master key authentication system',
      'Secure password generation with customizable parameters',
      'Local storage with encrypted database',
      'Command-line interface for quick access',
      'Password strength analysis and recommendations',
      'Secure clipboard integration'
    ],
    impact: 'Providing developers with a lightweight, secure, and terminal-friendly password management solution.',
    status: 'Completed',
    category: 'Security',
    icon: <Lock className="w-8 h-8" />,
    color: 'from-purple-500 to-violet-600',
    backgroundGradient: 'from-purple-900/20 to-violet-900/20',
    demoUrl: '',
    githubUrl: ''
  }
]

const projectCategories = ['All', 'Sustainability', 'Security', 'AI/ML', 'Web Development']

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])

  const { trackSectionView, trackProjectClick, trackEvent } = useAnalytics()

  useEffect(() => {
    setIsClient(true)
    // Track section view
    trackSectionView('projects')
    
    // Generate random positions for background particles
    const positions = Array.from({ length: 30 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6
    }))
    setParticlePositions(positions)
  }, [trackSectionView])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Completed': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Maintenance': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-orange-950 to-red-950">
      {/* Background effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Floating particles */}
        {isClient && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [particle.y, particle.y - 400],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0]
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
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm font-medium mb-6"
          >
            <Rocket className="w-4 h-4" />
            Featured Projects
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent mb-6">
            Building the Future
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From sustainable investing platforms to security tools, each project represents 
            a step towards solving real-world problems with innovative technology.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                trackEvent('project_category_filter', { category })
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                className={`bg-gradient-to-br ${project.backgroundGradient} backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 h-full`}
              >
                {/* Project header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${project.color} shadow-lg`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {selectedProject === project.id ? project.longDescription : project.description}
                </p>

                {/* Features (shown when expanded) */}
                {selectedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Zap className="w-3 h-3 mt-1 text-orange-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 bg-gradient-to-r ${project.color} bg-opacity-20 text-white rounded-full text-xs border border-white/20`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Impact</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.impact}</p>
                </div>                {/* Expand/Collapse button */}
                <motion.button
                  onClick={() => {
                    const isExpanding = selectedProject !== project.id
                    setSelectedProject(selectedProject === project.id ? null : project.id)
                    if (isExpanding) {
                      trackProjectClick(project.title)
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold hover:shadow-lg transition-all duration-300`}
                >
                  {selectedProject === project.id ? 'Show Less' : 'Learn More'}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Have an Idea?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s collaborate and build something amazing together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
          >
            Start a Conversation
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
