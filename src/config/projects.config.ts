// Central project configuration - auto-generated from filesystem scan
export type PreviewStrategy = 'iframe' | 'storyboard' | 'static'

export interface ProjectConfig {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  year: string
  tech: string[]
  
  // Preview configuration
  preview: {
    strategy: PreviewStrategy
    // For iframe strategy
    url?: string
    // For storyboard strategy - UI states to animate through
    storyboard?: {
      steps: Array<{
        title: string
        description: string
        color: string // Background color for the step
        icon?: string // Optional emoji/icon
      }>
      interval?: number // ms between steps
    }
    // For static fallback
    fallbackColor?: string
  }
  
  // Optional links
  links?: {
    live?: string
    github?: string
    case_study?: string
  }
  
  // Feature flags
  featured?: boolean
  visible?: boolean
}

export const projects: ProjectConfig[] = [
  {
    id: 'lms-portal',
    name: 'LMS Portal',
    tagline: 'Education, Engineered',
    description: 'Comprehensive learning management system with role-based access, course management, attendance tracking, and calendar integration.',
    category: 'Mobile Application',
    year: '2024',
    tech: ['Flutter', 'Dart', 'SQLite', 'REST APIs'],
    preview: {
      strategy: 'iframe',
      url: '/demos/lms-portal/index.html',
      fallbackColor: '#1a1a2e'
    },
    featured: true,
    visible: true
  },
  {
    id: 'flood-monitor',
    name: 'Flood & Quake Alert',
    tagline: 'Prediction. Prevention. Protection.',
    description: 'Real-time disaster monitoring with AI chatbot, community reporting, NGO coordination, and emergency hotlines.',
    category: 'Disaster Response',
    year: '2024',
    tech: ['Flutter', 'Geolocation', 'Push Notifications', 'Maps'],
    preview: {
      strategy: 'iframe',
      url: '/demos/flood-alert/index.html',
      fallbackColor: '#0d1b2a'
    },
    featured: true,
    visible: true
  },
  {
    id: 'neon-nexus',
    name: 'Neon Nexus',
    tagline: 'Gaming Community Platform',
    description: 'High-performance gaming portal with community features, live feeds, gamification, ratings, and real-time interactions.',
    category: 'Web Platform',
    year: '2024',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js'],
    preview: {
      strategy: 'iframe',
      url: '/demos/neon-nexus/index.html',
      fallbackColor: '#0a0a12'
    },
    featured: true,
    visible: true
  },
  {
    id: 'psl-engagement',
    name: 'PSL Fan Platform',
    tagline: 'Sports Technology',
    description: 'Interactive sports fan engagement with real-time match data, community features, and live updates.',
    category: 'Web Platform',
    year: '2024',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    preview: {
      strategy: 'iframe',
      url: '/demos/psl-fan/index.html',
      fallbackColor: '#0a2e1a'
    },
    featured: false,
    visible: true
  },
  {
    id: 'console-hub',
    name: 'Retro Console Hub',
    tagline: 'Classic Gaming Reimagined',
    description: 'Browser-based retro gaming interface with classic console emulation pages and modern UI.',
    category: 'Web Application',
    year: '2024',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    preview: {
      strategy: 'iframe',
      url: '/demos/console-hub/index.html',
      fallbackColor: '#1a1a1a'
    },
    featured: false,
    visible: true
  },
  {
    id: 'crater-jobs',
    name: 'Crater Jobs',
    tagline: 'Career Platform',
    description: 'Job portal and career platform designed for the SRE project with modern UI.',
    category: 'Web Platform',
    year: '2024',
    tech: ['HTML5', 'CSS3'],
    preview: {
      strategy: 'iframe',
      url: '/demos/crater-jobs/index.html',
      fallbackColor: '#1a1a2e'
    },
    featured: false,
    visible: true
  }
]

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured && p.visible)
export const getAllVisibleProjects = () => projects.filter(p => p.visible)
export const getProjectById = (id: string) => projects.find(p => p.id === id)
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category && p.visible)
