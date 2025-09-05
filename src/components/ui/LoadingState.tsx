'use client'

import { motion } from 'framer-motion'
import { useResponsiveAnimations } from '@/hooks/useResponsiveAnimations'
import Skeleton, { SkeletonText, SkeletonCard } from '@/components/ui/Skeleton'

interface LoadingStateProps {
  variant?: 'page' | 'section' | 'component' | 'card' | 'hero' | 'navigation'
  className?: string
}

const LoadingState = ({ variant = 'component', className = '' }: LoadingStateProps) => {
  const { shouldUseReducedAnimations, getAnimationDuration } = useResponsiveAnimations()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: getAnimationDuration(0.3),
        staggerChildren: shouldUseReducedAnimations ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldUseReducedAnimations ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: getAnimationDuration(0.4) }
    }
  }

  const renderLoadingContent = () => {
    switch (variant) {
      case 'page':
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
            {/* Hero Section Skeleton */}
            <div className="container mx-auto px-6 pt-20 pb-12">
              <div className="text-center space-y-6">
                <Skeleton variant="text" width="60%" height="3rem" className="mx-auto" />
                <Skeleton variant="text" width="40%" height="1.5rem" className="mx-auto" />
                <SkeletonText lines={3} className="max-w-2xl mx-auto mt-6" />
              </div>
            </div>
            
            {/* Content Sections */}
            <div className="container mx-auto px-6 space-y-20">
              {Array.from({ length: 3 }, (_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SkeletonCard className="bg-white/5 backdrop-blur-sm rounded-2xl" />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'hero':
        return (
          <div className="relative min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6 max-w-4xl mx-auto px-6">
              <motion.div variants={itemVariants}>
                <Skeleton variant="circular" width="120px" height="120px" className="mx-auto mb-8" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Skeleton variant="text" width="70%" height="4rem" className="mx-auto" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Skeleton variant="text" width="50%" height="2rem" className="mx-auto" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <SkeletonText lines={3} className="max-w-2xl mx-auto" />
              </motion.div>
            </div>
          </div>
        )

      case 'navigation':
        return (
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
            <div className="flex flex-col gap-2 p-4 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Skeleton variant="rounded" width="48px" height="48px" />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'section':
        return (
          <div className="py-20">
            <div className="container mx-auto px-6">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <Skeleton variant="text" width="40%" height="3rem" className="mx-auto mb-4" />
                <SkeletonText lines={2} className="max-w-2xl mx-auto" />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }, (_, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <SkeletonCard className="bg-white/5 backdrop-blur-sm rounded-xl" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'card':
        return (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <motion.div variants={itemVariants}>
              <Skeleton variant="rounded" width="100%" height="200px" className="mb-4" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Skeleton variant="text" width="80%" className="mb-2" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SkeletonText lines={3} />
            </motion.div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <Skeleton variant="text" width="60%" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SkeletonText lines={2} />
            </motion.div>
          </div>
        )
    }
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderLoadingContent()}
    </motion.div>
  )
}

// Specialized loading components
export const PageLoader = ({ className }: { className?: string }) => (
  <LoadingState variant="page" className={className} />
)

export const HeroLoader = ({ className }: { className?: string }) => (
  <LoadingState variant="hero" className={className} />
)

export const SectionLoader = ({ className }: { className?: string }) => (
  <LoadingState variant="section" className={className} />
)

export const CardLoader = ({ className }: { className?: string }) => (
  <LoadingState variant="card" className={className} />
)

export const NavigationLoader = ({ className }: { className?: string }) => (
  <LoadingState variant="navigation" className={className} />
)

export default LoadingState