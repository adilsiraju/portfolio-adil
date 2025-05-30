'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Leaf, Lock, Brain } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'EcoVest',
      subtitle: 'Sustainable Investing Platform',
      description: 'A comprehensive platform for tracking carbon, energy, and water impact in investments. Built with Django and Python, featuring ML algorithms to analyze sustainability metrics and provide intelligent investment recommendations.',
      tech: ['Django', 'Python', 'Machine Learning', 'PostgreSQL', 'Chart.js'],
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      github: 'https://github.com/adilsiraju/ecovest',
      demo: '#',
      features: [
        'Carbon footprint tracking',
        'ESG score analysis',
        'ML-powered recommendations',
        'Real-time sustainability metrics'
      ]
    },
    {
      id: 2,
      title: 'Simple Password Manager',
      subtitle: 'CLI Security Tool',
      description: 'A command-line password manager with advanced encryption for secure password storage. Features include password generation, encrypted storage, and secure authentication mechanisms.',
      tech: ['Python', 'Cryptography', 'CLI', 'SQLite', 'Argparse'],
      icon: Lock,
      color: 'from-blue-500 to-cyan-600',
      github: 'https://github.com/adilsiraju/password-manager',
      demo: '#',
      features: [
        'AES-256 encryption',
        'Secure password generation',
        'CLI interface',
        'Master password protection'
      ]
    },
    {
      id: 3,
      title: 'AI Model Deployment Pipeline',
      subtitle: 'MLOps Solution',
      description: 'An automated CI/CD pipeline for deploying machine learning models using Docker and containerization. Includes model versioning, automated testing, and scalable deployment infrastructure.',
      tech: ['Docker', 'FastAPI', 'MLflow', 'GitHub Actions', 'AWS'],
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      github: 'https://github.com/adilsiraju/ml-deployment',
      demo: '#',
      features: [
        'Automated model deployment',
        'Model versioning',
        'API endpoint generation',
        'Performance monitoring'
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in AI/ML, 
            web development, and DevOps.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Project Header */}
              <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-6 left-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <project.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Key Features:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github size={16} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-medium">Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/adilsiraju"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            <Github size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
