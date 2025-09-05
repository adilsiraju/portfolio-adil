'use client'

import { motion } from 'framer-motion'
import { useResponsiveAnimations } from '@/hooks/useResponsiveAnimations'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animate?: boolean
}

const Skeleton = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  animate = true 
}: SkeletonProps) => {
  const { shouldUseReducedAnimations } = useResponsiveAnimations()

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded'
      case 'circular':
        return 'rounded-full aspect-square'
      case 'rounded':
        return 'rounded-lg'
      default:
        return 'rounded'
    }
  }

  const getInlineStyles = () => {
    const styles: React.CSSProperties = {}
    if (width) styles.width = typeof width === 'number' ? `${width}px` : width
    if (height) styles.height = typeof height === 'number' ? `${height}px` : height
    return styles
  }

  const baseClasses = `bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${getVariantClasses()} ${className}`

  if (!animate || shouldUseReducedAnimations) {
    return (
      <div 
        className={`${baseClasses} bg-gray-300`} 
        style={getInlineStyles()}
      />
    )
  }

  return (
    <motion.div
      className={`${baseClasses} relative overflow-hidden`}
      style={getInlineStyles()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
      />
    </motion.div>
  )
}

// Predefined skeleton components for common use cases
export const SkeletonText = ({ lines = 1, className = '' }: { lines?: number; className?: string }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton 
        key={i}
        variant="text" 
        width={i === lines - 1 ? '75%' : '100%'}
      />
    ))}
  </div>
)

export const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`p-6 space-y-4 ${className}`}>
    <Skeleton variant="rounded" height="200px" />
    <Skeleton variant="text" width="60%" />
    <SkeletonText lines={2} />
  </div>
)

export const SkeletonAvatar = ({ size = 40, className = '' }: { size?: number; className?: string }) => (
  <Skeleton 
    variant="circular" 
    width={size} 
    height={size}
    className={className}
  />
)

export const SkeletonButton = ({ className = '' }: { className?: string }) => (
  <Skeleton 
    variant="rounded" 
    width="120px" 
    height="40px"
    className={className}
  />
)

export default Skeleton