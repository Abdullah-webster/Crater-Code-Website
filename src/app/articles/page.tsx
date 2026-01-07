'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

const articles = [
  {
    id: 'engineering-for-scale',
    title: 'Engineering for Scale: Lessons from Building Production Systems',
    excerpt: 'What we learned building systems that handle millions of requests. The patterns that work, the abstractions that fail, and why simplicity always wins.',
    category: 'Engineering',
    readTime: '8 min',
    date: 'December 2024'
  },
  {
    id: 'flutter-architecture',
    title: 'Flutter Architecture Patterns for Complex Applications',
    excerpt: 'Moving beyond tutorials. How we structure Flutter applications for maintainability, testability, and team collaboration at scale.',
    category: 'Mobile',
    readTime: '12 min',
    date: 'November 2024'
  },
  {
    id: 'real-time-systems',
    title: 'Building Real-Time Systems That Actually Work',
    excerpt: 'WebSockets, event sourcing, and the infrastructure decisions that determine whether your real-time features survive production.',
    category: 'Architecture',
    readTime: '10 min',
    date: 'October 2024'
  },
  {
    id: 'design-engineering',
    title: 'The Case for Design Engineering',
    excerpt: 'Why the boundary between design and engineering is artificial, and how we build teams that ship better products faster.',
    category: 'Process',
    readTime: '6 min',
    date: 'September 2024'
  }
]

function ArticleCard({ article, index }: { article: typeof articles[0], index: number }) {
  return (
    <div className="group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs text-gray-500 tracking-wider">{article.category.toUpperCase()}</span>
        <span className="text-xs text-gray-600">•</span>
        <span className="text-xs text-gray-500">{article.readTime}</span>
        <span className="text-xs text-gray-600">•</span>
        <span className="text-xs text-gray-500">{article.date}</span>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
        {article.title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed mb-4">
        {article.excerpt}
      </p>
      
      <Link
        href={`/articles/${article.id}`}
        className="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
      >
        READ ARTICLE
        <span className="w-4 h-px bg-gray-500 group-hover:w-6 transition-all" />
      </Link>
    </div>
  )
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
      />

      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gray-500" />
              <span className="text-xs tracking-[0.4em] text-gray-500">INSIGHTS</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-6">
              Articles
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl">
              Technical insights, lessons learned, and thoughts on building 
              software that matters. Written by our engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              More articles coming soon. Follow us for updates.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}