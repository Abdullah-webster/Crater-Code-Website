'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectConfig } from '@/config/projects.config'
import { useDeviceCapabilities, useIsVisible, useTabVisible } from '@/hooks/useDeviceCapabilities'

interface ProjectPreviewProps {
  project: ProjectConfig
  isActive?: boolean
  size?: 'small' | 'medium' | 'large'
}

// Storyboard Preview - animates through UI states with mobile optimization
function StoryboardPreview({ 
  project, 
  isActive, 
  isMobile,
  reducedMotion 
}: { 
  project: ProjectConfig
  isActive: boolean
  isMobile: boolean
  reducedMotion: boolean
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = project.preview.storyboard?.steps || []
  // Slower interval on mobile for better readability
  const interval = isMobile 
    ? (project.preview.storyboard?.interval || 3000) * 1.5 
    : (project.preview.storyboard?.interval || 3000)

  useEffect(() => {
    if (!isActive || steps.length === 0 || reducedMotion) return
    
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isActive, steps.length, interval, reducedMotion])

  if (steps.length === 0) {
    return <StaticPreview color={project.preview.fallbackColor} />
  }

  const step = steps[currentStep]

  // Reduced motion: show static with step indicator only
  if (reducedMotion) {
    return (
      <div 
        className="relative w-full h-full flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: step.color }}
      >
        <div className="text-center">
          {'icon' in step && step.icon && (
            <div className="text-2xl mb-2 opacity-80">{step.icon}</div>
          )}
          <h4 className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            {step.title}
          </h4>
          <p className="text-xs opacity-50 mt-1" style={{ color: 'var(--color-text)' }}>
            {step.description}
          </p>
        </div>
        {/* Step indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: i === currentStep ? 'var(--color-primary)' : 'var(--color-secondary)',
                opacity: i === currentStep ? 1 : 0.3
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isMobile ? -10 : -20 }}
          transition={{ 
            duration: isMobile ? 0.4 : 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: step.color }}
        >
          {/* Simulated UI - scales based on container */}
          <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-[180px] md:max-w-[200px] space-y-2 md:space-y-3">
              {/* Icon */}
              {'icon' in step && step.icon && (
                <div className="text-2xl md:text-3xl mb-1 md:mb-2 opacity-80">{step.icon}</div>
              )}
              
              {/* Header bar */}
              <div 
                className="h-1.5 md:h-2 rounded-full opacity-30" 
                style={{ backgroundColor: 'var(--color-text)', width: '60%' }} 
              />
              
              {/* Title */}
              <h4 
                className="text-xs md:text-sm font-medium tracking-wide"
                style={{ color: 'var(--color-text)' }}
              >
                {step.title}
              </h4>
              
              {/* Content blocks - fewer on mobile */}
              <div className="space-y-1.5 md:space-y-2 pt-1 md:pt-2">
                <div 
                  className="h-6 md:h-8 rounded opacity-20" 
                  style={{ backgroundColor: 'var(--color-text)' }} 
                />
                <div 
                  className="h-6 md:h-8 rounded opacity-15" 
                  style={{ backgroundColor: 'var(--color-text)', width: '80%' }} 
                />
                {!isMobile && (
                  <div 
                    className="h-8 rounded opacity-10" 
                    style={{ backgroundColor: 'var(--color-text)', width: '60%' }} 
                  />
                )}
              </div>
              
              {/* Description */}
              <p 
                className="text-[10px] md:text-xs opacity-50 pt-1 md:pt-2"
                style={{ color: 'var(--color-text)' }}
              >
                {step.description}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step indicators */}
      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex gap-1 md:gap-1.5">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentStep(i)}
            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 hover:scale-125"
            style={{
              backgroundColor: i === currentStep ? 'var(--color-primary)' : 'var(--color-secondary)',
              opacity: i === currentStep ? 1 : 0.3
            }}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Iframe Preview - with proper scaling and lazy loading
function IframePreview({ 
  project, 
  isActive,
  isVisible,
  isMobile 
}: { 
  project: ProjectConfig
  isActive: boolean
  isVisible: boolean
  isMobile: boolean
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Only load iframe when visible AND active (performance)
  const shouldLoad = isActive && isVisible

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
  }, [])

  // Reset state when project changes
  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [project.id])

  if (error) {
    return <StaticPreview color={project.preview.fallbackColor} />
  }

  if (!shouldLoad) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: project.preview.fallbackColor || 'var(--color-surface)' }}
      >
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full opacity-20" style={{ backgroundColor: 'var(--color-text)' }} />
          <p className="text-xs opacity-40" style={{ color: 'var(--color-text)' }}>Preview</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: project.preview.fallbackColor || 'var(--color-surface)' }}
    >
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div 
            className="w-5 h-5 md:w-6 md:h-6 border-2 border-t-transparent rounded-full animate-spin" 
            style={{ borderColor: 'var(--color-secondary)' }} 
          />
        </div>
      )}
      
      {/* Iframe with proper scaling */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          // Scale iframe content to fit container while maintaining aspect ratio
          transform: isMobile ? 'scale(0.85)' : 'scale(1)',
          transformOrigin: 'center center'
        }}
      >
        <iframe
          ref={iframeRef}
          src={project.preview.url}
          className="w-full h-full border-0 rounded-sm"
          style={{ 
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          title={`${project.name} preview`}
          // Prevent scroll and interaction bleed
          scrolling="no"
        />
      </div>
    </div>
  )
}

// Static Preview - fallback with subtle animation
function StaticPreview({ color }: { color?: string }) {
  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{ backgroundColor: color || 'var(--color-surface)' }}
    >
      <div className="text-center">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-full opacity-20" 
          style={{ backgroundColor: 'var(--color-text)' }} 
        />
        <p className="text-xs opacity-30 mt-2" style={{ color: 'var(--color-text)' }}>
          Preview
        </p>
      </div>
    </div>
  )
}

export default function ProjectPreview({ 
  project, 
  isActive = true, 
  size = 'medium' 
}: ProjectPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const capabilities = useDeviceCapabilities()
  const isVisible = useIsVisible(containerRef)
  const isTabVisible = useTabVisible()

  // Pause animations when tab is not visible
  const shouldAnimate = isActive && isTabVisible

  // Responsive aspect ratios
  const aspectRatios = {
    small: capabilities.isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]',
    medium: capabilities.isMobile ? 'aspect-[4/3]' : 'aspect-[16/10]',
    large: capabilities.isMobile ? 'aspect-[4/3]' : 'aspect-[16/9]'
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm md:rounded ${aspectRatios[size]}`}
      style={{ 
        border: '1px solid color-mix(in srgb, var(--color-secondary) 15%, transparent)',
        // Ensure content fits without overflow
        contain: 'layout paint'
      }}
    >
      {project.preview.strategy === 'storyboard' && (
        <StoryboardPreview 
          project={project} 
          isActive={shouldAnimate}
          isMobile={capabilities.isMobile}
          reducedMotion={capabilities.prefersReducedMotion}
        />
      )}
      {project.preview.strategy === 'iframe' && (
        <IframePreview 
          project={project} 
          isActive={shouldAnimate}
          isVisible={isVisible}
          isMobile={capabilities.isMobile}
        />
      )}
      {project.preview.strategy === 'static' && (
        <StaticPreview color={project.preview.fallbackColor} />
      )}
    </div>
  )
}