'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Code, 
  Brain, 
  Rocket, 
  Star, 
  ChevronRight, 
  Play,
  ExternalLink,
  Github
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface JourneyChapter {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tech: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  story: string
}

const journeyChapters: JourneyChapter[] = [
  {
    id: 'ai-startup-catalyst',
    title: 'AI Startup Catalyst',
    subtitle: 'Where algorithms meet entrepreneurship',
    description: 'An intelligent platform that transforms startup ideas into actionable business plans using advanced AI.',
    image: '/images/ai-catalyst.jpg',
    tech: ['Python', 'TensorFlow', 'React', 'FastAPI', 'GPT-4'],
    demoUrl: 'https://ai-catalyst-demo.vercel.app',
    githubUrl: 'https://github.com/adil/ai-startup-catalyst',
    featured: true,
    story: 'Born from late-night coding sessions and a vision to democratize entrepreneurship through AI.'
  },
  {
    id: 'neural-symphony',
    title: 'Neural Symphony',
    subtitle: 'Music composed by artificial minds',
    description: 'A deep learning model that composes original music pieces based on emotion and genre preferences.',
    image: '/images/neural-music.jpg',
    tech: ['PyTorch', 'MIDI', 'Python', 'JavaScript', 'Web Audio API'],
    demoUrl: 'https://neural-symphony.vercel.app',
    githubUrl: 'https://github.com/adil/neural-symphony',
    featured: true,
    story: 'What happens when you teach a neural network to understand the language of music?'
  },
  {
    id: 'smart-health-guardian',
    title: 'Smart Health Guardian',
    subtitle: 'AI-powered healthcare companion',
    description: 'Predictive health monitoring system using IoT sensors and machine learning for early disease detection.',
    image: '/images/health-ai.jpg',
    tech: ['Python', 'scikit-learn', 'IoT', 'React Native', 'MongoDB'],
    demoUrl: 'https://health-guardian.vercel.app',
    githubUrl: 'https://github.com/adil/smart-health-guardian',
    featured: false,
    story: 'Technology meets healthcare to create a future where prevention trumps cure.'
  }
]

const JourneySection = () => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="journey" ref={containerRef} className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 150]) }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-6"
          >
            <Rocket className="w-4 h-4" />
            The Journey Continues
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Chapters of Innovation
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Each project tells a story of challenges conquered, algorithms mastered, and dreams transformed into digital reality.
          </p>
        </motion.div>

        {/* Journey chapters grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {journeyChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredChapter(chapter.id)}
              onMouseLeave={() => setHoveredChapter(null)}
              onClick={() => setSelectedChapter(chapter.id)}
            >
              <Card className="h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"
                    animate={{
                      scale: hoveredChapter === chapter.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {chapter.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full text-yellow-300 text-xs font-medium">
                        <Star className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: hoveredChapter === chapter.id ? 1 : 0.7,
                    }}
                  >
                    <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                      {index === 0 && <Brain className="w-8 h-8 text-purple-400" />}
                      {index === 1 && <Code className="w-8 h-8 text-blue-400" />}
                      {index === 2 && <Rocket className="w-8 h-8 text-green-400" />}
                    </div>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {chapter.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 font-medium">
                    {chapter.subtitle}
                  </p>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {chapter.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {chapter.tech.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {chapter.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md">
                        +{chapter.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Explore
                    </Button>
                    
                    {chapter.githubUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="px-3 text-gray-400 hover:text-gray-200 hover:bg-gray-500/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(chapter.githubUrl, '_blank')
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-400 mb-6">
            Want to see the complete collection of innovations?
          </p>
          
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
          >
            <span className="flex items-center gap-2">
              View All Projects
              <ChevronRight className="w-5 h-5" />
            </span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedChapter && (
          <ProjectDetailModal 
            chapter={journeyChapters.find(c => c.id === selectedChapter)!}
            onClose={() => setSelectedChapter(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Project detail modal component
const ProjectDetailModal = ({ chapter, onClose }: { chapter: JourneyChapter, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">{chapter.title}</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>

        <p className="text-purple-300 font-medium mb-4">{chapter.subtitle}</p>
        
        <p className="text-gray-300 mb-6 leading-relaxed">{chapter.story}</p>
        
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {chapter.tech.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          {chapter.demoUrl && (
            <Button 
              onClick={() => window.open(chapter.demoUrl, '_blank')}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          )}
          
          {chapter.githubUrl && (
            <Button 
              variant="outline"
              onClick={() => window.open(chapter.githubUrl, '_blank')}
              className="border-gray-600 text-gray-300"
            >
              <Github className="w-4 h-4 mr-2" />
              Source Code
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default JourneySection
