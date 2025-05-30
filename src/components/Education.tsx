'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react'

const Education = () => {
  const education = {
    degree: 'Bachelor of Engineering in AI & ML',
    institution: 'P.A. College of Engineering',
    period: 'December 2021 – August 2025',
    cgpa: '7.17',
    status: 'Completed',
    description: 'Comprehensive program covering artificial intelligence, machine learning, data science, and software engineering principles.',
    coursework: [
      'Machine Learning Algorithms',
      'Deep Learning & Neural Networks',
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Software Engineering',
      'Computer Vision',
      'Natural Language Processing',
      'Statistics & Probability',
      'Linear Algebra',
      'Python Programming'
    ],
    projects: [
      'Final Year Project on Sustainable Investment Platform',
      'ML Model for Predictive Analytics',
      'Computer Vision Application for Object Detection',
      'NLP-based Sentiment Analysis System'
    ]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="education" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My academic foundation in AI & ML Engineering has provided me with comprehensive 
            knowledge in artificial intelligence, machine learning, and software development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Main Education Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">
                      {education.degree}
                    </h3>
                    <p className="text-white/80 text-lg">
                      {education.institution}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-white/90 mb-2">
                    <Calendar size={20} className="mr-2" />
                    <span className="font-semibold">{education.period}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Award size={20} className="mr-2" />
                    <span className="font-semibold">CGPA: {education.cgpa}</span>
                  </div>
                </div>
              </div>
              <div className="inline-block bg-green-500/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">{education.status}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <motion.div
                variants={itemVariants}
                className="mb-8"
              >
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {education.description}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Coursework */}
                <motion.div variants={itemVariants}>
                  <h4 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Key Coursework
                  </h4>
                  <div className="space-y-2">
                    {education.coursework.map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span>{course}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Academic Projects */}
                <motion.div variants={itemVariants}>
                  <h4 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Academic Projects
                  </h4>
                  <div className="space-y-3">
                    {education.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg"
                      >
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">{project}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Skills Developed */}
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Skills Developed
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Problem Solving',
                    'Algorithm Design',
                    'Data Analysis',
                    'Model Development',
                    'Research Methodology',
                    'Technical Writing',
                    'Team Collaboration',
                    'Project Management'
                  ].map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Additional Academic Achievements */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6"
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Academic Highlights
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  4
                </div>
                <p className="text-gray-600 dark:text-gray-300">Years of Study</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  7.17
                </div>
                <p className="text-gray-600 dark:text-gray-300">CGPA</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  10+
                </div>
                <p className="text-gray-600 dark:text-gray-300">Core Subjects</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
