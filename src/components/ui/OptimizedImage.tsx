'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import { motion } from 'framer-motion'
import { useResponsiveAnimations } from '@/hooks/useResponsiveAnimations'

interface OptimizedImageProps extends Omit<ImageProps, 'loading'> {
  showSkeleton?: boolean
  skeletonClassName?: string
  priority?: boolean
}

const OptimizedImage = ({ 
  src, 
  alt, 
  showSkeleton = true, 
  skeletonClassName = '', 
  priority = false,
  className = '',
  fill,
  ...props 
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { shouldUseReducedAnimations, getAnimationDuration } = useResponsiveAnimations()

  // Reset states when src changes
  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    setIsError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setIsError(true)
  }

  // If using fill, we need different container styling
  const containerClass = fill 
    ? `relative ${className}` 
    : `relative overflow-hidden ${className}`

  return (
    <div className={containerClass}>
      {/* Skeleton loader */}
      {showSkeleton && isLoading && (
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-full ${skeletonClassName}`}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer rounded-full" />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full">
          <div className="text-center">
            <div className="text-2xl mb-2">�</div>
            <div className="text-sm">Profile unavailable</div>
          </div>
        </div>
      )}

      {/* Optimized Image */}
      <motion.div
        className={fill ? "absolute inset-0" : ""}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ 
          duration: shouldUseReducedAnimations ? 0.2 : getAnimationDuration(0.5),
          ease: 'easeOut'
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          loading={priority ? undefined : 'lazy'}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          quality={85}
          className={className}
          sizes={fill ? "(max-width: 768px) 160px, 160px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          {...props}
        />
      </motion.div>
    </div>
  )
}

export default OptimizedImage

// Utility hook for responsive image sizes
export const useResponsiveImageSizes = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 768) setScreenSize('mobile')
      else if (width < 1200) setScreenSize('tablet')
      else setScreenSize('desktop')
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  return {
    screenSize,
    getImageSizes: (sizes?: string) => {
      if (sizes) return sizes
      
      switch (screenSize) {
        case 'mobile':
          return '100vw'
        case 'tablet':
          return '50vw'
        default:
          return '33vw'
      }
    }
  }
}