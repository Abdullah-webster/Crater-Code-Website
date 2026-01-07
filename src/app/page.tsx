'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

// Lazy load components
const SplineScene = dynamic(() => import('@/components/three/SplineScene'), { 
  ssr: false,
  loading: () => (
    <div 
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
    />
  )
})

const ProjectOrbit = dynamic(() => import('@/components/sections/ProjectOrbit'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin border-white" />
    </div>
  )
})

const Services = dynamic(() => import('@/components/sections/Services'), { 
  ssr: false,
  loading: () => null
})

const Vision = dynamic(() => import('@/components/sections/Vision'), { 
  ssr: false,
  loading: () => null
})

const ThemeSettings = dynamic(() => import('@/components/settings/ThemeSettings'), { 
  ssr: false,
  loading: () => null
})

// Simple Hero without complex scroll logic
function SimpleHero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 sm:w-12 h-px bg-gray-500" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] text-gray-500">
              TECHNOLOGY STUDIO
            </span>
          </div>
        </div>

        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-8 sm:mb-12 text-white">
            We Build
            <br />
            <span className="text-gradient">What Others</span>
            <br />
            Imagine
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-12 sm:mb-16 text-gray-400">
            Elite engineering meets visionary design. We architect 
            digital experiences that transcend conventional boundaries.
          </p>

          <a
            href="/projects"
            className="group inline-flex items-center gap-4 sm:gap-6"
          >
            <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-white">
              EXPLORE WORK
            </span>
            <div className="w-10 sm:w-12 h-px transition-all duration-700 group-hover:w-16 sm:group-hover:w-20 bg-white" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <SplineScene />
      <Navbar />
      <SimpleHero />
      
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin border-white" />
        </div>
      }>
        <ProjectOrbit />
      </Suspense>
      
      <Suspense fallback={null}>
        <Services />
      </Suspense>
      
      <Suspense fallback={null}>
        <Vision />
      </Suspense>
      
      <Footer />
      
      <FloatingSettingsButton />
      <ThemeSettings />
    </main>
  )
}