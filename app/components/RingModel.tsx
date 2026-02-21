'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

type RingProps = {
  bandColor: number;
  diamondColor: number;
};

// Component that loads and displays the ring
function Ring({ bandColor, diamondColor }: RingProps) {
  const { scene } = useGLTF('/models/small.glb');
  
  useEffect(() => {
    // Center the model
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    
    // Apply materials and update colors
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const name = child.name.toLowerCase();
        
        if (name.includes('gem') || name.includes('diamond')) {
          // Diamond material
          child.material = new THREE.MeshStandardMaterial({
            color: diamondColor,
            metalness: 0.3,
            roughness: 0.1,
            emissive: diamondColor,
            emissiveIntensity: 0.2
          });
        } else {
          // Band material
          child.material = new THREE.MeshStandardMaterial({
            color: bandColor,
            metalness: 1.0,
            roughness: 0.15
          });
        }
      }
    });
  }, [scene, bandColor, diamondColor]); // Re-run when colors change!
  
  return <primitive object={scene} />;
}

// Main component
type RingModelProps = {
  bandColor: number;
  diamondColor: number;
};

export default function RingModel({ bandColor, diamondColor }: RingModelProps) {
  return (
    <div style={{ width: '100%', height: '600px', background: '#fff' }}>
      <Canvas camera={{ position: [0, 1, 4], fov: 35 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 5, 2]} intensity={2} color="#fff5e1" />
        <directionalLight position={[-2, 2, -2]} intensity={1.5} />
        
        <Environment preset="studio" />
        
        <Ring bandColor={bandColor} diamondColor={diamondColor} />
        
        <OrbitControls 
          enableDamping 
          autoRotate 
          autoRotateSpeed={3}
          enablePan={false}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
}