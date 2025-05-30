'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Brain, GitBranch, Monitor } from 'lucide-react'

const About = () => {
  const skills = [
    { name: 'Python', icon: Code, level: 90 },
    { name: 'Machine Learning', icon: Brain, level: 85 },
    { name: 'Django', icon: Monitor, level: 80 },
    { name: 'Docker', icon: Cloud, level: 75 },
    { name: 'CI/CD', icon: GitBranch, level: 70 },
    { name: 'Data Science', icon: Database, level: 85 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Passionate AI/ML Engineer
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I am a recent graduate with a Bachelor's degree in AI & ML Engineering from P.A. College of Engineering. 
              My passion lies in developing sustainable technology solutions that make a positive impact on the world.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              With expertise in Python, Machine Learning, and DevOps pipelines, I focus on building scalable 
              applications that solve real-world problems. My journey in AI/ML has equipped me with both 
              theoretical knowledge and practical experience in developing intelligent systems.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm particularly interested in sustainable technology, data science, and creating solutions that 
              bridge the gap between cutting-edge AI research and practical business applications.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Technical Skills
            </h3>
            
            <div className="grid gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-blue-600 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
