'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import { useAuth } from '@/hooks/useAuth'
import FloatingSettingsButton from '@/components/common/FloatingSettingsButton'

export default function SignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const courses = [
    'Web Development',
    'App Development', 
    'Cross-Platform Development',
    'AI & Machine Learning'
  ]

  const experienceLevels = [
    'Complete Beginner',
    'Some Experience',
    'Intermediate',
    'Advanced'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const result = await signup(formData.email, formData.password)
      if (result.success) {
        alert('Admin account created successfully! Please login with your credentials.')
        router.push('/academy/admin')
      } else {
        alert('Signup failed: ' + result.error)
      }
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <AcademyNavbar />
        
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h1 
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl leading-[0.9] sm:leading-[0.85] mb-6 text-white"
              >
                Admin Registration
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl tracking-wide text-gray-400"
              >
                Create administrator account for Crater Code Academy
              </p>
              
              {/* Administration Notice */}
              <div 
                className="mt-6 p-4 rounded-lg bg-red-900 border border-red-700"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-red-400">
                    ADMINISTRATOR REGISTRATION
                  </span>
                </div>
                <p className="text-xs tracking-wide text-gray-400">
                  This registration is for authorized administrators only.
                  <br />
                  Course management and academy administration access.
                </p>
              </div>
            </motion.div>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="p-8 rounded-xl bg-gray-900 border border-gray-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border text-white focus:border-white ${
                        errors.firstName ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs mt-1 text-red-400">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border text-white focus:border-white ${
                        errors.lastName ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs mt-1 text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
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
                    className={`w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border text-white focus:border-white ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs mt-1 text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      PASSWORD *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className={`w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border text-white focus:border-white ${
                        errors.password ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.password && (
                      <p className="text-xs mt-1 text-red-400">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label 
                      className="block text-xs tracking-[0.2em] mb-3 text-white"
                    >
                      CONFIRM PASSWORD *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full px-4 py-3 rounded-lg text-sm tracking-wide focus:outline-none bg-gray-800 border text-white focus:border-white ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs mt-1 text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-4 rounded-lg text-sm tracking-widest font-light transition-all duration-300 ${
                      isLoading 
                        ? 'opacity-50 cursor-not-allowed bg-gray-600 text-gray-400 border-gray-600' 
                        : 'bg-white text-black border border-white hover:bg-transparent hover:text-white'
                    }`}
                  >
                    {isLoading ? 'CREATING ADMIN ACCOUNT...' : 'CREATE ADMIN ACCOUNT'}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-400">
                    Already have an admin account?{' '}
                    <button
                      type="button"
                      onClick={() => router.push('/academy/admin')}
                      className="underline transition-colors text-white hover:text-gray-400"
                    >
                      Admin login here
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </main>
      </div>
      <FloatingSettingsButton />
    </>
  )
}