'use client'

import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor'
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities'
import { useState } from 'react'

/**
 * Development-only performance dashboard
 * Shows real-time metrics in bottom-right corner
 */
export default function PerformanceDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const metrics = usePerformanceMonitor()
  const capabilities = useDeviceCapabilities()

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[9999] w-12 h-12 rounded-full glass flex items-center justify-center text-xs font-mono"
        style={{
          backgroundColor: metrics.fps < 30 ? '#ef4444' : metrics.fps < 50 ? '#f59e0b' : '#10b981',
          color: '#fff',
        }}
        title="Toggle Performance Dashboard"
      >
        {metrics.fps}
      </button>

      {/* Dashboard */}
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-[9999] w-80 glass rounded-lg p-4 text-xs font-mono space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm">Performance Monitor</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-theme-muted hover:text-theme"
            >
              ✕
            </button>
          </div>

          {/* FPS */}
          <div className="flex justify-between">
            <span className="text-theme-muted">FPS:</span>
            <span
              style={{
                color: metrics.fps < 30 ? '#ef4444' : metrics.fps < 50 ? '#f59e0b' : '#10b981',
              }}
            >
              {metrics.fps}
            </span>
          </div>

          {/* Memory */}
          {metrics.memory !== undefined && (
            <div className="flex justify-between">
              <span className="text-theme-muted">Memory:</span>
              <span
                style={{
                  color: metrics.memory > 80 ? '#ef4444' : metrics.memory > 60 ? '#f59e0b' : '#10b981',
                }}
              >
                {metrics.memory}%
              </span>
            </div>
          )}

          {/* Load Time */}
          <div className="flex justify-between">
            <span className="text-theme-muted">Load Time:</span>
            <span>{Math.round(metrics.loadTime)}ms</span>
          </div>

          {/* FCP */}
          {metrics.firstContentfulPaint && (
            <div className="flex justify-between">
              <span className="text-theme-muted">FCP:</span>
              <span>{Math.round(metrics.firstContentfulPaint)}ms</span>
            </div>
          )}

          {/* LCP */}
          {metrics.largestContentfulPaint && (
            <div className="flex justify-between">
              <span className="text-theme-muted">LCP:</span>
              <span
                style={{
                  color:
                    metrics.largestContentfulPaint > 4000
                      ? '#ef4444'
                      : metrics.largestContentfulPaint > 2500
                      ? '#f59e0b'
                      : '#10b981',
                }}
              >
                {Math.round(metrics.largestContentfulPaint)}ms
              </span>
            </div>
          )}

          <hr className="border-theme-muted opacity-20" />

          {/* Device Info */}
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-theme-muted">Device:</span>
              <span>
                {capabilities.isMobile ? '📱 Mobile' : capabilities.isTablet ? '📱 Tablet' : '💻 Desktop'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">Screen:</span>
              <span>{capabilities.screenWidth}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">Pixel Ratio:</span>
              <span>{capabilities.pixelRatio}x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">WebGL:</span>
              <span>{capabilities.supportsWebGL ? '✅' : '❌'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">Connection:</span>
              <span>
                {capabilities.connectionSpeed === 'fast'
                  ? '🚀 Fast'
                  : capabilities.connectionSpeed === 'medium'
                  ? '⚡ Medium'
                  : '🐌 Slow'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">Low Power:</span>
              <span>{capabilities.isLowPower ? '🔋 Yes' : '⚡ No'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-muted">Reduced Motion:</span>
              <span>{capabilities.prefersReducedMotion ? '✅' : '❌'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
