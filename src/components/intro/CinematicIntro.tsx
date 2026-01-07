'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface CinematicIntroProps {
  onComplete: () => void
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onComplete, 800)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  if (!show) {
    return (
      <motion.div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'var(--color-background)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-16 h-16 mb-8"
        >
          <Image src="/logo_in_black.jpeg" alt="CRATER CODE" fill className="object-contain" priority />
        </motion.div>

        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-2xl tracking-[0.4em]"
          style={{ color: 'var(--color-text)' }}
        >
          CRATER CODE
        </motion.h1>
      </div>

      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-xs tracking-wider opacity-40 hover:opacity-100"
        style={{ color: 'var(--color-text-muted)' }}
      >
        SKIP
      </button>
    </motion.div>
  )
}
