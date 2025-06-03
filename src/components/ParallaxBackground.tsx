import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBackgroundProps {
  fadeIn?: boolean;
  fadeOut?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ fadeIn = false, fadeOut = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);

    // Initial opacity setup
    if (fadeIn) {
      opacityRef.current = 0;
      renderer.setClearColor(0x0a0a0a, 0);
    }

    // Fade in animation
    if (fadeIn) {
      gsap.to(opacityRef, {
        current: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          renderer.setClearColor(0x0a0a0a, opacityRef.current);
        }
      });
    }

    // Fade out animation
    if (fadeOut) {
      gsap.to(opacityRef, {
        current: 0,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => {
          renderer.setClearColor(0x0a0a0a, opacityRef.current);
        }
      });
    }

    // Camera position
    camera.position.z = 15;

    // Parallax groups for different layer speeds
    const parallaxGroups = [
      new THREE.Group(), // Foreground - fastest
      new THREE.Group(), // Mid-ground
      new THREE.Group(), // Background - slowest
    ];

    parallaxGroups.forEach(group => scene.add(group));

    // Materials
    const brightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      wireframe: true,
      transparent: true,
      opacity: 0.225
    });

    const accentMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    const dustMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.125
    });

    // Create geometric shapes
    function createGeometry(type: string, size: number, material: THREE.Material) {
      let geometry;
      switch(type) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(size, 16, 16);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(size, size, size);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(size);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(size);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(size, size * 0.3, 8, 16);
          break;
        default:
          geometry = new THREE.SphereGeometry(size, 12, 12);
      }
      return new THREE.Mesh(geometry, material);
    }

    // Populate parallax layers
    const shapes: any[] = [];
    const shapeTypes = ['sphere', 'box', 'octahedron', 'tetrahedron', 'torus'];

    // Layer 1 - Foreground
    for(let i = 0; i < 20; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const material = brightMaterial;
      const shape = createGeometry(type, Math.random() * 1.2 + 0.6, material);
      
      shape.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60,
        Math.random() * 15 + 5
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      parallaxGroups[0].add(shape);
      shapes.push({ 
        mesh: shape, 
        layer: 0, 
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        initialY: shape.position.y
      });
    }

    // Layer 2 - Mid-ground
    for(let i = 0; i < 30; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const shape = createGeometry(type, Math.random() * 1.5 + 0.8, accentMaterial);
      
      shape.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 70,
        Math.random() * 20 - 10
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      parallaxGroups[1].add(shape);
      shapes.push({ 
        mesh: shape, 
        layer: 1, 
        rotationSpeed: (Math.random() - 0.5) * 0.009,
        initialY: shape.position.y
      });
    }

    // Layer 3 - Background
    for(let i = 0; i < 40; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const shape = createGeometry(type, Math.random() * 2.0 + 0.5, dustMaterial);
      
      shape.position.set(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 60,
        Math.random() * 20 - 20
      );
      
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      parallaxGroups[2].add(shape);
      shapes.push({ 
        mesh: shape, 
        layer: 2, 
        rotationSpeed: (Math.random() - 0.5) * 0.006,
        initialY: shape.position.y
      });
    }

    // Scroll and mouse variables
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;

    // Mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollY = self.progress;
      }
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Update materials opacity based on fade state
      if (fadeIn || fadeOut) {
        const opacity = opacityRef.current;
        brightMaterial.opacity = 0.225 * opacity;
        accentMaterial.opacity = 0.2 * opacity;
        dustMaterial.opacity = 0.125 * opacity;
      }

      // Parallax movement based on scroll
      parallaxGroups[0].position.y = scrollY * 25;
      parallaxGroups[1].position.y = scrollY * 15;
      parallaxGroups[2].position.y = scrollY * 8;

      // Mouse parallax
      parallaxGroups[0].rotation.x = mouseY * 0.12;
      parallaxGroups[0].rotation.y = mouseX * 0.12;
      parallaxGroups[1].rotation.x = mouseY * 0.06;
      parallaxGroups[1].rotation.y = mouseX * 0.06;
      parallaxGroups[2].rotation.x = mouseY * 0.03;
      parallaxGroups[2].rotation.y = mouseX * 0.03;

      // Individual shape animations
      shapes.forEach((shapeData) => {
        const { mesh, rotationSpeed } = shapeData;
        
        // Rotation
        mesh.rotation.x += rotationSpeed;
        mesh.rotation.y += rotationSpeed * 0.8;
        mesh.rotation.z += rotationSpeed * 0.5;
        
        // Floating motion
        mesh.position.y += Math.sin(Date.now() * 0.0005 + mesh.position.x) * 0.0075;
        
        // Wrap around effect
        if (mesh.position.y < -40) {
          mesh.position.y = 40;
        } else if (mesh.position.y > 40) {
          mesh.position.y = -40;
        }
      });

      renderer.render(scene, camera);
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParallaxBackground; 