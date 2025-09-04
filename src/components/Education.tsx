'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  GraduationCap, 
  Award, 
  Globe,
  Calendar,
  MapPin,
  Star,
  Code,
  Database,
  Brain,
  Shield,
  Trophy
} from 'lucide-react'

interface Education {
  id: string
  degree: string
  institution: string
  duration: string
  location: string
  cgpa: string
  modules: string[]
  description: string
}

interface Certification {
  id: string
  title: string
  provider: string
  icon: React.ReactNode
  color: string
}

const education: Education = {
  id: 'pace',
  degree: 'BE in AI & ML',
  institution: 'P.A. College of Engineering, Mangalore',
  duration: 'Dec 2021 – Aug 2025',
  location: 'Mangalore, Karnataka',
  cgpa: '7.17',
  modules: [
    'Data Structures',
    'AI & ML',
    'Cloud Computing',
    'Data Science',
    'Operating Systems',
    'Algorithms',
    'Python Programming',
    'Deep Learning'
  ],
  description: 'Comprehensive AI & ML engineering program covering theoretical foundations and practical applications in artificial intelligence, machine learning, and data science.'
}

const certifications: Certification[] = [
  {
    id: 'ibm-blockchain',
    title: 'IBM Blockchain Essentials',
    provider: 'IBM',
    icon: <Database className="w-5 h-5" />,
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'ibm-python',
    title: 'IBM Python for Data Science',
    provider: 'IBM',
    icon: <Code className="w-5 h-5" />,
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'cisco-cyber',
    title: 'Introduction to Cybersecurity',
    provider: 'Cisco',
    icon: <Shield className="w-5 h-5" />,
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'umich-thinking',
    title: 'Computational Thinking',
    provider: 'University of Michigan',
    icon: <Brain className="w-5 h-5" />,
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'cs50x',
    title: 'CS50x: Introduction to Computer Science',
    provider: 'Harvard University',
    icon: <Code className="w-5 h-5" />,
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'million-prompters',
    title: '1 Million Prompters',
    provider: 'Dubai Future Foundation',
    icon: <Trophy className="w-5 h-5" />,
    color: 'from-yellow-600 to-orange-800'
  },
  {
    id: 'matrix-awards',
    title: 'Matrix University Awards - EcoVest Project',
    provider: 'Matrix University',
    icon: <Award className="w-5 h-5" />,
    color: 'from-indigo-600 to-purple-800'
  }
]

const skills = {
  technical: [
    'Python', 'Java', 'C', 'SQL', 'Django', 'Streamlit', 
    'Git', 'VS Code', 'Linux', 'Windows', 'Web Development',
    'Data Science', 'Machine Learning', 'Artificial Intelligence',
    'Flask', 'Scratch', 'Data Structures', 'Algorithms', 
    'Cascading Style Sheets (CSS)', 'Bootstrap (Framework)', 
    'Database Design', 'Front-End Development', 'Full-Stack Development', 
    'HTML5', 'Web Applications', 'Web Design'
  ],
  soft: [
    'Problem Solving', 'Critical Thinking', 'Communication',
    'Team Leadership', 'Project Management', 'Innovation', 'Design Thinking'
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Professional' },
    { name: 'Malayalam', level: 'Native' },
    { name: 'Arabic', level: 'Conversational' }
  ]
}

const Education = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'certifications' | 'skills'>('education')
  const [isClient, setIsClient] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])

  useEffect(() => {
    setIsClient(true)
    // Generate random positions for background particles
    const positions = Array.from({ length: 25 }, () => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5
    }))
    setParticlePositions(positions)
  }, [])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section className="min-h-screen py-20 px-6 relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950">
      {/* Background effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        {/* Floating particles */}
        {isClient && particlePositions.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400/30 rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [particle.y, particle.y - 200],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6"
          >
            <GraduationCap className="w-4 h-4" />
            Learning & Growth
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent mb-6">
            Education & Skills
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A foundation built on global education, industry certifications, and continuous learning 
            across AI, ML, and emerging technologies.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
            {(['education', 'certifications', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <div className="min-h-[600px]">
          {/* Education Tab */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-2">{education.degree}</h3>
                    <p className="text-xl text-emerald-300 font-semibold mb-4">{education.institution}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {education.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {education.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        CGPA: {education.cgpa}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{education.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Core Modules</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {education.modules.map((module, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 rounded-xl text-sm border border-emerald-500/30 text-center"
                      >
                        {module}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Certifications Tab */}
          {activeTab === 'certifications' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} shadow-lg`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                      <p className="text-emerald-300 font-semibold">{cert.provider}</p>
                    </div>
                    <Award className="w-6 h-6 text-yellow-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Technical Skills */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-emerald-400" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.technical.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-emerald-400" />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.soft.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  Languages
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {skills.languages.map((lang, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30"
                    >
                      <span className="text-white font-semibold">{lang.name}</span>
                      <span className="text-sm text-teal-300">{lang.level}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Education
