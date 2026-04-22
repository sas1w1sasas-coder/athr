import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 180

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const { positions, colors, sizes, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const speeds = new Float32Array(PARTICLE_COUNT)
    const phases = new Float32Array(PARTICLE_COUNT * 3)

    const palette = [
      new THREE.Color('#c9a96e'),
      new THREE.Color('#d4af37'),
      new THREE.Color('#b8956a'),
      new THREE.Color('#e8d5b5'),
      new THREE.Color('#8b6914'),
      new THREE.Color('#f5e6c8'),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles in a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = Math.random() * 0.18 + 0.04
      speeds[i] = Math.random() * 0.3 + 0.1

      phases[i * 3] = Math.random() * Math.PI * 2
      phases[i * 3 + 1] = Math.random() * Math.PI * 2
      phases[i * 3 + 2] = Math.random() * Math.PI * 2
    }

    return { positions, colors, sizes, speeds, phases }
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorHelper = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const mx = (state.mouse.x * 0.5)
    const my = (state.mouse.y * 0.3)

    // Smooth mouse following
    mouseRef.current.x += (mx - mouseRef.current.x) * 0.02
    mouseRef.current.y += (my - mouseRef.current.y) * 0.02

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const speed = speeds[i]
      const phase = phases[i3]
      const phaseY = phases[i3 + 1]
      const phaseZ = phases[i3 + 2]

      // Gentle floating motion like perfume mist
      const floatX = Math.sin(time * speed * 0.4 + phase) * 0.8
      const floatY = Math.cos(time * speed * 0.3 + phaseY) * 0.5 + Math.sin(time * 0.15 + phaseY) * 0.3
      const floatZ = Math.sin(time * speed * 0.25 + phaseZ) * 0.4

      // Breathing scale effect
      const breathe = 1 + Math.sin(time * 0.5 + phase) * 0.15

      dummy.position.set(
        positions[i3] + floatX + mouseRef.current.x * (0.5 + i * 0.002),
        positions[i3 + 1] + floatY + mouseRef.current.y * (0.3 + i * 0.002),
        positions[i3 + 2] + floatZ
      )

      dummy.scale.setScalar(sizes[i] * breathe)
      dummy.rotation.set(
        time * 0.1 + phase,
        time * 0.15 + phaseY,
        time * 0.08 + phaseZ
      )

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)

      // Subtle color pulse
      const pulse = 0.85 + Math.sin(time * 0.4 + phase) * 0.15
      colorHelper.setRGB(colors[i3] * pulse, colors[i3 + 1] * pulse, colors[i3 + 2] * pulse)
      meshRef.current.setColorAt(i, colorHelper)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        transparent
        opacity={0.6}
        roughness={0.4}
        metalness={0.6}
        emissive="#c9a96e"
        emissiveIntensity={0.15}
      />
    </instancedMesh>
  )
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    groupRef.current.rotation.z = time * 0.03
    groupRef.current.rotation.x = Math.sin(time * 0.02) * 0.1
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -3 - i * 2]}>
          <torusGeometry args={[3 + i * 1.5, 0.015, 8, 100]} />
          <meshStandardMaterial
            color="#c9a96e"
            transparent
            opacity={0.12 - i * 0.03}
            emissive="#c9a96e"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

function AmbientLightRig() {
  return (
    <>
      <ambientLight intensity={0.4} color="#f5e6c8" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#c9a96e" distance={20} />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#d4af37" distance={15} />
      <pointLight position={[0, 8, -5]} intensity={0.8} color="#e8d5b5" distance={20} />
    </>
  )
}

export default function PerfumeParticles() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <AmbientLightRig />
        <Particles />
        <FloatingRings />
        <fog attach="fog" args={['#0c0a08', 12, 25]} />
      </Canvas>
    </div>
  )
}
