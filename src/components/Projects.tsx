'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Rocket, 
  ExternalLink, 
  Github, 
  Leaf,
  Lock,
  Zap,
  Calculator,
  Building
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
  category: 'Sustainability' | 'Security' | 'AI/ML' | 'Web Development' | 'Productivity'
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
    status: 'Completed',
    category: 'Sustainability',
    icon: <Leaf className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600',
    backgroundGradient: 'from-green-900/20 to-emerald-900/20',
    demoUrl: '',
    githubUrl: ''
  },
  {
    id: 'medical-doc-classifier',
    title: 'Medical Document Classifier',
    description: 'Bio_ClinicalBERT fine-tuned to classify clinical documents across 13+ specialties with 81.08% accuracy.',
    longDescription: 'Developed a medical document classifier by fine-tuning a pre-trained Bio_ClinicalBERT model on a curated dataset of clinical texts spanning 13+ medical specialties. Achieved 81.08% overall test accuracy with a top F1-score of 0.968 for Cardiovascular / Pulmonary documents, demonstrating strong specialization performance. Deployed an interactive Gradio web app enabling real-time medical text classification end-to-end.',
    technologies: ['Hugging Face', 'Transformers', 'PyTorch', 'Bio_ClinicalBERT', 'Gradio', 'NLP', 'Fine-Tuning'],
    features: [
      'Fine-tuned Bio_ClinicalBERT for multi-specialty classification',
      '81.08% test accuracy across 13+ medical specialties',
      'Top F1-score of 0.968 (Cardiovascular / Pulmonary)',
      'Interactive real-time inference via Gradio UI',
      'Robust preprocessing & tokenization pipeline',
      'Exportable model for downstream clinical NLP tasks',
      'Scalable architecture for adding new specialties'
    ],
    impact: 'Accelerates triage and categorization of clinical documents, reducing manual review time and enabling faster downstream processing in healthcare NLP pipelines.',
    status: 'Completed',
    category: 'AI/ML',
    icon: <Building className="w-8 h-8" />,
    color: 'from-fuchsia-500 to-pink-600',
    backgroundGradient: 'from-fuchsia-900/20 to-pink-900/20',
    demoUrl: '',
    githubUrl: 'https://github.com/adilsiraju/Medical-Case-Classifier'
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
    githubUrl: 'https://github.com/adilsiraju/Simple-Password-Manager'
  },
  {
    id: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    description: 'A simple and intuitive command-line tool for tracking personal income and expenses, built with Python and CSV storage.',
    longDescription: 'Personal Finance Tracker is a Python-based CLI application that empowers users to manage their finances by recording transactions, viewing transaction history, and generating financial summaries within custom date ranges. It offers robust input validation and stores all data locally in a CSV file for portability and privacy. Designed for individuals who prefer lightweight, terminal-based finance management.',
    technologies: ['Python', 'pandas', 'CSV', 'CLI'],
    features: [
      'Add income and expense transactions with date, amount, category, and description',
      'Default or custom date support for fast entry',
      'View filtered transaction history within any date range',
      'Generate financial summaries: total income, expenses, and net savings',
      'CSV file storage for easy data access and portability',
      'Robust validation for dates, amounts, and categories',
      'Simple, menu-driven command-line interface'
    ],
    impact: 'Helps individuals gain financial awareness and control by providing an easy way to track, review, and summarize their personal finances without complex software or cloud dependencies.',
    status: 'Completed',
    category: 'Productivity',
    icon: <Calculator className="w-8 h-8" />, // Replace with your icon component/library
    color: 'from-green-500 to-teal-600',
    backgroundGradient: 'from-green-900/20 to-teal-900/20',
    demoUrl: '', // No live demo, as it is a CLI tool
    githubUrl: 'https://github.com/adilsiraju/PersonalFinanceTracker'
  },
  {
    id: 'architecture-classifier',
    title: 'Architectural Style Classifier',
    description: 'CNN-based classifier that identifies 25 architectural styles with 73% accuracy, trained on 10k+ images from Kaggle.',
    longDescription: 'Built and deployed a Convolutional Neural Network (CNN) classifier to identify 25 different architectural styles with 73% accuracy. The project involved comprehensive dataset curation and preprocessing of over 10,000 images from Kaggle, fine-tuning a pretrained model using Transfer Learning techniques, and deploying the solution via both Gradio web app and GitHub Pages for real-time inference.',
    technologies: ['FastAI', 'PyTorch', 'Gradio', 'CNN', 'Transfer Learning', 'GitHub Pages'],
    features: [
      'CNN-based classification with 73% accuracy across 25 architectural styles',
      'Trained on 10k+ curated images from Kaggle dataset',
      'Fine-tuned pretrained model using Transfer Learning',
      'Real-time inference via Gradio web interface',
      'Deployed on GitHub Pages for public access',
      'Custom dataset preprocessing and augmentation',
      'Interactive web app with Gradio API integration'
    ],
    impact: 'Empowering architecture enthusiasts and professionals with an accessible AI tool for style identification, serving over 500 public users with real-time architectural analysis.',
    status: 'Completed',
    category: 'AI/ML',
    icon: <Building className="w-8 h-8" />,
    color: 'from-blue-500 to-indigo-600',
    backgroundGradient: 'from-blue-900/20 to-indigo-900/20',
    demoUrl: 'https://adilsiraju.github.io/Architecture-Style-Classifier/',
    githubUrl: 'https://github.com/adilsiraju/Architecture-Style-Classifier'
  }
  ,
  {
    id: 'netflix-userbase-eda',
    title: 'Netflix Userbase Analysis',
    description: 'Exploratory data analysis on 8k+ Netflix user records to uncover patterns in demographics, subscriptions, and revenue.',
    longDescription: 'Conducted comprehensive exploratory data analysis (EDA) on a dataset of 8k+ Netflix user records to identify demographic trends, subscription behaviors, and revenue distribution patterns. Built visualizations to analyze age, gender, and country-level revenue, and identified churn-prone segments with strategic retention insights.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'EDA', 'Data Visualization'],
    features: [
      'Analyzed 8k+ user records for demographic and subscription patterns',
      'Country-level revenue and engagement insights',
      'Churn-prone user segment identification',
      'Custom visualizations for age/gender distributions',
      'Actionable retention and marketing insights',
      'Efficient data cleaning and preprocessing pipeline',
      'Insight storytelling with structured EDA workflow'
    ],
    impact: 'Provides strategic insights for subscription retention and growth by highlighting churn risks and untapped demographic opportunities.',
    status: 'Completed',
  category: 'Productivity',
    icon: <Calculator className="w-8 h-8" />, // Reuse icon; could customize
    color: 'from-yellow-500 to-amber-600',
    backgroundGradient: 'from-yellow-900/20 to-amber-900/20',
    demoUrl: '',
    githubUrl: 'https://github.com/adilsiraju/Netflix-Userbase-EDA'
  }
  
]

// Reordered to surface AI/ML focused work first, then Sustainability & Productivity; Security & Web Dev later
const projectCategories = ['All', 'AI/ML', 'Productivity', 'Sustainability', 'Security', 'Web Development']

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])

  const { trackSectionView, trackProjectClick, trackEvent } = useAnalytics()
  
  // Client-side accessibility checks
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [prefersReducedData, setPrefersReducedData] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Track section view
    trackSectionView('projects')
    
    // Check accessibility preferences on client
    if (typeof window !== 'undefined') {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      setPrefersReducedData(window.matchMedia('(prefers-reduced-data: reduce)').matches)
    }
    
    // Generate random positions for background particles - fewer on mobile and respect accessibility preferences
    const getParticleCount = () => {
      // Only calculate particle count on client after hydration
      if (!isClient || typeof window === 'undefined') return 0;
      
      // Respect reduced motion and reduced data preferences
      if (prefersReducedMotion || prefersReducedData) return 0;
      
      return window.innerWidth < 768 ? 8 : window.innerWidth < 1024 ? 15 : 30;
    }
    
    const updateParticles = () => {
      const count = getParticleCount();
      if (count === 0) {
        setParticlePositions([]);
        return;
      }
      
      const positions = Array.from({ length: count }, () => ({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        // Slower animations for reduced motion
        duration: prefersReducedMotion ? 20 : Math.random() * 12 + 8,
        delay: prefersReducedMotion ? 0 : Math.random() * 6
      }))
      setParticlePositions(positions)
    }
    
    updateParticles()
    
    // Update particles on window resize (device rotation, etc.)
    const handleResize = () => {
      setTimeout(updateParticles, 100) // Debounce resize
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [trackSectionView, prefersReducedMotion, prefersReducedData, isClient])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Category priority: AI/ML first, then others; Security & Web Development at the end
  const categoryPriority: Record<Project['category'], number> = {
    'AI/ML': 0,
    'Sustainability': 1,
    'Productivity': 2,
    'Security': 3,
    'Web Development': 4
  }

  const filteredProjects = selectedCategory === 'All'
    ? [...projects].sort((a, b) => {
        const pa = categoryPriority[a.category]
        const pb = categoryPriority[b.category]
        if (pa !== pb) return pa - pb
        return 0 // keep original relative order within same category
      })
    : projects.filter(project => project.category === selectedCategory)

  // Animation variants that respect accessibility preferences
  const getAnimationProps = (delay = 0) => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    transition: { 
      duration: prefersReducedMotion ? 0.1 : 0.8, 
      delay: prefersReducedMotion ? 0 : delay 
    },
    viewport: { once: true }
  })

  const getHoverProps = () => prefersReducedMotion ? {} : {
    whileHover: { scale: 1.02, y: -10 }
  }

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
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
          className="mb-12"
        >
          {/* Mobile: Horizontal scroll, Desktop: Centered wrap */}
          <div className="flex gap-3 overflow-x-auto pb-2 md:justify-center md:flex-wrap scrollbar-hide">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  trackEvent('project_category_filter', { category })
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 min-h-[48px] ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <div>
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              {...getAnimationProps(index * 0.2)}
              className="group"
            >
              <motion.div
                {...getHoverProps()}
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
