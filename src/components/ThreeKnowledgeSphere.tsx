import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeKnowledgeSphere: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer (Software WebGL friendly, antialias, powerPreference)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power'
      });
    } catch (e) {
      // Fallback if WebGL fails in container
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Main composite Knowledge Hub Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Center Core - Icosahedron Wireframe + Inner Sphere
    const innerGeom = new THREE.SphereGeometry(1.2, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5, // Indigo
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x312e81,
      emissiveIntensity: 0.4
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerSphere);

    const wireGeom = new THREE.IcosahedronGeometry(1.6, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa, // Sky Blue
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const wireIcosa = new THREE.Mesh(wireGeom, wireMat);
    coreGroup.add(wireIcosa);

    // 2. Orbital Rings (3 intersecting inclined rings)
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.1
    });
    const ringGeom = new THREE.TorusGeometry(2.4, 0.03, 16, 64);
    const ring1 = new THREE.Mesh(ringGeom, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7, // Purple
      metalness: 0.9,
      roughness: 0.1
    });
    const ring2 = new THREE.Mesh(ringGeom, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    const ring3 = new THREE.Mesh(ringGeom, new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald
      metalness: 0.8,
      roughness: 0.2
    }));
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // 3. Orbiting Subject Node Satellites (Math, AI, Science, Tech, Language)
    const nodesGroup = new THREE.Group();
    coreGroup.add(nodesGroup);

    const nodeColors = [0x38bdf8, 0xec4899, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x06b6d4];
    const nodeCount = nodeColors.length;
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4;
      const nodeGeom = new THREE.SphereGeometry(0.24, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        roughness: 0.1,
        metalness: 0.85,
        emissive: nodeColors[i],
        emissiveIntensity: 0.5
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 0.8,
        Math.sin(angle) * radius
      );
      nodesGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // 4. Ambient Sparkle Particle Cloud
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 2.6 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[i] = r * Math.cos(phi) * Math.sin(theta);
      particlePositions[i + 1] = r * Math.sin(phi);
      particlePositions[i + 2] = r * Math.cos(phi) * Math.cos(theta);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x6366f1, 2.0); // Indigo Key Light
    dirLight1.position.set(5, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.4); // Cyan Fill Light
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.8;
    };

    container.addEventListener('mousemove', onPointerMove);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      const elapsed = currentTime / 1000;

      // Exponential damping smoothing
      coreGroup.rotation.y += (targetRotationY + elapsed * 0.15 - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;

      wireIcosa.rotation.x += delta * 0.2;
      wireIcosa.rotation.y += delta * 0.25;

      ring1.rotation.z += delta * 0.3;
      ring2.rotation.z -= delta * 0.25;
      ring3.rotation.x += delta * 0.2;

      // Pulse inner core slightly
      const scale = 1.0 + Math.sin(elapsed * 2) * 0.04;
      innerSphere.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW && newH) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      ringGeom.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-80 sm:h-96 md:h-[420px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      title="BilimHub AI Interaktiv 3D Bilim Yadrosi — Aylantirish uchun sichqonchani harakatlantiring"
    />
  );
};
