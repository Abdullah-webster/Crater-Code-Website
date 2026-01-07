'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

const products = [
  {
    id: 'lms-platform',
    name: 'Learning Management System',
    tagline: 'Education, Engineered',
    description: 'A comprehensive platform for delivering, tracking, and managing educational content at scale.',
    capabilities: [
      'Course authoring and management',
      'Progress tracking and analytics',
      'Cross-platform mobile apps',
      'Offline content access'
    ],
    useCases: [
      'Educational institutions',
      'Corporate training',
      'Professional certification',
      'Skill development programs'
    ],
    tech: ['Flutter', 'Firebase', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'disaster-monitor',
    name: 'Disaster Monitoring System',
    tagline: 'Prediction. Prevention. Protection.',
    description: 'Real-time natural disaster monitoring with predictive analytics and emergency response coordination.',
    capabilities: [
      'Real-time event detection',
      'Predictive risk modeling',
      'Emergency alert distribution',
      'Resource coordination'
    ],
    useCases: [
      'Government agencies',
      'Emergency services',
      'Insurance companies',
      'Infrastructure operators'
    ],
    tech: ['Python', 'TensorFlow', 'React', 'PostgreSQL']
  },
  {
    id: 'gaming-platform',
    name: 'Gaming Community Platform',
    tagline: 'Where Gamers Connect',
    description: 'A social platform designed for gaming communities with real-time features and tournament management.',
    capabilities: [
      'Tournament management',
      'Real-time chat and voice',
      'Achievement tracking',
      'Community moderation'
    ],
    useCases: [
      'Esports organizations',
      'Gaming communities',
      'Tournament organizers',
      'Content creators'
    ],
    tech: ['React', 'Node.js', 'WebRTC', 'Redis']
  }
]

function ProductCard({ product, index }: { product: typeof products[0], index: number }) {
  return (
    <div className="group relative">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-wider text-gray-500">
              {product.tagline.toUpperCase()}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            {product.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="text-sm tracking-wider text-gray-500 mb-3">KEY CAPABILITIES</h4>
            <ul className="space-y-2">
              {product.capabilities.map((capability, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-center gap-3">
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm tracking-wider text-gray-500 mb-3">USE CASES</h4>
            <ul className="space-y-2">
              {product.useCases.map((useCase, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-center gap-3">
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm tracking-wider text-gray-500 mb-3">TECHNOLOGY</h4>
          <div className="flex flex-wrap gap-2">
            {product.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs tracking-wider border border-gray-700 text-gray-400 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/contact?product=${product.id}`}
          className="inline-flex items-center gap-3 text-xs text-gray-300 hover:text-white transition-colors"
        >
          LEARN MORE
          <span className="w-4 h-px bg-gray-500 group-hover:w-6 transition-all" />
        </Link>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
      />

      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gray-500" />
              <span className="text-xs tracking-[0.4em] text-gray-500">SOLUTIONS</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              Products
            </h1>
            
            <p className="text-lg text-gray-400 max-w-3xl">
              Purpose-built solutions for complex challenges. Each product represents 
              years of domain expertise distilled into scalable, production-ready platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center border-t border-gray-800 pt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Need a custom solution?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We also build bespoke products tailored to your specific requirements. 
              From concept to deployment, we'll work with you to create exactly what you need.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-4 text-sm tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              DISCUSS YOUR PROJECT
              <span className="w-8 h-px bg-white" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}