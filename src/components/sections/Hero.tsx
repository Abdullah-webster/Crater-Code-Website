'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useThrottledScroll } from '@/hooks/useThrottledScroll'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const scrollY = useThrottledScroll(30) // Lock to 30 FPS for smooth performance
  const [scrollProgress, setScrollProgress] = useState(0)

  // Calculate scroll progress with throttling
  useEffect(() => {
    if (!containerRef.current || shouldReduceMotion) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const containerTop = container.offsetTop
    const containerHeight = container.offsetHeight
    
    // Calculate progress (0 to 1)
    const progress = Math.max(0, Math.min(1, (scrollY - containerTop) / containerHeight))
    setScrollProgress(progress)
  }, [scrollY, shouldReduceMotion])

  // Apply transforms via CSS for better performance
  useEffect(() => {
    if (!contentRef.current || shouldReduceMotion) return

    const content = contentRef.current
    const y = scrollProgress * 30 // 30% parallax
    const opacity = Math.max(0, 1 - scrollProgress * 1.67) // Fade out by 60%
    const scale = 1 - scrollProgress * 0.05 // Scale down to 0.95

    // Use CSS transforms for GPU acceleration
    content.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`
    content.style.opacity = opacity.toString()
  }, [scrollProgress, shouldReduceMotion])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ willChange: 'auto' }} // Remove will-change to reduce GPU load
    >
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32"
        style={{ 
          willChange: shouldReduceMotion ? 'auto' : 'transform, opacity',
          transition: shouldReduceMotion ? 'none' : undefined
        }}
      >
        {/* Minimal overline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 1.5, delay: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="w-8 sm:w-12 h-px"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            />
            <span 
              className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              TECHNOLOGY STUDIO
            </span>
          </div>
        </motion.div>

        {/* Main headline - responsive sizing */}
        <div className="max-w-4xl">
          <motion.h1
            initial={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1.2, delay: shouldReduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-12"
            style={{ color: 'var(--color-text)' }}
          >
            We Build
            <br />
            <span className="text-gradient">What Others</span>
            <br />
            Imagine
          </motion.h1>

          {/* Subtext - responsive */}
          <motion.p
            initial={{ y: shouldReduceMotion ? 0 : 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: shouldReduceMotion ? 0 : 1.2 }}
            className="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-12 sm:mb-16"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Elite engineering meets visionary design. We architect 
            digital experiences that transcend conventional boundaries.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: shouldReduceMotion ? 0 : 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, delay: shouldReduceMotion ? 0 : 1.5 }}
          >
            <a
              href="/projects"
              className="group inline-flex items-center gap-4 sm:gap-6"
            >
              <span 
                className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em]"
                style={{ color: 'var(--color-text)' }}
              >
                EXPLORE WORK
              </span>
              <div 
                className="w-10 sm:w-12 h-px transition-all duration-700 group-hover:w-16 sm:group-hover:w-20"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0 : 2.5, duration: shouldReduceMotion ? 0.3 : 1 }}
          className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 hidden sm:flex"
        >
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div 
              className="w-px h-12 sm:h-16"
              style={{ 
                background: `linear-gradient(to bottom, var(--color-secondary), transparent)` 
              }}
            />
            <span 
              className="text-[10px] tracking-[0.3em] rotate-90 origin-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              SCROLL
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}