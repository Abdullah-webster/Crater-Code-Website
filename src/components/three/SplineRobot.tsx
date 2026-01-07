'use client'

import Spline from '@splinetool/react-spline'

interface SplineRobotProps {
  className?: string
}

export default function SplineRobot({ className = '' }: SplineRobotProps) {
  return (
    <div className={`relative ${className}`}>
      <Spline
        scene="https://prod.spline.design/loading.../scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
