'use client'

import { useState } from 'react'
import Spline from '@splinetool/react-spline'

export default function TestPage() {
  const [status, setStatus] = useState('Loading Spline...')

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#000', position: 'relative' }}>
      {/* Status indicator */}
      <div style={{ 
        position: 'absolute', 
        top: 20, 
        left: 20, 
        color: '#fff', 
        zIndex: 100,
        background: 'rgba(0,0,0,0.7)',
        padding: '10px 20px',
        borderRadius: 8
      }}>
        {status}
      </div>
      
      <Spline 
        scene="https://prod.spline.design/SwTSRg33bP22u3tX/scene.splinecode"
        onLoad={() => setStatus('✓ Spline loaded successfully!')}
        onError={() => setStatus('✗ Error: Failed to load')}
      />
    </main>
  )
}
