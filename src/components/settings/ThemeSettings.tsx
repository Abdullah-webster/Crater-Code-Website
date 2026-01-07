'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useTheme, presetThemes } from '@/context/ThemeContext'

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'theme' | 'display' | 'performance'>('theme')
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dragControls = useDragControls()
  const { theme, themeName, setTheme, setCustomColors, availableThemes } = useTheme()
  
  // Display settings
  const [fontSize, setFontSize] = useState(100)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  
  // Performance settings
  const [enable3D, setEnable3D] = useState(true)
  const [enableAnimations, setEnableAnimations] = useState(true)
  const [targetFPS, setTargetFPS] = useState(30)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Capture button position when opening
  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Calculate panel size (90vw or max 768px, whichever is smaller)
      const panelSize = Math.min(viewportWidth * 0.9, 768)
      const halfPanel = panelSize / 2
      
      // Button center position
      let centerX = rect.left + rect.width / 2
      let centerY = rect.top + rect.height / 2
      
      // Adjust if panel would go off-screen
      // Left edge
      if (centerX - halfPanel < 20) {
        centerX = halfPanel + 20
      }
      // Right edge
      if (centerX + halfPanel > viewportWidth - 20) {
        centerX = viewportWidth - halfPanel - 20
      }
      // Top edge
      if (centerY - halfPanel < 20) {
        centerY = halfPanel + 20
      }
      // Bottom edge
      if (centerY + halfPanel > viewportHeight - 20) {
        centerY = viewportHeight - halfPanel - 20
      }
      
      setButtonPosition({ x: centerX, y: centerY })
    }
    setIsOpen(true)
  }

  // Load settings
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const savedFontSize = localStorage.getItem('crater-font-size')
    const savedReducedMotion = localStorage.getItem('crater-reduced-motion')
    const savedHighContrast = localStorage.getItem('crater-high-contrast')
    const savedEnable3D = localStorage.getItem('crater-enable-3d')
    const savedEnableAnimations = localStorage.getItem('crater-enable-animations')
    const savedTargetFPS = localStorage.getItem('crater-target-fps')

    if (savedFontSize) setFontSize(parseInt(savedFontSize))
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === 'true')
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true')
    if (savedEnable3D) setEnable3D(savedEnable3D === 'true')
    if (savedEnableAnimations) setEnableAnimations(savedEnableAnimations === 'true')
    if (savedTargetFPS) setTargetFPS(parseInt(savedTargetFPS))
  }, [])

  // Apply settings
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.style.fontSize = `${fontSize}%`
    localStorage.setItem('crater-font-size', fontSize.toString())
  }, [fontSize])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
    } else {
      document.documentElement.style.removeProperty('--animation-duration')
    }
    localStorage.setItem('crater-reduced-motion', reducedMotion.toString())
  }, [reducedMotion])

  useEffect(() => {
    if (typeof document === 'undefined') return
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    localStorage.setItem('crater-high-contrast', highContrast.toString())
  }, [highContrast])

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('crater-enable-3d', enable3D.toString())
    localStorage.setItem('crater-enable-animations', enableAnimations.toString())
    localStorage.setItem('crater-target-fps', targetFPS.toString())
  }, [enable3D, enableAnimations, targetFPS])

  return (
    <>
      {/* Draggable Settings button - Crater shaped */}
      <motion.button
        ref={buttonRef}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{
          top: 0,
          left: 0,
          right: typeof window !== 'undefined' ? window.innerWidth - 56 : 0,
          bottom: typeof window !== 'undefined' ? window.innerHeight - 56 : 0,
        }}
        initial={{ 
          opacity: 0, 
          scale: 0, 
          x: typeof window !== 'undefined' ? window.innerWidth - 136 : 0, 
          y: typeof window !== 'undefined' ? window.innerHeight - 80 : 0 
        }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={handleOpen}
        className="fixed top-0 left-0 z-[100] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center group shadow-lg cursor-grab active:cursor-grabbing"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #1a1a1a, #0a0a0a)',
          border: '2px solid #8c8c8c',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5), 0 0 20px rgba(140,140,140,0.2)',
          touchAction: 'none',
        }}
      >
        <div className="absolute inset-0 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle at 40% 40%, transparent 20%, #0a0a0a 21%, transparent 22%), radial-gradient(circle at 60% 70%, transparent 15%, #0a0a0a 16%, transparent 17%)'
        }} />
        
        <svg 
          className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10 group-hover:rotate-90 transition-transform duration-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>

      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with reduced blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm"
            />

            {/* Crater panel - smart positioning */}
            <motion.div
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: -180 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0 
              }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                rotate: 180 
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed z-[120] rounded-full overflow-hidden"
              style={{
                left: `${buttonPosition.x}px`,
                top: `${buttonPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                width: 'min(90vw, 32rem)',
                height: 'min(90vw, 32rem)',
                maxWidth: '90vw',
                maxHeight: '90vh',
                aspectRatio: '1',
                background: 'radial-gradient(circle at 35% 35%, #1a1a1a, #0a0a0a)',
                border: '3px solid #8c8c8c',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 0 60px rgba(140,140,140,0.3)',
              }}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                background: 'radial-gradient(circle at 30% 30%, transparent 15%, #0a0a0a 16%, transparent 17%), radial-gradient(circle at 70% 40%, transparent 10%, #0a0a0a 11%, transparent 12%)'
              }} />

              <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white mb-1 sm:mb-2">CRATER CONTROL</h2>
                  <p className="text-[10px] sm:text-xs text-gray-400 tracking-wider">CUSTOMIZE YOUR EXPERIENCE</p>
                </div>

                <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 flex-wrap justify-center">
                  {[
                    { id: 'theme', label: 'THEME', icon: '🎨' },
                    { id: 'display', label: 'DISPLAY', icon: '👁️' },
                    { id: 'performance', label: 'PERF', icon: '⚡' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs tracking-wider rounded-full transition-all ${
                        activeTab === tab.id
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>

                {/* Scrollable content area */}
                <div className="w-full max-w-md max-h-[40vh] sm:max-h-[50vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
                  <AnimatePresence mode="wait">
                    {activeTab === 'theme' && (
                      <motion.div
                        key="theme"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-white text-xs tracking-wider mb-3">COLOR THEMES</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {availableThemes.filter(t => t !== 'custom').map((name) => (
                              <button
                                key={name}
                                onClick={() => setTheme(name)}
                                className={`p-3 rounded-lg border transition-all ${
                                  themeName === name 
                                    ? 'border-white bg-white/10 scale-105' 
                                    : 'border-gray-700 hover:border-gray-500'
                                }`}
                              >
                                <div className="flex gap-1 mb-2 justify-center">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: presetThemes[name].colors.primary }} />
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: presetThemes[name].colors.secondary }} />
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: presetThemes[name].colors.background }} />
                                </div>
                                <span className="text-white text-xs">{presetThemes[name].name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white text-xs tracking-wider">CUSTOM COLORS</h3>
                            <button
                              onClick={() => setTheme('custom')}
                              className={`text-xs px-3 py-1 rounded-full ${
                                themeName === 'custom'
                                  ? 'bg-white text-black'
                                  : 'border border-gray-700 text-gray-400'
                              }`}
                            >
                              {themeName === 'custom' ? '✓ Active' : 'Use Custom'}
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {Object.entries(theme.colors).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between bg-gray-900/50 p-2 rounded">
                                <label className="text-gray-400 text-xs capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={value}
                                    onChange={(e) => setCustomColors({ [key]: e.target.value })}
                                    className="w-6 h-6 rounded cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setCustomColors({ [key]: e.target.value })}
                                    className="w-20 px-2 py-1 text-xs bg-black border border-gray-700 rounded text-white"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'display' && (
                      <motion.div
                        key="display"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-white text-xs tracking-wider">FONT SIZE</label>
                            <span className="text-gray-400 text-xs">{fontSize}%</span>
                          </div>
                          <input
                            type="range"
                            min="80"
                            max="150"
                            step="10"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                            className="w-full accent-white"
                          />
                        </div>

                        <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded">
                          <div>
                            <label className="text-white text-xs tracking-wider block mb-1">REDUCED MOTION</label>
                            <p className="text-[10px] text-gray-400">Minimize animations</p>
                          </div>
                          <button
                            onClick={() => setReducedMotion(!reducedMotion)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              reducedMotion ? 'bg-white' : 'bg-gray-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                              reducedMotion ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded">
                          <div>
                            <label className="text-white text-xs tracking-wider block mb-1">HIGH CONTRAST</label>
                            <p className="text-[10px] text-gray-400">Increase visibility</p>
                          </div>
                          <button
                            onClick={() => setHighContrast(!highContrast)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              highContrast ? 'bg-white' : 'bg-gray-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                              highContrast ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'performance' && (
                      <motion.div
                        key="performance"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded">
                          <div>
                            <label className="text-white text-xs tracking-wider block mb-1">3D SCENES</label>
                            <p className="text-[10px] text-gray-400">Spline & Three.js</p>
                          </div>
                          <button
                            onClick={() => setEnable3D(!enable3D)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              enable3D ? 'bg-white' : 'bg-gray-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                              enable3D ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between bg-gray-900/50 p-3 rounded">
                          <div>
                            <label className="text-white text-xs tracking-wider block mb-1">ANIMATIONS</label>
                            <p className="text-[10px] text-gray-400">Framer Motion effects</p>
                          </div>
                          <button
                            onClick={() => setEnableAnimations(!enableAnimations)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              enableAnimations ? 'bg-white' : 'bg-gray-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                              enableAnimations ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-white text-xs tracking-wider">TARGET FPS</label>
                            <span className="text-gray-400 text-xs">{targetFPS} FPS</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="60"
                            step="10"
                            value={targetFPS}
                            onChange={(e) => setTargetFPS(parseInt(e.target.value))}
                            className="w-full accent-white"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => {
                    setTheme('crater')
                    setFontSize(100)
                    setReducedMotion(false)
                    setHighContrast(false)
                    setEnable3D(true)
                    setEnableAnimations(true)
                    setTargetFPS(30)
                  }}
                  className="mt-4 sm:mt-6 px-4 sm:px-6 py-1.5 sm:py-2 border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors text-[10px] sm:text-xs tracking-wider rounded-full"
                >
                  RESET ALL
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-track-gray-900::-webkit-scrollbar-track {
          background: #111;
          border-radius: 3px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  )
}
