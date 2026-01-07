'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

const courses = [
  { 
    title: 'Web Development',
    description: 'Master modern web technologies',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M2 17h20" />
        <path d="M6 20h12" />
        <path d="M9 17v3" />
        <path d="M15 17v3" />
      </svg>
    )
  },
  { 
    title: 'App Development',
    description: 'Build powerful mobile applications',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
      </svg>
    )
  },
  { 
    title: 'Cross-Platform',
    description: 'Deploy everywhere seamlessly',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="1" />
        <path d="M12 1v6" />
        <path d="M12 17v6" />
        <path d="M4.22 4.22l4.24 4.24" />
        <path d="M15.54 15.54l4.24 4.24" />
        <path d="M1 12h6" />
        <path d="M17 12h6" />
        <path d="M4.22 19.78l4.24-4.24" />
        <path d="M15.54 8.46l4.24-4.24" />
      </svg>
    )
  },
  { 
    title: 'AI',
    description: 'Harness artificial intelligence',
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10" />
        <path d="M8 12h8" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    )
  },
]

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <AcademyNavbar />
      
      <main className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-8 text-white"
          >
            Develop with Impact
          </h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-3xl font-light tracking-wide mb-6 text-white"
          >
            The Courses That We Offer
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-base sm:text-lg md:text-xl tracking-wide leading-relaxed text-gray-400"
          >
            Level up your skills with our curated learning paths designed for modern tech careers
          </motion.p>
        </motion.div>

        {/* Course Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 + index * 0.15 }}
              whileHover={{ y: -15, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-xl p-8 transition-all duration-500 bg-gray-900 border border-gray-700 hover:border-white"
            >
              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gray-800 to-gray-900"
              />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className="mb-6 inline-flex p-4 rounded-lg transition-all duration-500 group-hover:scale-110 bg-gray-800 text-white"
                >
                  {course.icon}
                </div>
                
                {/* Title */}
                <h3 
                  className="text-xl font-light tracking-wide mb-3 transition-colors duration-300 text-white"
                >
                  {course.title}
                </h3>
                
                {/* Description */}
                <p 
                  className="text-sm tracking-wide leading-relaxed transition-colors duration-300 text-gray-400"
                >
                  {course.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span 
                    className="text-xs tracking-widest font-light text-white"
                  >
                    EXPLORE
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="flex justify-center mb-20">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/academy/courses')}
            className="px-8 py-3 rounded-lg font-light tracking-wide text-sm transition-all duration-300 bg-white text-black border border-white hover:bg-transparent hover:text-white"
          >
            VIEW ALL COURSES
          </motion.button>
        </div>

        {/* Support System Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-light tracking-wide mb-4 text-white"
            >
              You're Not Alone
            </h2>
            <p 
              className="text-lg tracking-wide text-gray-400"
            >
              Elite support system to accelerate your growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Real-Time Doubt Solving */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="p-8 rounded-2xl bg-gray-900 border border-gray-700"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-gray-800 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 8h10M7 12h10M7 16h5M3 5h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-light tracking-wide mb-3 text-white"
              >
                Real-Time Doubt Solving
              </h3>
              <p 
                className="text-sm tracking-wide leading-relaxed text-gray-400"
              >
                Get instant help when you're stuck. AI + human mentors available 24/7.
              </p>
            </motion.div>

            {/* AI-Powered Code Reviews */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="p-8 rounded-2xl bg-gray-900 border border-gray-700"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-gray-800 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-light tracking-wide mb-3 text-white"
              >
                AI-Powered Code Reviews
              </h3>
              <p 
                className="text-sm tracking-wide leading-relaxed text-gray-400"
              >
                Smart feedback on your code quality, performance, and style.
              </p>
            </motion.div>

            {/* Exclusive Community */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="p-8 rounded-2xl bg-gray-900 border border-gray-700"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-gray-800 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 
                className="text-xl font-light tracking-wide mb-3 text-white"
              >
                Exclusive Community
              </h3>
              <p 
                className="text-sm tracking-wide leading-relaxed text-gray-400"
              >
                Connect with ambitious peers, collaborate on projects, share knowledge.
              </p>
            </motion.div>

            {/* 1:1 Mentorship */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="p-8 rounded-2xl bg-gray-900 border border-gray-700"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 bg-gray-800 text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5" />
                </svg>
              </div>
              <h3 
                className="text-xl font-light tracking-wide mb-3 text-white"
              >
                1:1 Mentorship
              </h3>
              <p 
                className="text-sm tracking-wide leading-relaxed text-gray-400"
              >
                Personal guidance from industry pros who've built real products.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Ready to Join Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="max-w-4xl mx-auto text-center mt-20 py-16 px-8 rounded-2xl bg-gray-900 border border-gray-700"
        >
          <h2 
            className="text-4xl md:text-5xl font-light tracking-wide mb-4 text-white"
          >
            Ready to Join?
          </h2>
          
          <p 
            className="text-lg tracking-wide mb-10 text-gray-400"
          >
            Only dreamers and doers allowed. Prove you have what it takes.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-sm tracking-wide font-light text-white"
              >
                Personalized mentorship & accountability
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.0 }}
              className="flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-sm tracking-wide font-light text-white"
              >
                Industry-grade projects and reviews
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.1 }}
              className="flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-sm tracking-wide font-light text-white"
              >
                Career prep with mock interviews
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 3.1 }}
              className="flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span 
                className="text-sm tracking-wide font-light text-white"
              >
                Supportive global community
              </span>
            </motion.div>
          </div>

          {/* Apply Now Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-light tracking-wide text-sm transition-all duration-300 mb-6 inline-flex items-center gap-2 bg-white text-black border border-white hover:bg-transparent hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            APPLY NOW
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.3 }}
            className="text-sm tracking-wide text-gray-400"
          >
            Next session starts soon. Don't wait.
          </motion.p>
        </motion.div>
      </main>

      <Footer />
      <FloatingSettingsButton />
    </div>
  )
}


