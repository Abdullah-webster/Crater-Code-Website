'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import AcademyNavbar from '@/components/layout/AcademyNavbar'
import Footer from '@/components/sections/Footer'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    setSubmitting(true)

    try {
      // No credential validation - just redirect to admin dashboard
      setSuccess(true)
      setFormData({
        usernameOrEmail: '',
        password: ''
      })
      // Redirect to admin dashboard after successful login
      setTimeout(() => {
        window.location.href = '/academy/admin'
      }, 1500)
    } catch (error) {
      console.error('Error logging in:', error)
      setError('Failed to login. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <AcademyNavbar />
      
      <main className="pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 
              className="font-display text-5xl md:text-6xl tracking-[0.2em] mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Login
            </h1>
            <p 
              className="text-lg tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Welcome back to Crater Code Academy
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-lg"
              style={{
                backgroundColor: 'color-mix(in srgb, #10b981 20%, transparent)',
                border: '1px solid #10b981',
              }}
            >
              <p style={{ color: '#10b981' }} className="text-sm tracking-wide">
                Login successful! Redirecting...
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-lg"
              style={{
                backgroundColor: 'color-mix(in srgb, #ef4444 20%, transparent)',
                border: '1px solid #ef4444',
              }}
            >
              <p style={{ color: '#ef4444' }} className="text-sm tracking-wide">
                {error}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Username or Email Field */}
            <div>
              <label 
                className="block text-xs tracking-[0.2em] mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                USERNAME OR EMAIL
              </label>
              <input
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleInputChange}
                placeholder="Enter your username or email"
                className="w-full px-4 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                  color: 'var(--color-text)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)'
                  e.target.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 12%, transparent)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                  e.target.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                className="block text-xs tracking-[0.2em] mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)',
                  color: 'var(--color-text)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)'
                  e.target.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 12%, transparent)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                  e.target.style.backgroundColor = 'color-mix(in srgb, var(--color-primary) 8%, transparent)'
                }}
              />
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-lg font-light tracking-wide text-sm transition-all duration-300 disabled:opacity-50 mt-8"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-background)',
                border: '1px solid var(--color-primary)',
              }}
              onMouseEnter={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--color-primary)'
                }
              }}
              onMouseLeave={(e) => {
                if (!submitting) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)'
                  e.currentTarget.style.color = 'var(--color-background)'
                }
              }}
            >
              {submitting ? 'LOGGING IN...' : 'LOGIN'}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p 
              className="text-sm tracking-wide"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Don't have an account?{' '}
              <a 
                href="/academy/apply"
                className="transition-colors"
                style={{ color: 'var(--color-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Apply now
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
