'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import { useAuth } from '@/hooks/useAuth'
import { courseService, Course, TechStack } from '@/services/courseService'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

export default function AdminPage() {
  const { user, loading, logout } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    level: 'Beginner' as 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Intermediate to Advanced' | 'Advanced' | 'Beginner to Advanced',
    description: '',
    category: 'Web' as 'App' | 'Web' | 'Cross Platform' | 'Artificial Intelligence',
    techStack: [{ id: '1', text: '', description: '' }]
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load courses from Firebase on component mount
  useEffect(() => {
    if (user) {
      loadCourses()
      
      // Subscribe to real-time updates
      const unsubscribe = courseService.subscribeToCoursesUpdates((updatedCourses) => {
        setCourses(updatedCourses)
      })

      return () => unsubscribe()
    }
  }, [user])

  const loadCourses = async () => {
    const result = await courseService.getCourses()
    if (result.success) {
      setCourses(result.courses)
    } else {
      alert('Failed to load courses: ' + result.error)
    }
  }

  // Show login form if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p style={{ color: 'var(--color-text)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTechStackChange = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.map(item =>
        item.id === id ? { ...item, text: value } : item
      )
    }))
  }

  const handleTechStackDescriptionChange = (id: string, value: string) => {
    // Update the courses state directly
    setCourses(prev => 
      prev.map(course => 
        course.id === selectedCourseId 
          ? {
              ...course,
              techStack: course.techStack.map(item =>
                item.id === id ? { ...item, description: value } : item
              )
            }
          : course
      )
    )
  }

  const saveTechStackDetails = async () => {
    if (!selectedCourseId) return
    
    const course = courses.find(c => c.id === selectedCourseId)
    if (!course) return

    const result = await courseService.updateCourse(selectedCourseId, {
      techStack: course.techStack
    })

    if (result.success) {
      alert('Tech stack details saved successfully!')
    } else {
      alert('Failed to save tech stack details: ' + result.error)
    }
  }

  const addTechStackField = () => {
    const newId = Date.now().toString()
    setFormData(prev => ({
      ...prev,
      techStack: [...prev.techStack, { id: newId, text: '', description: '' }]
    }))
  }

  const removeTechStackField = (id: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(item => item.id !== id)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.name.trim() || !formData.duration.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      if (editingId) {
        // Update existing course
        const result = await courseService.updateCourse(editingId, formData)
        if (result.success) {
          alert('Course updated successfully!')
        } else {
          alert('Failed to update course: ' + result.error)
        }
        setEditingId(null)
      } else {
        // Add new course
        const result = await courseService.addCourse(formData)
        if (result.success) {
          alert('Course added successfully!')
        } else {
          alert('Failed to add course: ' + result.error)
        }
      }

      resetForm()
      setShowModal(false)
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      duration: '',
      level: 'Beginner',
      description: '',
      category: 'Web',
      techStack: [{ id: '1', text: '', description: '' }]
    })
  }

  const handleEdit = (course: Course) => {
    setFormData(course)
    setEditingId(course.id)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      const result = await courseService.deleteCourse(id)
      if (result.success) {
        alert('Course deleted successfully!')
      } else {
        alert('Failed to delete course: ' + result.error)
      }
    }
  }

  const handleViewDetails = (course: Course) => {
    setSelectedCourseId(course.id)
    setShowDetailsModal(true)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedCourseId(null)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    resetForm()
  }

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        <AcademyNavbar />
      
      <main className="pt-32 pb-20 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 
              className="font-display text-5xl md:text-6xl tracking-[0.2em]"
              style={{ color: 'var(--color-text)' }}
            >
              Course Management
            </h1>
            <div className="flex items-center gap-4">
              <span style={{ color: 'var(--color-text-muted)' }} className="text-sm">
                Welcome, {user?.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-xs tracking-widest font-light transition-all duration-300"
                style={{
                  backgroundColor: 'color-mix(in srgb, #ef4444 15%, transparent)',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'color-mix(in srgb, #ef4444 15%, transparent)'
                  e.currentTarget.style.color = '#ef4444'
                }}
              >
                LOGOUT
              </button>
            </div>
          </div>
          <p 
            className="text-lg tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Manage all courses offered in the academy
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="max-w-7xl mx-auto">
          {courses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p style={{ color: 'var(--color-text-muted)' }} className="text-lg tracking-wide">
                No courses yet. Click the plus button to add your first course.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Group courses by category */}
              {['App', 'Web', 'Cross Platform', 'Artificial Intelligence'].map((category) => {
                const categoryCourses = courses.filter(course => course.category === category)
                if (categoryCourses.length === 0) return null
                
                return (
                  <div key={category}>
                    <h2 
                      className="text-2xl font-light tracking-wide mb-6"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {category} Development
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="p-6 rounded-xl"
                          style={{
                            backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                          }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span 
                              className="px-2 py-1 rounded text-xs tracking-wider"
                              style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
                                color: 'var(--color-primary)',
                              }}
                            >
                              {course.category}
                            </span>
                          </div>
                          
                          <h3 
                            className="text-xl font-light tracking-wide mb-2"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {course.name}
                          </h3>
                          
                          <div className="space-y-2 mb-6">
                            <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">
                              <span className="font-light">Duration:</span> {course.duration}
                            </p>
                            <p style={{ color: 'var(--color-text-muted)' }} className="text-sm">
                              <span className="font-light">Level:</span> {course.level}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleViewDetails(course)}
                              className="flex-1 py-2 rounded-lg text-xs tracking-widest font-light transition-all duration-300"
                              style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                                color: 'var(--color-primary)',
                                border: '1px solid var(--color-primary)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                                e.currentTarget.style.color = 'var(--color-background)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                                e.currentTarget.style.color = 'var(--color-primary)'
                              }}
                            >
                              ADD MORE DETAILS
                            </button>
                            <button
                              onClick={() => handleEdit(course)}
                              className="flex-1 py-2 rounded-lg text-xs tracking-widest font-light transition-all duration-300"
                              style={{
                                backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                                color: 'var(--color-primary)',
                                border: '1px solid var(--color-primary)',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                                e.currentTarget.style.color = 'var(--color-background)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                                e.currentTarget.style.color = 'var(--color-primary)'
                              }}
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="flex-1 py-2 rounded-lg text-xs tracking-widest font-light transition-all duration-300"
                              style={{
                                backgroundColor: 'color-mix(in srgb, #ef4444 15%, transparent)',
                                color: '#ef4444',
                                border: '1px solid #ef4444',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ef4444'
                                e.currentTarget.style.color = 'white'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, #ef4444 15%, transparent)'
                                e.currentTarget.style.color = '#ef4444'
                              }}
                            >
                              DELETE
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-3xl font-light tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  {editingId ? 'Edit Course' : 'Add New Course'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-2xl transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Name */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    COURSE NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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

                {/* Duration */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    DURATION
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 weeks"
                    className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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

                {/* Level */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    LEVEL
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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
                  >
                    <option value="Beginner" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Beginner</option>
                    <option value="Beginner to Intermediate" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Beginner to Intermediate</option>
                    <option value="Intermediate" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Intermediate</option>
                    <option value="Intermediate to Advanced" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Intermediate to Advanced</option>
                    <option value="Beginner to Advanced" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Beginner to Advanced</option>
                    <option value="Advanced" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Advanced</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    CATEGORY
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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
                  >
                    <option value="App" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>App Development</option>
                    <option value="Web" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Web Development</option>
                    <option value="Cross Platform" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Cross Platform</option>
                    <option value="Artificial Intelligence" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>Artificial Intelligence</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    DESCRIPTION
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter course description (3-4 lines)"
                    rows={4}
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

                {/* Tech Stack */}
                <div>
                  <label 
                    className="block text-xs tracking-[0.2em] mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    TECH STACK
                  </label>
                  <div className="space-y-3">
                    {formData.techStack.map((item, index) => (
                      <div key={item.id} className="flex gap-3">
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => handleTechStackChange(item.id, e.target.value)}
                          placeholder={`Tech stack item ${index + 1}`}
                          className="flex-1 px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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
                        {formData.techStack.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTechStackField(item.id)}
                            className="px-4 py-3 rounded-lg text-sm transition-all duration-300"
                            style={{
                              backgroundColor: 'color-mix(in srgb, #ef4444 15%, transparent)',
                              color: '#ef4444',
                              border: '1px solid #ef4444',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#ef4444'
                              e.currentTarget.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'color-mix(in srgb, #ef4444 15%, transparent)'
                              e.currentTarget.style.color = '#ef4444'
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Tech Stack Button */}
                  <button
                    type="button"
                    onClick={addTechStackField}
                    className="mt-3 w-full py-2 rounded-lg text-xs tracking-widest font-light transition-all duration-300"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-primary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                      e.currentTarget.style.color = 'var(--color-background)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                      e.currentTarget.style.color = 'var(--color-primary)'
                    }}
                  >
                    + ADD TECH STACK ITEM
                  </button>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-muted)',
                      border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)'
                      e.currentTarget.style.color = 'var(--color-text)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isSubmitting ? 'var(--color-text-muted)' : 'var(--color-primary)',
                      color: 'var(--color-background)',
                      border: `1px solid ${isSubmitting ? 'var(--color-text-muted)' : 'var(--color-primary)'}`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = 'var(--color-primary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                        e.currentTarget.style.color = 'var(--color-background)'
                      }
                    }}
                  >
                    {isSubmitting ? 'SAVING...' : (editingId ? 'UPDATE COURSE' : 'ADD COURSE')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedCourseId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={closeDetailsModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 
                  className="text-3xl font-light tracking-wide"
                  style={{ color: 'var(--color-text)' }}
                >
                  Tech Stack Details
                </h2>
                <button
                  onClick={closeDetailsModal}
                  className="text-2xl transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Tech Stack Items with Editable Fields */}
              <div className="space-y-6">
                {courses.find(c => c.id === selectedCourseId)?.techStack.map((item) => (
                  <div key={item.id} className="space-y-3 p-4 rounded-lg" style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
                  }}>
                    {/* Tech Stack Name */}
                    <div>
                      <label 
                        className="block text-xs tracking-[0.2em] mb-2"
                        style={{ color: 'var(--color-text)' }}
                      >
                        TECH STACK
                      </label>
                      <input
                        type="text"
                        value={item.text}
                        readOnly
                        className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
                        style={{
                          backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                          color: 'var(--color-text)',
                        }}
                      />
                    </div>

                    {/* Description Field */}
                    <div>
                      <label 
                        className="block text-xs tracking-[0.2em] mb-2"
                        style={{ color: 'var(--color-text)' }}
                      >
                        DESCRIPTION
                      </label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleTechStackDescriptionChange(item.id, e.target.value)}
                        placeholder="Add detailed description (5-6 lines)"
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
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={saveTechStackDetails}
                  className="flex-1 py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300"
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
                  SAVE CHANGES
                </button>
                <button
                  onClick={closeDetailsModal}
                  className="flex-1 py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-muted)',
                    border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.color = 'var(--color-text)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                    e.currentTarget.style.color = 'var(--color-text-muted)'
                  }}
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Floating Add Course Button - Always visible */}
      <motion.button
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-background)',
          zIndex: 999999,
          position: 'fixed',
          top: 'auto',
          left: 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)'
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>

      <FloatingSettingsButton />
    </>
  )
}

// Login Form Component
function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await login(email, password)
    if (!result.success) {
      alert('Login failed: ' + result.error)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-4 p-8 rounded-xl"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-light tracking-wide mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Administrator Login
          </h1>
          
          {/* Administration Notice */}
          <div 
            className="p-4 rounded-lg mb-6"
            style={{
              backgroundColor: 'color-mix(in srgb, #ef4444 10%, transparent)',
              border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ color: '#ef4444' }}>
                ADMINISTRATION ONLY
              </span>
            </div>
            <p className="text-xs tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              This login portal is exclusively for authorized administrators.
              <br />
              Course management and academy administration access only.
            </p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label 
              className="block text-xs tracking-[0.2em] mb-3"
              style={{ color: 'var(--color-text)' }}
            >
              ADMIN EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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

          <div>
            <label 
              className="block text-xs tracking-[0.2em] mb-3"
              style={{ color: 'var(--color-text)' }}
            >
              ADMIN PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-sm tracking-widest font-light transition-all duration-300 disabled:opacity-50"
            style={{
              backgroundColor: isLoading ? 'var(--color-text-muted)' : 'var(--color-primary)',
              color: 'var(--color-background)',
              border: `1px solid ${isLoading ? 'var(--color-text-muted)' : 'var(--color-primary)'}`,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-primary)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                e.currentTarget.style.color = 'var(--color-background)'
              }
            }}
          >
            {isLoading ? 'AUTHENTICATING...' : 'ADMIN SIGN IN'}
          </button>
        </form>

        {/* Footer Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs tracking-wide mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Academy Course Management System
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Crater Code Academy</span>
          </p>
          
          {/* Administration Info */}
          <div 
            className="p-3 rounded-lg"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 5%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
            }}
          >
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              For student applications and course inquiries,
              <br />
              please visit our main academy page.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
