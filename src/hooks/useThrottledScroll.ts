'use client'

import { useEffect, useState, useRef } from 'react'

/**
 * Throttled scroll hook that limits updates to target FPS
 * Prevents frame drops during scroll by batching updates
 */
export function useThrottledScroll(targetFPS: number = 30) {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastUpdateRef = useRef(0)
  const frameTime = 1000 / targetFPS // ms per frame

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
          const now = performance.now()
          
          // Throttle to target FPS
          if (now - lastUpdateRef.current >= frameTime) {
            setScrollY(window.scrollY)
            lastUpdateRef.current = now
          }
          
          ticking = false
        })
      }
    }

    // Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Set initial value
    setScrollY(window.scrollY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [frameTime])

  return scrollY
}

/**
 * Optimized scroll progress hook with throttling
 */
export function useScrollProgress(targetFPS: number = 30) {
  const scrollY = useThrottledScroll(targetFPS)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const height = document.documentElement.scrollHeight - window.innerHeight
    const newProgress = height > 0 ? Math.min(scrollY / height, 1) : 0
    setProgress(newProgress)
  }, [scrollY])

  return progress
}
