'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three';

const ThreeJSAnimation = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Create a sphere to represent a globe
    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    camera.position.z = 10

    // Animation
    const animate = () => {
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    // using let for animationId so it can be reassigned
    let animationId;

    const animationLoop = () => {
      animationId = requestAnimationFrame(animationLoop)
      animate()
    }

    animationLoop()

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      // Dispose of Three.js objects
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} />
}

export default ThreeJSAnimation