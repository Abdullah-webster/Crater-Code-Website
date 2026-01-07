'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'
import { courseService, Course } from '@/services/courseService'
import { applicationService, ApplicationCourse } from '@/services/applicationService'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

function ApplyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedCourses: [] as string[],
    questions: ''
  })

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    // Pre-select course if coming from course details page
    const courseId = searchParams.get('courseId')
    const courseName = searchParams.get('courseName')
    
    if (courseId && courseName) {
      setFormData(prev => ({
        ...prev,
        selectedCourses: [courseId]
      }))
    }
  }, [searchParams, courses])

  const loadCourses = async () => {
    const result = await courseService.getCourses()
    if (result.success) {
      setCourses(result.courses)
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCourseSelection = (courseId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(courseId)
        ? prev.selectedCourses.filter(id => id !== courseId)
        : [...prev.selectedCourses, courseId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || formData.selectedCourses.length === 0) {
      alert('Please fill in all required fields and select at least one course.')
      return
    }

    setIsSubmitting(true)

    try {
      // Convert selected course IDs to ApplicationCourse objects
      const selectedCoursesData: ApplicationCourse[] = formData.selectedCourses.map(courseId => {
        const course = courses.find(c => c.id === courseId)
        return {
          courseId: courseId,
          courseName: course?.name || 'Unknown Course',
          category: course?.category || 'Unknown Category'
        }
      })

      const applicationData = {
        name: formData.name,
        email: formData.email,
        selectedCourses: selectedCoursesData,
        questions: formData.questions
      }

      const result = await applicationService.submitApplication(applicationData)
      if (result.success) {
        alert('Application submitted successfully! We will contact you soon.')
        setFormData({
          name: '',
          email: '',
          selectedCourses: [],
          questions: ''
        })
        router.push('/academy')
      } else {
        alert('Failed to submit application: ' + result.error)
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSelectedCourseNames = () => {
    return formData.selectedCourses
      .map(courseId => courses.find(c => c.id === courseId)?.name)
      .filter(Boolean)
      .join(', ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AcademyNavbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading application form...</p>
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
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mx-auto mb-12 text-center"
          >
            <h1 
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-6 text-white"
            >
              Apply Now
            </h1>
            <p 
              className="text-base sm:text-lg md:text-xl tracking-wide text-gray-400"
            >
              Start your journey with Crater Code Academy
            </p>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="p-8 rounded-xl bg-gray-900 border border-gray-700"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border border-gray-600 text-white focus:border-white"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border border-gray-600 text-white focus:border-white"
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-6"
                    style={{ color: 'var(--color-text)' }}
                  >
                    SELECT COURSES * {formData.selectedCourses.length > 0 && (
                      <span className="ml-2 text-xs" style={{ color: 'var(--color-primary)' }}>
                        ({formData.selectedCourses.length} selected)
                      </span>
                    )}
                  </label>

                  {courses.length === 0 ? (
                    <p style={{ color: 'var(--color-text-muted)' }} className="text-center py-8">
                      No courses available at the moment
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {['App', 'Web', 'Cross Platform', 'Artificial Intelligence'].map((category) => {
                        const categoryCourses = courses.filter(course => course.category === category)
                        if (categoryCourses.length === 0) return null
                        
                        return (
                          <div key={category}>
                            <h3 
                              className="text-lg font-light tracking-wide mb-4"
                              style={{ color: 'var(--color-text)' }}
                            >
                              {category} Development
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {categoryCourses.map((course) => (
                                <div
                                  key={course.id}
                                  onClick={() => handleCourseSelection(course.id)}
                                  className="p-4 rounded-lg cursor-pointer transition-all duration-300"
                                  style={{
                                    backgroundColor: formData.selectedCourses.includes(course.id)
                                      ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                                      : 'color-mix(in srgb, var(--color-primary) 5%, transparent)',
                                    border: `1px solid ${formData.selectedCourses.includes(course.id)
                                      ? 'var(--color-primary)'
                                      : 'color-mix(in srgb, var(--color-primary) 15%, transparent)'}`,
                                  }}
                                >
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-5 h-5 rounded border-2 flex items-center justify-center"
                                      style={{
                                        borderColor: formData.selectedCourses.includes(course.id)
                                          ? 'var(--color-primary)'
                                          : 'color-mix(in srgb, var(--color-primary) 40%, transparent)',
                                        backgroundColor: formData.selectedCourses.includes(course.id)
                                          ? 'var(--color-primary)'
                                          : 'transparent',
                                      }}
                                    >
                                      {formData.selectedCourses.includes(course.id) && (
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--color-background)' }}>
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 
                                        className="font-light tracking-wide mb-1"
                                        style={{ color: 'var(--color-text)' }}
                                      >
                                        {course.name}
                                      </h4>
                                      <div className="flex gap-2 text-xs">
                                        <span style={{ color: 'var(--color-text-muted)' }}>
                                          {course.duration}
                                        </span>
                                        <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                                        <span style={{ color: 'var(--color-text-muted)' }}>
                                          {course.level}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Questions & Suggestions */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    QUESTIONS & SUGGESTIONS (OPTIONAL)
                  </label>
                  <textarea
                    name="questions"
                    value={formData.questions}
                    onChange={handleInputChange}
                    placeholder="Share any questions, suggestions, or additional information..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none resize-none"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                      color: 'var(--color-text)',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--color-primary)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                    }}
                  />
                </div>

                {/* Selected Courses Summary */}
                {formData.selectedCourses.length > 0 && (
                  <div 
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)',
                    }}
                  >
                    <h4 
                      className="text-sm tracking-[0.2em] mb-2"
                      style={{ color: 'var(--color-text)' }}
                    >
                      SELECTED COURSES:
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {getSelectedCourseNames()}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || formData.selectedCourses.length === 0}
                    className="w-full py-4 rounded-lg text-sm tracking-widest font-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isSubmitting || formData.selectedCourses.length === 0 
                        ? 'var(--color-text-muted)' 
                        : 'var(--color-primary)',
                      color: 'var(--color-background)',
                      border: `1px solid ${isSubmitting || formData.selectedCourses.length === 0 
                        ? 'var(--color-text-muted)' 
                        : 'var(--color-primary)'}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting && formData.selectedCourses.length > 0) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--color-primary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting && formData.selectedCourses.length > 0) {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                        e.currentTarget.style.color = 'var(--color-background)'
                      }
                    }}
                  >
                    {isSubmitting ? 'SUBMITTING APPLICATION...' : 'APPLY NOW'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </main>
      </div>

      <Footer />
      <FloatingSettingsButton />
    </>
  )
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white">
        <AcademyNavbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Loading application form...</p>
          </div>
        </main>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  )
}