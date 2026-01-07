'use client'

import { useState, useEffect } from 'react'

export interface DeviceCapabilities {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLowPower: boolean
  prefersReducedMotion: boolean
  supportsWebGL: boolean
  connectionSpeed: 'slow' | 'medium' | 'fast'
  screenWidth: number
  pixelRatio: number
}

const defaultCapabilities: DeviceCapabilities = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLowPower: false,
  prefersReducedMotion: false,
  supportsWebGL: true,
  connectionSpeed: 'fast',
  screenWidth: 1920,
  pixelRatio: 1
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(defaultCapabilities)

  useEffect(() => {
    const detectCapabilities = (): DeviceCapabilities => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      // Detect reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Detect WebGL support
      let supportsWebGL = false
      try {
        const canvas = document.createElement('canvas')
        supportsWebGL = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
      } catch {
        supportsWebGL = false
      }

      // Detect connection speed
      let connectionSpeed: 'slow' | 'medium' | 'fast' = 'fast'
      const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
      if (connection?.effectiveType) {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          connectionSpeed = 'slow'
        } else if (connection.effectiveType === '3g') {
          connectionSpeed = 'medium'
        }
      }

      // Detect low power device (heuristic based on cores and memory)
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8
      const isLowPower = hardwareConcurrency <= 2 || deviceMemory <= 2 || isMobile

      return {
        isMobile,
        isTablet,
        isDesktop,
        isLowPower,
        prefersReducedMotion,
        supportsWebGL,
        connectionSpeed,
        screenWidth: width,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
      }
    }

    setCapabilities(detectCapabilities())

    const handleResize = () => {
      setCapabilities(detectCapabilities())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return capabilities
}

// Hook for visibility-based rendering optimization
export function useIsVisible(ref: React.RefObject<HTMLElement | null>, rootMargin = '100px'): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return isVisible
}

// Hook for tab visibility
export function useTabVisible(): boolean {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}