'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'Engineering',
    description: 'Full-stack systems built for scale. We architect solutions that handle real-world complexity without compromising on performance or maintainability.',
  },
  {
    number: '02',
    title: 'Mobile',
    description: 'Cross-platform applications that feel native. Flutter expertise combined with deep platform knowledge for experiences users actually want to use.',
  },
  {
    number: '03',
    title: 'Interactive',
    description: 'WebGL, real-time graphics, and immersive experiences. We push browser capabilities to create digital environments that captivate.',
  },
  {
    number: '04',
    title: 'Architecture',
    description: 'System design for the long term. Microservices, data pipelines, and infrastructure that scales with your ambitions.',
  }
]

function ServiceItem({ service, index }: { service: typeof services[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 60, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 border-b group"
      style={{ borderColor: 'color-mix(in srgb, var(--color-secondary) 15%, transparent)' }}
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Number */}
        <div className="md:col-span-2">
          <span 
            className="font-display text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {service.number}
          </span>
        </div>

        {/* Title */}
        <div className="md:col-span-3">
          <h3 
            className="font-display text-2xl md:text-3xl transition-colors duration-300 group-hover:text-[var(--color-primary)]"
            style={{ color: 'var(--color-text)' }}
          >
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <div className="md:col-span-7">
          <p 
            className="leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ y: 40, opacity: 0 }}
          animate={isHeaderInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
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
              CAPABILITIES
            </span>
          </div>
          
          <h2 
            className="font-display text-4xl md:text-5xl lg:text-6xl max-w-3xl"
            style={{ color: 'var(--color-text)' }}
          >
            What We Do
          </h2>
        </motion.div>

        {/* Services list */}
        <div>
          {services.map((service, index) => (
            <ServiceItem key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
