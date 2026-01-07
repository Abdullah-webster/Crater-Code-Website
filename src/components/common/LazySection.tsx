'use client'

import { ReactNode, useRef } from 'react'
import { useIsVisible } from '@/hooks/useDeviceCapabilities'

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
}

/**
 * Lazy load section component
 * Only renders children when visible in viewport
 */
export default function LazySection({
  children,
  className = '',
  rootMargin = '200px',
  fallback = null,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(ref, rootMargin)
  
  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}
