'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'
import { courseService, Course } from '@/services/courseService'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

export default function CoursesPage() {
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    const result = await courseService.getCourses()
    if (result.success) {
      setCourses(result.courses)
    }
    setLoading(false)
  }

  const handleCourseClick = (course: Course) => {
    router.push(`/academy/courses/${course.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AcademyNavbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading courses...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <AcademyNavbar />
        
        <main className="pt-32 pb-20 px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-7xl mx-auto mb-12 text-center"
          >
            <h1 
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-4 text-white"
            >
              Our Courses
            </h1>
            <p 
              className="text-base sm:text-lg md:text-xl tracking-wide text-gray-400"
            >
              Explore our comprehensive technology courses
            </p>
          </motion.div>

          {/* Courses by Category */}
          <div className="max-w-7xl mx-auto">
            {courses.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-lg tracking-wide text-gray-400">
                  No courses available at the moment. Check back soon!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {['App', 'Web', 'Cross Platform', 'Artificial Intelligence'].map((category) => {
                  const categoryCourses = courses.filter(course => course.category === category)
                  if (categoryCourses.length === 0) return null
                  
                  return (
                    <motion.div 
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 
                        className="text-3xl font-light tracking-wide mb-8 text-white"
                      >
                        {category} Development
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryCourses.map((course, index) => (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={() => handleCourseClick(course)}
                            className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-900 border border-gray-700 hover:border-white"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <span 
                                className="px-3 py-1 rounded-full text-xs tracking-wider font-light bg-gray-800 text-white"
                              >
                                {course.category}
                              </span>
                              <span 
                                className="px-3 py-1 rounded-full text-xs tracking-wider font-light bg-gray-800 text-gray-400"
                              >
                                {course.level}
                              </span>
                            </div>
                            
                            <h3 
                              className="text-xl font-light tracking-wide mb-3 text-white"
                            >
                              {course.name}
                            </h3>
                            
                            <p 
                              className="text-sm leading-relaxed mb-4 line-clamp-3 text-gray-400"
                            >
                              {course.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span 
                                className="text-sm font-light text-gray-400"
                              >
                                Duration: {course.duration}
                              </span>
                              <span 
                                className="text-sm font-light text-white"
                              >
                                Learn More →
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
      <FloatingSettingsButton />
    </>
  )
}