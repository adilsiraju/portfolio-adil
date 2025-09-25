'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Code, 
  Brain, 
  Coffee, 
  Book, 
  Lightbulb,
  Heart,
  Target,
  Zap
} from 'lucide-react'

interface PersonalityTrait {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  story: string
  color: string
}

const personalityTraits: PersonalityTrait[] = [
  {
    id: 'innovator',
    title: 'The Sustainable Innovator',
    icon: <Lightbulb className="w-6 h-6" />,
    description: 'Building EcoVest for accessible sustainable investing',
    story: 'Currently developing EcoVest, a platform that connects users with eco-initiatives while tracking environmental impact through carbon, energy, and water metrics. Every line of code contributes to a greener future.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'learner',
    title: 'The Global Learner',
    icon: <Book className="w-6 h-6" />,
    description: 'Cross-cultural education across India and UAE',
    story: 'My educational journey spans from Kerala to Mangalore, with a global perspective shaped by diverse experiences. Currently pursuing BE in AI & ML with certifications from IBM, Cisco, and University of Michigan.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'builder',
    title: 'The DevOps Practitioner',
    icon: <Code className="w-6 h-6" />,
    description: 'AI + DevOps for scalable solutions',
    story: 'From implementing CI/CD pipelines for ML models to working with Docker, Kubernetes, and Jenkins. I bridge the gap between AI innovation and production-ready deployments.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'dreamer',
    title: 'The Industry Explorer',
    icon: <Brain className="w-6 h-6" />,
    description: 'Internships across tech giants and startups',
    story: 'Gained valuable experience through virtual and on-site internships at Accenture UK, Wells Fargo, Deloitte, and Rooman Technology. Each experience shaped my understanding of real-world AI applications.',
    color: 'from-orange-500 to-red-500'
  }
]

const MagicalAbout = () => {
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [orbPositions, setOrbPositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsClient(true)
    // Generate random positions after client mount to avoid hydration mismatch
    const positions = Array.from({ length: 20 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 2
    }))
    setOrbPositions(positions)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="magical-about" ref={containerRef} className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
      {/* Magical background effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >        {/* Floating orbs */}
        {isClient && orbPositions.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/10 rounded-full"
            initial={{ 
              x: orb.x, 
              y: orb.y,
              scale: 0,
              opacity: 0
            }}
            animate={{
              y: [orb.y, orb.y + 200],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-delay-2s" />
      </motion.div>

      <motion.div 
        style={{ opacity: contentOpacity }}
        className="max-w-6xl mx-auto relative z-10"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            The Story Behind the Code
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Meet the Mind
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Machine Learning & Deep Learning Engineer (B.E. AI & ML, First Class with Distinction) skilled in PyTorch, FastAI, Hugging Face and end-to-end ML pipelines—from data preprocessing and experimentation to model optimization, evaluation, and deployment. Hands-on across computer vision, NLP, and MLOps tooling with a track record of shipping real, usable ML applications.
          </p>
        </motion.div>

        {/* Central avatar and intro */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >            {/* Avatar */}
            <div className="w-40 h-40 mx-auto mb-6 relative">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
                  {/* Profile Image */}
                  <Image
                    src="/images/adil.jpg"
                    alt="Mohammed Adil Siraju"
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 160px, 160px"
                    priority
                  />
                </div>
              </div>
              
              {/* Floating icons around avatar */}
              {[Coffee, Code, Heart, Target].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  style={{
                    top: `${25 + Math.sin((index * Math.PI) / 2) * 60}%`,
                    left: `${25 + Math.cos((index * Math.PI) / 2) * 60}%`,
                  }}
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 3 + index,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </motion.div>
              ))}
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">Mohammed Adil Siraju</h3>
            <p className="text-lg text-purple-300 font-medium mb-6">AI/ML Engineer & Digital Storyteller</p>
            
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >              A passionate explorer of the digital frontier—where artificial intelligence meets human creativity.
            I’m currently building impactful AI-driven solutions that blend innovation with real-world value.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Personality traits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {personalityTraits.map((trait, index) => (
            <motion.div
              key={trait.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedTrait(trait.id)}
            >
              <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 h-full">
                {/* Icon */}
                <motion.div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${trait.color} mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {trait.icon}
                </motion.div>
                
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {trait.title}
                </h4>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {trait.description}
                </p>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`trait-hover-${trait.id}`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current focus */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Currently Crafting
          </div>
            <p className="text-2xl text-white font-light max-w-3xl mx-auto leading-relaxed mb-8">
            &quot;Building AI systems that don&apos;t just compute, but understand. 
            Creating technology that enhances human potential rather than replacing it.&quot;
          </p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span>🎓 B.E in AI & ML</span>
            <span>🧠 Deep Learning</span>
            <span>💡 Research Enthusiast</span>
            <span>🌟 Innovation Catalyst</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trait detail modal */}
      <AnimatePresence>
        {selectedTrait && (
          <TraitDetailModal 
            trait={personalityTraits.find(t => t.id === selectedTrait)!}
            onClose={() => setSelectedTrait(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Trait detail modal
const TraitDetailModal = ({ trait, onClose }: { trait: PersonalityTrait, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${trait.color} mb-6`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            {trait.icon}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">{trait.title}</h3>
          <p className="text-gray-300 leading-relaxed">{trait.story}</p>
          
          <motion.button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MagicalAbout
