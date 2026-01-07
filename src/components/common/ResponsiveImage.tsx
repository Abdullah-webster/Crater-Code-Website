'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities'

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  quality?: number
  sizes?: string
}

/**
 * Optimized responsive image component
 * - Automatically adjusts quality based on device
 * - Lazy loads by default
 * - Uses WebP/AVIF when supported
 */
export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality,
  sizes = '100vw',
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const capabilities = useDeviceCapabilities()
  
  // Adjust quality based on device
  const imageQuality = quality || (capabilities.isMobile ? 70 : 80)
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={imageQuality}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: 'var(--color-surface)' }}
        />
      )}
    </div>
  )
}
