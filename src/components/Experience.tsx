'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building2 } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Software Developer Intern',
      company: 'Accenture UK',
      location: 'Remote',
      period: 'March 2025',
      type: 'Virtual Internship',
      description: 'Currently participating in a virtual software development internship focusing on modern web technologies and enterprise-level application development.',
      achievements: [
        'Working on full-stack web development projects',
        'Learning enterprise software development practices',
        'Collaborating with international development teams',
        'Gaining experience in agile development methodologies'
      ],
      tech: ['React', 'Node.js', 'TypeScript', 'Cloud Computing'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'AI DevOps Intern',
      company: 'Rooman Technology x NASSCOM',
      location: 'Remote',
      period: 'September 2024 – February 2025',
      type: 'Virtual Internship',
      description: 'Specialized in AI/ML operations and deployment pipelines, focusing on containerization, CI/CD, and scalable ML infrastructure.',
      achievements: [
        'Developed automated ML model deployment pipelines using Docker and Kubernetes',
        'Implemented CI/CD workflows for machine learning projects',
        'Created monitoring and logging systems for AI applications',
        'Optimized model serving infrastructure for better performance',
        'Collaborated on cloud-native AI solutions using AWS and Azure'
      ],
      tech: ['Docker', 'Kubernetes', 'Jenkins', 'MLflow', 'AWS', 'Python'],
      color: 'from-blue-500 to-cyan-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey includes virtual internships and hands-on experience 
            in AI/ML development and DevOps practices.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className={`relative ${index % 2 === 0 ? 'lg:ml-0' : 'lg:ml-12'}`}
            >
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* Timeline Dot */}
              <div className="hidden lg:block absolute left-4 top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900"></div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 lg:ml-16 shadow-lg">
                {/* Header */}
                <div className={`h-24 bg-gradient-to-r ${exp.color} rounded-lg mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative h-full flex items-center justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {exp.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-white/90 text-sm mb-1">
                        <Building2 size={16} className="mr-1" />
                        {exp.company}
                      </div>
                      <div className="flex items-center text-white/80 text-xs">
                        <MapPin size={14} className="mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Period */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-4">
                      <Calendar size={20} className="mr-2" />
                      <span className="font-semibold">{exp.period}</span>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description & Achievements */}
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: achievementIndex * 0.1 }}
                            className="flex items-start text-gray-600 dark:text-gray-300"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm actively seeking full-time opportunities in AI/ML Engineering, 
              Software Development, and DevOps roles where I can contribute my skills 
              and continue growing as a professional.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:mohdadilsiraju@gmail.com"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Let's Connect
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
