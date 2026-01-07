'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface CrateredPlanetProps {
  scale?: number
  position?: [number, number, number]
}

export default function CrateredPlanet({ 
  scale = 4, 
  position = [2, -1, -3]
}: CrateredPlanetProps) {
  const planetRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  
  // Load single texture (lighter)
  const moonTexture = useLoader(TextureLoader, '/textures/moon.jpg')

  // Simpler material - no displacement (much faster)
  const planetMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.025,
      roughness: 0.9,
      metalness: 0.05,
    })
  }, [moonTexture])

  // Simple glow material (no custom shader)
  const glowMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#4a4a4a',
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    })
  }, [])

  useFrame(() => {
    if (planetRef.current) {
      // Slow rotation
      planetRef.current.rotation.y += 0.0002
      
      // Subtle parallax
      const targetX = position[0] + mouse.x * 0.2
      const targetY = position[1] + mouse.y * 0.1
      
      planetRef.current.position.x = THREE.MathUtils.lerp(
        planetRef.current.position.x,
        targetX,
        0.015
      )
      planetRef.current.position.y = THREE.MathUtils.lerp(
        planetRef.current.position.y,
        targetY,
        0.015
      )
    }
  })

  return (
    <group ref={planetRef} position={position}>
      {/* Main planet - reduced segments */}
      <mesh scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={planetMaterial} attach="material" />
      </mesh>

      {/* Simple glow */}
      <mesh scale={scale * 1.08}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  )
}
