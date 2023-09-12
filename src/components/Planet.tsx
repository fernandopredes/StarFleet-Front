import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const Background = styled.div`

`

const PlanetContainer = styled.div`
  width: 200px;
  height: 300px;
  background: transparent;
`;

interface PlanetProps {
  name: string;
  image: string;
  dimensions: [number, number, number];
  onClick?: () => void;
}

const Planet: React.FC<PlanetProps> = ({ name, image, dimensions, onClick }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!mountRef.current) return

      const currentRef = mountRef.current

      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(400, 160);
      const aspectRatio = 400 / 160; 
      const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

      renderer.setSize(400,160);
      currentRef.appendChild(renderer.domElement)

      const geometry = new THREE.SphereGeometry(...dimensions);


      const textureLoader = new THREE.TextureLoader();
      const planetTexture = textureLoader.load(`${image}`);

      // Usando a textura no material
      const material = new THREE.MeshBasicMaterial({ map: planetTexture });

      const sphere = new THREE.Mesh(geometry, material)

      scene.add(sphere)

      camera.position.z = 2.5

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
  }, [dimensions, image])

    return (
      <Background onClick={onClick}>
          <h2>{name}</h2>
          <PlanetContainer ref={mountRef}></PlanetContainer>
      </Background>
  )
}

export default Planet
