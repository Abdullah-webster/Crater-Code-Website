'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/academy', label: 'Academy' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled ? 'py-4' : 'py-8'
        }`}
        style={{
          backgroundColor: isScrolled 
            ? 'color-mix(in srgb, var(--color-background) 85%, transparent)' 
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative w-8 h-8">
              <Image
                src="/logo_in_black.jpeg"
                alt="CRATER CODE"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span 
              className="font-display text-sm tracking-[0.25em] hidden sm:block"
              style={{ color: 'var(--color-text)' }}
            >
              CRATER CODE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs tracking-[0.15em] transition-colors duration-300 group"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span className="hover:text-[var(--color-text)]">
                  {link.label.toUpperCase()}
                </span>
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          >
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0, 
                y: isMobileMenuOpen ? 6 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-px origin-center"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
            <motion.span
              animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-px"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
            <motion.span
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0, 
                y: isMobileMenuOpen ? -6 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-px origin-center"
              style={{ backgroundColor: 'var(--color-text)' }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 lg:hidden"
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--color-background) 95%, transparent)',
              backdropFilter: 'blur(30px)'
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-3xl tracking-[0.2em] transition-colors"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
