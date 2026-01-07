'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getFeaturedProjects } from '@/config/projects.config'
import ProjectPreview from '@/components/projects/ProjectPreview'
import { useDeviceCapabilities, useIsVisible, useTabVisible } from '@/hooks/useDeviceCapabilities'

export default function ProjectOrbit() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const projects = getFeaturedProjects()
  const currentProject = projects[currentIndex]
  
  // Device capabilities for adaptive rendering
  const capabilities = useDeviceCapabilities()
  const isVisible = useIsVisible(sectionRef, '200px')
  const isTabVisible = useTabVisible()

  // Only auto-advance when visible and tab is active
  const shouldAutoAdvance = isVisible && isTabVisible && !capabilities.prefersReducedMotion

  // Clear interval helper
  const clearAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Auto-advance with visibility awareness
  useEffect(() => {
    if (projects.length <= 1 || !shouldAutoAdvance) {
      clearAutoAdvance()
      return
    }
    
    // Longer interval on mobile for better UX
    const advanceInterval = capabilities.isMobile ? 10000 : 8000
    
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % projects.length)
        setIsTransitioning(false)
      }, capabilities.isMobile ? 400 : 600)
    }, advanceInterval)

    return clearAutoAdvance
  }, [projects.length, shouldAutoAdvance, capabilities.isMobile, clearAutoAdvance])

  const goToProject = useCallback((index: number) => {
    if (index === currentIndex || isTransitioning) return
    clearAutoAdvance()
    
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, capabilities.isMobile ? 400 : 600)
  }, [currentIndex, isTransitioning, capabilities.isMobile, clearAutoAdvance])

  if (projects.length === 0) return null

  // Animation variants based on device
  const contentVariants = {
    initial: { 
      opacity: 0, 
      y: capabilities.isMobile ? 20 : 0,
      scale: capabilities.isMobile ? 1 : 0.95
    },
    animate: { 
      opacity: isTransitioning ? 0.5 : 1, 
      y: 0,
      scale: 1
    },
    exit: { 
      opacity: 0, 
      y: capabilities.isMobile ? -20 : 0,
      scale: capabilities.isMobile ? 1 : 0.9
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-40 px-4 md:px-6 overflow-hidden"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-8 md:mb-16"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div 
            className="w-8 md:w-12 h-px" 
            style={{ backgroundColor: 'var(--color-secondary)' }} 
          />
          <p 
            className="text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em]" 
            style={{ color: 'var(--color-text-muted)' }}
          >
            SELECTED WORK
          </p>
        </div>
      </motion.div>

      {/* Main project display */}
      <div className="max-w-7xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ 
              duration: capabilities.isMobile ? 0.4 : 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center"
          >
            {/* Info - Order changes on mobile */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <div>
                <span 
                  className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] block mb-2 md:mb-3" 
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {currentProject.category.toUpperCase()}
                </span>
                <h2 
                  className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] md:leading-[0.95] mb-2 md:mb-4" 
                  style={{ color: 'var(--color-text)' }}
                >
                  {currentProject.name}
                </h2>
                <p 
                  className="text-xs md:text-sm tracking-wide mb-2 md:mb-4" 
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {currentProject.tagline}
                </p>
              </div>

              {/* Description - truncated on mobile */}
              <p 
                className="text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none" 
                style={{ color: 'var(--color-text-muted)' }}
              >
                {currentProject.description}
              </p>

              {/* Tech tags - fewer on mobile */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {currentProject.tech.slice(0, capabilities.isMobile ? 3 : 4).map(t => (
                  <span
                    key={t}
                    className="px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs tracking-wider border"
                    style={{ 
                      color: 'var(--color-text-muted)',
                      borderColor: 'color-mix(in srgb, var(--color-secondary) 30%, transparent)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href={`/projects#${currentProject.id}`}
                className="inline-flex items-center gap-3 md:gap-4 text-xs md:text-sm tracking-wider group pt-2 md:pt-4"
                style={{ color: 'var(--color-text)' }}
              >
                VIEW PROJECT
                <span 
                  className="w-6 md:w-8 h-px transition-all duration-500 group-hover:w-10 md:group-hover:w-14" 
                  style={{ backgroundColor: 'var(--color-primary)' }} 
                />
              </Link>
            </div>

            {/* Preview - Order changes on mobile */}
            <div className="relative order-1 lg:order-2">
              <ProjectPreview 
                project={currentProject} 
                isActive={!isTransitioning && isVisible}
                size={capabilities.isMobile ? 'medium' : 'large'}
              />
              
              {/* Year badge */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4">
                <span 
                  className="text-[10px] md:text-xs tracking-wider" 
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {currentProject.year}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 md:mt-12 lg:mt-16">
          {/* Indicators - larger touch targets on mobile */}
          <div className="flex items-center gap-2 md:gap-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className="relative group p-1 md:p-0"
                aria-label={`Go to project ${index + 1}`}
              >
                <div 
                  className="w-8 md:w-10 h-1 md:h-[2px] transition-all duration-500"
                  style={{ 
                    backgroundColor: index === currentIndex 
                      ? 'var(--color-primary)' 
                      : 'color-mix(in srgb, var(--color-secondary) 30%, transparent)'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Counter & link */}
          <div className="flex items-center gap-4 md:gap-8">
            <span 
              className="font-display text-xs md:text-sm" 
              style={{ color: 'var(--color-text-muted)' }}
            >
              {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <Link
              href="/projects"
              className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] transition-colors hover:text-[var(--color-text)]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ALL PROJECTS →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}