'use client'

import { useEffect, useState } from 'react'

export interface PerformanceMetrics {
  fps: number
  memory?: number
  loadTime: number
  firstPaint?: number
  firstContentfulPaint?: number
  largestContentfulPaint?: number
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    loadTime: 0,
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationFrameId: number

    // FPS monitoring
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime
        
        setMetrics(prev => ({ ...prev, fps }))
      }
      
      animationFrameId = requestAnimationFrame(measureFPS)
    }

    // Start FPS monitoring
    animationFrameId = requestAnimationFrame(measureFPS)

    // Get performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const paintEntries = performance.getEntriesByType('paint')
      
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint')?.startTime
      const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime
      
      setMetrics(prev => ({
        ...prev,
        loadTime: perfData?.loadEventEnd - perfData?.fetchStart || 0,
        firstPaint,
        firstContentfulPaint,
      }))

      // LCP observer
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number }
            setMetrics(prev => ({
              ...prev,
              largestContentfulPaint: lastEntry.renderTime || lastEntry.loadTime || 0,
            }))
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          // LCP not supported
        }
      }

      // Memory usage (Chrome only)
      if ('memory' in performance) {
        const memoryInfo = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory
        if (memoryInfo) {
          setMetrics(prev => ({
            ...prev,
            memory: Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100),
          }))
        }
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return metrics
}

/**
 * Log performance metrics to console (dev only)
 */
export function logPerformanceMetrics() {
  if (process.env.NODE_ENV !== 'development') return

  if (typeof window !== 'undefined' && 'performance' in window) {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    console.group('🚀 Performance Metrics')
    console.log('DNS Lookup:', Math.round(perfData.domainLookupEnd - perfData.domainLookupStart), 'ms')
    console.log('TCP Connection:', Math.round(perfData.connectEnd - perfData.connectStart), 'ms')
    console.log('Request Time:', Math.round(perfData.responseStart - perfData.requestStart), 'ms')
    console.log('Response Time:', Math.round(perfData.responseEnd - perfData.responseStart), 'ms')
    console.log('DOM Processing:', Math.round(perfData.domComplete - (perfData.domContentLoadedEventStart || 0)), 'ms')
    console.log('Load Complete:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms')
    console.groupEnd()
  }
}
