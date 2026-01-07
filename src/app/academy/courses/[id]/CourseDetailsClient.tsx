'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'
import { courseService, Course } from '@/services/courseService'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

export default function CourseDetailsClient() {
  const router = useRouter()
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadCourse(params.id as string)
    }
  }, [params.id])

  const loadCourse = async (courseId: string) => {
    const result = await courseService.getCourses()
    if (result.success) {
      const foundCourse = result.courses.find(c => c.id === courseId)
      setCourse(foundCourse || null)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <AcademyNavbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
            <p style={{ color: 'var(--color-text)' }}>Loading course details...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <AcademyNavbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-light mb-4" style={{ color: 'var(--color-text)' }}>
              Course Not Found
            </h1>
            <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
              The course you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/academy/courses')}
              className="px-6 py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-background)',
                border: '1px solid var(--color-primary)',
              }}
            >
              BACK TO COURSES
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <AcademyNavbar />
        
        <main className="pt-32 pb-20 px-6">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto mb-8">
            <button
              onClick={() => router.push('/academy/courses')}
              className="flex items-center gap-2 text-sm tracking-wide transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
          </div>

          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-7xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <span 
                className="px-4 py-2 rounded-full text-sm tracking-wider font-light"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                  color: 'var(--color-primary)',
                }}
              >
                {course.category}
              </span>
              <span 
                className="px-4 py-2 rounded-full text-sm tracking-wider font-light"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-text) 10%, transparent)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {course.level}
              </span>
            </div>
            
            <h1 
              className="font-display text-5xl md:text-6xl tracking-[0.2em] mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              {course.name}
            </h1>
            
            <div className="flex gap-8 mb-8">
              <div>
                <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                  Duration
                </span>
                <p className="text-lg font-light" style={{ color: 'var(--color-text)' }}>
                  {course.duration}
                </p>
              </div>
              <div>
                <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                  Level
                </span>
                <p className="text-lg font-light" style={{ color: 'var(--color-text)' }}>
                  {course.level}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Course Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mb-12"
                >
                  <h2 
                    className="text-2xl font-light tracking-wide mb-6"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Course Overview
                  </h2>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {course.description}
                  </p>
                </motion.div>

                {/* Tech Stack */}
                {course.techStack && course.techStack.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-12"
                  >
                    <h2 
                      className="text-2xl font-light tracking-wide mb-6"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Technologies You'll Learn
                    </h2>
                    <div className="space-y-6">
                      {course.techStack.map((tech, index) => (
                        <div 
                          key={tech.id}
                          className="p-6 rounded-xl"
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
                          }}
                        >
                          <h3 
                            className="text-xl font-light tracking-wide mb-3"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {tech.text}
                          </h3>
                          {tech.description && (
                            <p 
                              className="leading-relaxed"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {tech.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="sticky top-32"
                >
                  <div 
                    className="p-8 rounded-xl"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                    }}
                  >
                    <h3 
                      className="text-xl font-light tracking-wide mb-6"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Course Information
                    </h3>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                          Category
                        </span>
                        <p className="font-light" style={{ color: 'var(--color-text)' }}>
                          {course.category} Development
                        </p>
                      </div>
                      <div>
                        <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                          Duration
                        </span>
                        <p className="font-light" style={{ color: 'var(--color-text)' }}>
                          {course.duration}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                          Difficulty Level
                        </span>
                        <p className="font-light" style={{ color: 'var(--color-text)' }}>
                          {course.level}
                        </p>
                      </div>
                      {course.techStack && course.techStack.length > 0 && (
                        <div>
                          <span className="text-sm tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                            Technologies
                          </span>
                          <p className="font-light" style={{ color: 'var(--color-text)' }}>
                            {course.techStack.length} technologies covered
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => router.push(`/academy/apply?courseId=${course.id}&courseName=${encodeURIComponent(course.name)}&category=${encodeURIComponent(course.category)}`)}
                      className="w-full py-4 rounded-lg text-sm tracking-widest font-light transition-all duration-300"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-background)',
                        border: '1px solid var(--color-primary)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--color-primary)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                        e.currentTarget.style.color = 'var(--color-background)'
                      }}
                    >
                      APPLY FOR THIS COURSE
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <FloatingSettingsButton />
    </>
  )
}