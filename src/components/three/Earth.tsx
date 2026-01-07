'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

interface EarthProps {
  scale?: number
  position?: [number, number, number]
  rotationSpeed?: number
}

export default function Earth({ 
  scale = 1.5, 
  position = [3, -1, -2],
  rotationSpeed = 0.0003 
}: EarthProps) {
  const earthRef = useRef<THREE.Mesh>(null)
  
  // Single texture for performance
  const earthColor = useLoader(TextureLoader, '/textures/earth_color.png')
  
  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: earthColor,
      roughness: 0.8,
      metalness: 0.1,
    })
  }, [earthColor])

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed
      earthRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <mesh ref={earthRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={earthMaterial} attach="material" />
    </mesh>
  )
}
