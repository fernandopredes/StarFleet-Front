import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Planet: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return

        const currentRef = mountRef.current

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        currentRef.appendChild(renderer.domElement)

        const geometry = new THREE.SphereGeometry(1, 32, 32)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const sphere = new THREE.Mesh(geometry, material)

        scene.add(sphere)

        camera.position.z = 5

        const animate = () => {
            requestAnimationFrame(animate)
            sphere.rotation.y += 0.01
            renderer.render(scene, camera)
        };

        animate();

        return () => {
            currentRef.removeChild(renderer.domElement)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return <div ref={mountRef}></div>
}

export default Planet
