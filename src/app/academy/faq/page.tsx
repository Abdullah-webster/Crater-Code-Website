'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'What makes Crater Code different?',
    answer: 'Crater Code stands out through its combination of industry-expert mentorship, hands-on project-based learning, and a supportive community. We focus on practical skills that directly apply to real-world development, ensuring you\'re job-ready upon completion.'
  },
  {
    id: '2',
    question: 'Do I need prior experience to enroll?',
    answer: 'No prior experience is required! We offer courses for all levels - from complete beginners to advanced developers. Each course is designed with clear prerequisites, so you can choose the right starting point for your skill level.'
  },
  {
    id: '3',
    question: 'How are the courses delivered?',
    answer: 'Our courses are delivered through a mix of video lectures, live sessions, interactive coding exercises, and real-world projects. You\'ll have access to course materials 24/7, allowing you to learn at your own pace while maintaining structured milestones.'
  },
  {
    id: '4',
    question: 'Will I get support after course completion?',
    answer: 'Absolutely! We provide ongoing support through our exclusive community, access to mentors, and career guidance. You\'ll also receive job placement assistance and interview preparation to help you land your next opportunity.'
  },
  {
    id: '5',
    question: 'Can I switch tracks after enrolling?',
    answer: 'Yes, you can switch tracks within the first two weeks of enrollment. We understand that learning preferences may change, and we want to ensure you\'re in the right program for your goals. Contact our support team for assistance.'
  },
]

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AcademyNavbar />
      
      <main className="pt-32 pb-20 px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-6 text-white"
          >
            Frequently Asked Questions
          </h1>
          
          <p 
            className="text-base sm:text-lg md:text-xl tracking-wide text-gray-400"
          >
            Quick answers to the most common questions about Crater Code courses, mentorship, and learning experience.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              className="rounded-xl overflow-hidden transition-all duration-300 bg-gray-900 border border-gray-700"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpand(item.id)}
                className={`w-full px-6 py-5 flex items-center justify-between transition-all duration-300 hover:bg-gray-800 ${
                  expandedId === item.id ? 'bg-gray-800' : ''
                }`}
              >
                <h3 
                  className="text-lg font-light tracking-wide text-left text-white"
                >
                  {item.question}
                </h3>
                
                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer Content */}
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-6 py-5 border-t border-gray-700"
                    >
                      <p 
                        className="text-base tracking-wide leading-relaxed text-gray-400"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <p 
            className="text-lg tracking-wide mb-6 text-gray-400"
          >
            Didn't find your answer?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-lg font-light tracking-wide text-sm transition-all duration-300 bg-white text-black border border-white hover:bg-transparent hover:text-white"
          >
            CONTACT US
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}
