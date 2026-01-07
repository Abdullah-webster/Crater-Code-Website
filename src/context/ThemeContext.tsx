'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
}

export interface Theme {
  name: string
  colors: ThemeColors
}

// Preset themes - users can customize or add more
export const presetThemes: Record<string, Theme> = {
  crater: {
    name: 'Crater (Default)',
    colors: {
      primary: '#ffffff',
      secondary: '#8c8c8c',
      accent: '#c4c4c4',
      background: '#0a0a0a',
      surface: '#121212',
      text: '#f5f5f5',
      textMuted: '#8c8c8c',
    }
  },
  midnight: {
    name: 'Midnight Blue',
    colors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#93c5fd',
      background: '#030712',
      surface: '#0f172a',
      text: '#f8fafc',
      textMuted: '#94a3b8',
    }
  },
  emerald: {
    name: 'Emerald',
    colors: {
      primary: '#34d399',
      secondary: '#10b981',
      accent: '#6ee7b7',
      background: '#022c22',
      surface: '#064e3b',
      text: '#ecfdf5',
      textMuted: '#a7f3d0',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fdba74',
      background: '#0c0a09',
      surface: '#1c1917',
      text: '#fafaf9',
      textMuted: '#a8a29e',
    }
  },
  purple: {
    name: 'Purple Haze',
    colors: {
      primary: '#a855f7',
      secondary: '#9333ea',
      accent: '#c084fc',
      background: '#09090b',
      surface: '#18181b',
      text: '#fafafa',
      textMuted: '#a1a1aa',
    }
  },
  custom: {
    name: 'Custom',
    colors: {
      primary: '#ffffff',
      secondary: '#8c8c8c',
      accent: '#c4c4c4',
      background: '#0a0a0a',
      surface: '#121212',
      text: '#f5f5f5',
      textMuted: '#8c8c8c',
    }
  }
}

// Helper to apply theme colors to document
function applyThemeColors(colors: ThemeColors) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-secondary', colors.secondary)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-background', colors.background)
  root.style.setProperty('--color-surface', colors.surface)
  root.style.setProperty('--color-text', colors.text)
  root.style.setProperty('--color-text-muted', colors.textMuted)
}

interface ThemeContextType {
  theme: Theme
  themeName: string
  setTheme: (name: string) => void
  setCustomColors: (colors: Partial<ThemeColors>) => void
  availableThemes: string[]
  isReady: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState('crater')
  const [customColors, setCustomColorsState] = useState<ThemeColors>(presetThemes.custom.colors)
  const [isReady, setIsReady] = useState(false)

  // Load saved theme from localStorage and apply immediately
  useEffect(() => {
    const savedTheme = localStorage.getItem('crater-theme')
    const savedCustom = localStorage.getItem('crater-custom-colors')
    
    let initialTheme = 'crater'
    let initialCustomColors = presetThemes.custom.colors
    
    if (savedTheme && presetThemes[savedTheme]) {
      initialTheme = savedTheme
    }
    if (savedCustom) {
      try {
        initialCustomColors = JSON.parse(savedCustom)
      } catch (e) {
        console.error('Failed to parse custom colors')
      }
    }
    
    // Apply theme immediately
    const colors = initialTheme === 'custom' ? initialCustomColors : presetThemes[initialTheme].colors
    applyThemeColors(colors)
    
    setThemeName(initialTheme)
    setCustomColorsState(initialCustomColors)
    setIsReady(true)
  }, [])

  // Apply CSS variables when theme changes (after initial load)
  useEffect(() => {
    if (!isReady) return
    const colors = themeName === 'custom' ? customColors : presetThemes[themeName].colors
    applyThemeColors(colors)
    localStorage.setItem('crater-theme', themeName)
  }, [themeName, customColors, isReady])

  const setTheme = (name: string) => {
    if (presetThemes[name]) {
      setThemeName(name)
    }
  }

  const setCustomColors = (colors: Partial<ThemeColors>) => {
    const newColors = { ...customColors, ...colors }
    setCustomColorsState(newColors)
    localStorage.setItem('crater-custom-colors', JSON.stringify(newColors))
    if (themeName === 'custom') {
      // Trigger re-render
      setThemeName('custom')
    }
  }

  const theme = themeName === 'custom' 
    ? { name: 'Custom', colors: customColors }
    : presetThemes[themeName]

  return (
    <ThemeContext.Provider value={{
      theme,
      themeName,
      setTheme,
      setCustomColors,
      availableThemes: Object.keys(presetThemes),
      isReady
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
