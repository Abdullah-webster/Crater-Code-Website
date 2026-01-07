'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Safe Earth component without texture loading
function SafeEarth({ 
  position = [3, -1, -2] as [number, number, number], 
  scale = 1.2,
  rotationSpeed = 0.0003 
}) {
  const earthRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed
      earthRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <mesh ref={earthRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#4a90e2" 
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

// Safe Moon component without texture loading
function SafeMoon({ 
  position = [-2.5, 1, -3] as [number, number, number], 
  scale = 0.8,
  rotationSpeed = 0.0005 
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color="#c0c0c0" 
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  )
}

function SimplePlanet({ position = [2.5, -0.3, -4] as [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0003
      ref.current.position.x = position[0] + state.mouse.x * 0.15
      ref.current.position.y = position[1] + state.mouse.y * 0.08
    }
  })

  return (
    <mesh ref={ref} position={position} scale={4}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#3a3a3a" roughness={0.9} metalness={0.1} />
    </mesh>
  )
}

function SimpleStars() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = -Math.random() * 100 - 20
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.5} color="#555" transparent opacity={0.8} />
    </points>
  )
}

function CameraRig() {
  const ref = useRef<THREE.PerspectiveCamera>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.mouse.x * 0.1, 0.02)
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, 0.3 + state.mouse.y * 0.05, 0.02)
    }
  })

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0.5, 8]} fov={40} />
}

interface SceneProps {
  showPlanet?: boolean
  variant?: 'hero' | 'minimal' | 'none'
  introComplete?: boolean
  showMoon?: boolean
}

export default function Scene({ showPlanet = true, variant = 'hero', introComplete, showMoon }: SceneProps) {
  if (variant === 'none') return null

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: true
        }}
        dpr={1}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <CameraRig />
          <ambientLight intensity={0.15} />
          <directionalLight position={[10, 8, 5]} intensity={0.8} />
          <SimpleStars />
          {showPlanet && variant === 'hero' && (
            <>
              <SafeEarth />
              <SafeMoon />
              <SimplePlanet />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
