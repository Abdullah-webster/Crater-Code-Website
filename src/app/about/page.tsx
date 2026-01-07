'use client'

import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

const founders = [
  {
    name: 'Muhammad Abdullah Wasim',
    role: 'Co-Founder',
    bio: 'Visionary technologist with expertise in system architecture and full-stack development. Passionate about building scalable solutions that make a difference.',
    expertise: ['System Architecture', 'Full-Stack Development', 'Cloud Infrastructure'],
    image: '/ABDULLAH_IMAGE_1.jpeg'
  },
  {
    name: 'Muhammad Ali',
    role: 'Co-Founder',
    bio: 'Creative engineer specializing in interactive experiences and frontend development. Dedicated to crafting intuitive user experiences that delight.',
    expertise: ['Frontend Development', 'UI/UX Design', 'Interactive Experiences'],
    image: '/ALI_IMAGE_1.jpeg'
  },
  {
    name: 'Muhammad Shaheer Tariq',
    role: 'Co-Founder',
    bio: 'Technical innovator focused on mobile development and emerging technologies. Committed to pushing the boundaries of what\'s possible.',
    expertise: ['Mobile Development', 'Flutter/Dart', 'API Integration']
  }
]

function FounderCard({ founder }: { founder: typeof founders[0] }) {
  return (
    <div className="group">
      <div className="relative aspect-square mb-6 overflow-hidden bg-gray-900 rounded-lg">
        {founder.image ? (
          <Image
            src={founder.image}
            alt={founder.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-400">
                {founder.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{founder.name}</h3>
        <p className="text-sm tracking-wider text-gray-500 mb-4">{founder.role.toUpperCase()}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{founder.bio}</p>
        
        <div>
          <h4 className="text-xs tracking-wider text-gray-500 mb-3">EXPERTISE</h4>
          <div className="flex flex-wrap gap-2">
            {founder.expertise.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs tracking-wider border border-gray-700 text-gray-400 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
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
              <span className="text-xs tracking-[0.4em] text-gray-500">WHO WE ARE</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white mb-8">
              About Crater Code
            </h1>
            
            <div className="max-w-4xl">
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                We're a technology studio founded on the belief that exceptional software 
                comes from the intersection of technical excellence and creative vision. 
                Based in Pakistan, we work with clients worldwide to build digital products 
                that matter.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Our approach is simple: understand the problem deeply, design thoughtfully, 
                and execute flawlessly. We don't just write code—we craft solutions that 
                scale, perform, and delight users.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {founders.map((founder) => (
              <FounderCard key={founder.name} founder={founder} />
            ))}
          </div>

          <div className="mt-20 text-center border-t border-gray-800 pt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Ready to work together?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We're always excited to hear about new projects and challenges. 
              Let's discuss how we can help bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-4 text-sm tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              START A CONVERSATION
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