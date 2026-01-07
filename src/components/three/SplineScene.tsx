'use client'

import { useState, useEffect, useCallback, memo, useRef } from 'react'
import { useDeviceCapabilities, useTabVisible } from '@/hooks/useDeviceCapabilities'

// Memoized fallback background
const FallbackBackground = memo(function FallbackBackground() {
  return (
    <div 
      className="fixed inset-0"
      style={{ 
        background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)',
        zIndex: -10
      }}
    />
  )
})

// Lazy load Spline only when needed and device can handle it
function SplineScene() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<any> | null>(null)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const capabilities = useDeviceCapabilities()
  const isTabVisible = useTabVisible()

  // Detect scrolling to pause Spline for better performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Resume after 150ms of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Ensure we're mounted before doing anything
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't load Spline on mobile, low-power devices, or when reduced motion is preferred
  const shouldLoadSpline = isMounted && 
                           !capabilities.isMobile && 
                           !capabilities.isLowPower && 
                           !capabilities.prefersReducedMotion &&
                           capabilities.supportsWebGL &&
                           capabilities.connectionSpeed !== 'slow'

  useEffect(() => {
    if (!shouldLoadSpline) {
      return
    }

    // Dynamic import to avoid SSR issues
    import('@splinetool/react-spline')
      .then(mod => setSplineComponent(() => mod.default))
      .catch(() => setHasError(true))
  }, [shouldLoadSpline])

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  // Always show fallback until mounted
  if (!isMounted) {
    return <FallbackBackground />
  }

  // Always show fallback on mobile/low-power or if there's an error
  if (!shouldLoadSpline || hasError) {
    return <FallbackBackground />
  }

  // Show fallback during scroll for better performance
  const shouldShowSpline = isLoaded && isTabVisible && !isScrolling

  return (
    <>
      {/* Always show fallback until Spline loads or during scroll */}
      {(!isLoaded || isScrolling) && <FallbackBackground />}
      
      {/* Spline container - only render when tab is visible and not scrolling */}
      {SplineComponent && shouldShowSpline && (
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -5,
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out',
            // Performance: contain layout and paint
            contain: 'strict'
          }}
        >
          <SplineComponent 
            scene="https://prod.spline.design/SwTSRg33bP22u3tX/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
          />
        </div>
      )}
      
      {/* Show fallback when tab is not visible */}
      {SplineComponent && !isTabVisible && isLoaded && <FallbackBackground />}
    </>
  )
}

export default memo(SplineScene)