'use client'

import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, Shield, Code, Database } from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: 'IBM Blockchain Essentials',
      issuer: 'IBM',
      year: '2024',
      icon: Database,
      color: 'from-blue-600 to-blue-800',
      description: 'Comprehensive understanding of blockchain technology, distributed ledgers, and cryptographic principles.',
      skills: ['Blockchain Technology', 'Distributed Systems', 'Cryptography', 'Smart Contracts'],
      credentialId: 'IBM-BC-2024-001',
      verifyLink: '#'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      issuer: 'IBM',
      year: '2024',
      icon: Code,
      color: 'from-green-600 to-green-800',
      description: 'Advanced Python programming for data analysis, visualization, and machine learning applications.',
      skills: ['Python Programming', 'Data Analysis', 'NumPy', 'Pandas', 'Matplotlib'],
      credentialId: 'IBM-PY-2024-002',
      verifyLink: '#'
    },
    {
      id: 3,
      title: 'Cisco Cybersecurity',
      issuer: 'Cisco',
      year: '2023',
      icon: Shield,
      color: 'from-red-600 to-red-800',
      description: 'Fundamentals of cybersecurity, network security, and ethical hacking principles.',
      skills: ['Network Security', 'Ethical Hacking', 'Security Protocols', 'Risk Assessment'],
      credentialId: 'CISCO-CS-2023-003',
      verifyLink: '#'
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
    <section id="certifications" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications that validate my expertise in various technologies 
            and demonstrate my commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Header */}
              <div className={`h-32 bg-gradient-to-br ${cert.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center text-white/80 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {cert.year}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-2">
                    <cert.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {cert.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Issuer */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {cert.issuer}
                    </span>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={cert.verifyLink}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    title="Verify Certificate"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    Skills Covered:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credential ID */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Continuous Learning Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Commitment to Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              I believe in staying updated with the latest technologies and industry best practices. 
              These certifications represent my dedication to professional development and my 
              commitment to delivering high-quality solutions.
            </p>
            
            {/* Learning Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  3+
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Certifications
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  100+
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Hours Studied
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  5+
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Technologies
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  2024
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Latest Cert
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Want to verify any of these certifications?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact for Verification
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
