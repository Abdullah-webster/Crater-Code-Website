'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface MoonProps {
  scale?: number
  position?: [number, number, number]
  rotationSpeed?: number
}

export default function Moon({ 
  scale = 2, 
  position = [0, 0, 0],
  rotationSpeed = 0.0005 
}: MoonProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Single texture load
  const moonTexture = useLoader(TextureLoader, '/textures/moon.jpg')
  
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.015,
      roughness: 0.9,
      metalness: 0.05,
    })
  }, [moonTexture])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}
