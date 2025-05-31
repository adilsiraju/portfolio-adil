'use client'

import React from 'react'
import { cn } from '@/utils/cn'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    variant = 'default', 
    size = 'md', 
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const baseStyles = 'w-full rounded-full overflow-hidden'
    
    const variants = {
      default: 'bg-gray-200',
      success: 'bg-green-200',
      warning: 'bg-yellow-200',
      error: 'bg-red-200'
    }
    
    const fillVariants = {
      default: 'bg-gradient-to-r from-blue-500 to-purple-500',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500',
      warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      error: 'bg-gradient-to-r from-red-500 to-pink-500'
    }
    
    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    }

    return (
      <div className="w-full">
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
          )}
          ref={ref}
          {...props}
        >
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out',
              fillVariants[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
