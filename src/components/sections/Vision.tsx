'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section 
      ref={containerRef} 
      className="relative py-40 px-6"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 30%, transparent)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Statement */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div 
                className="w-12 h-px"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              />
              <span 
                className="text-xs tracking-[0.4em]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                VISION
              </span>
            </div>
            
            <h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-10"
              style={{ color: 'var(--color-text)' }}
            >
              Technology with
              <br />
              <span className="text-gradient">its own gravity</span>
            </h2>
            
            <p 
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: 'var(--color-text-muted)' }}
            >
              We don&apos;t chase trends. We build systems that matter—technology 
              that solves real problems and stands the test of time. Every project 
              is an opportunity to push boundaries.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-4 text-sm tracking-wider group"
              style={{ color: 'var(--color-text)' }}
            >
              ABOUT US
              <span 
                className="w-8 h-px transition-all duration-500 group-hover:w-14"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            </Link>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div 
              className="pb-12 border-b"
              style={{ borderColor: 'color-mix(in srgb, var(--color-secondary) 20%, transparent)' }}
            >
              <span 
                className="font-display text-6xl md:text-7xl block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                10+
              </span>
              <span 
                className="text-sm tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                PROJECTS DELIVERED
              </span>
            </div>

            <div 
              className="pb-12 border-b"
              style={{ borderColor: 'color-mix(in srgb, var(--color-secondary) 20%, transparent)' }}
            >
              <span 
                className="font-display text-6xl md:text-7xl block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                3
              </span>
              <span 
                className="text-sm tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                CO-FOUNDERS
              </span>
            </div>

            <div>
              <span 
                className="font-display text-6xl md:text-7xl block mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                ∞
              </span>
              <span 
                className="text-sm tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
              >
                AMBITION
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
