'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #1a1a2e 0%, #0a0a0a 70%)' }}
      />

      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-8">
                Let's Build Something Extraordinary
              </h1>
              
              <p className="text-lg text-gray-400 mb-12">
                Ready to transform your vision into reality? We'd love to hear about 
                your project and explore how we can help you achieve your goals.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm tracking-wider text-gray-500 mb-2">EMAIL</h3>
                  <a 
                    href="mailto:hello@cratercode.com" 
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    hello@cratercode.com
                  </a>
                </div>
                
                <div>
                  <h3 className="text-sm tracking-wider text-gray-500 mb-2">RESPONSE TIME</h3>
                  <p className="text-gray-300">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-wider text-gray-500 mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:border-gray-400 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm tracking-wider text-gray-500 mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-gray-700 py-3 text-white placeholder-gray-600 focus:border-gray-400 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm tracking-wider text-gray-500 mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-700 rounded p-4 text-white placeholder-gray-600 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium tracking-wider hover:bg-gray-200 transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}