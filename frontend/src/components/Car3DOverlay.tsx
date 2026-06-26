import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface Car3DOverlayProps {
  route: string;
}

interface LayoutPreset {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export function Car3DOverlay({ route }: Car3DOverlayProps) {
  if (route === 'home') return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // References to communicate with Three.js loop
  const carGroupRef = useRef<THREE.Group | null>(null);
  const routeRef = useRef(route);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  // Sync route ref
  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movements for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. SCENE SETUP
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Transparent background
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // 2. LIGHTS SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLightRight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLightRight.position.set(5, 5, 5);
    scene.add(dirLightRight);

    const dirLightLeft = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLightLeft.position.set(-5, 5, 3);
    scene.add(dirLightLeft);

    const dirLightBack = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLightBack.position.set(0, 3, -5);
    scene.add(dirLightBack);

    // 3. LOAD 3D ASSET
    const loader = new GLTFLoader();
    const carWrapper = new THREE.Group();
    scene.add(carWrapper);

    // Load BMW X7 M60i model
    const modelUrl = '/3d assets/bmw_x7_m60i.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Boost material specifications slightly for glossiness
            if (child.material) {
              const mat = child.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness, 0.35);
              mat.metalness = Math.max(mat.metalness, 0.7);
            }
          }
        });

        // Center the loaded geometry
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.sub(center);

        // Normalize largest side scale to 2.2 units
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalScale = 2.4 / maxDim;
        gltf.scene.scale.set(normalScale, normalScale, normalScale);

        // Rotate the inner model slightly so we default to a premium 3/4 front angle
        gltf.scene.rotation.y = Math.PI / 12;

        carWrapper.add(gltf.scene);
        carGroupRef.current = carWrapper;
        
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('An error happened while loading 3D asset:', error);
        setLoadError(true);
      }
    );

    // Helper to get presets based on active route and viewport width
    const getPreset = (activeRoute: string, viewportWidth: number): LayoutPreset => {
      const isMobile = viewportWidth <= 768;

      if (isMobile) {
        // Mobile Presets
        switch (activeRoute) {
          case 'home':
            return {
              position: [0, 1.2, 0],
              rotation: [0.1, -0.4, 0],
              scale: 0.38
            };
          case 'showroom':
            return {
              position: [0.4, 1.3, 0],
              rotation: [0.15, 0.5, 0],
              scale: 0.28
            };
          case 'part-exchange':
            return {
              position: [0, 1.2, 0],
              rotation: [0, 0.6, 0],
              scale: 0.32
            };
          case 'soft-credit-checker':
            return {
              position: [0, 1.2, 0],
              rotation: [0, -0.6, 0],
              scale: 0.32
            };
          default:
            return {
              position: [0.5, 1.4, 0],
              rotation: [0, -0.5, 0],
              scale: 0.24
            };
        }
      } else {
        // Desktop Presets
        switch (activeRoute) {
          case 'home':
            return {
              position: [1.7, 0.2, 0],
              rotation: [0, -0.6, 0],
              scale: 0.55
            };
          case 'showroom':
            return {
              position: [-1.7, 0.4, 0],
              rotation: [0.1, 0.6, 0],
              scale: 0.45
            };
          case 'part-exchange':
            return {
              position: [-1.5, -0.3, 0],
              rotation: [0, 0.7, 0],
              scale: 0.48
            };
          case 'soft-credit-checker':
            return {
              position: [1.6, 0.3, 0],
              rotation: [0, -0.7, 0],
              scale: 0.42
            };
          case 'testimonials':
            return {
              position: [1.6, 0.5, 0],
              rotation: [0.1, -0.8, 0],
              scale: 0.38
            };
          case 'delivery':
            return {
              position: [-1.6, 0.3, 0],
              rotation: [0, 0.8, 0],
              scale: 0.42
            };
          case 'sourcing':
            return {
              position: [1.6, 0.3, 0],
              rotation: [0, -0.8, 0],
              scale: 0.42
            };
          default:
            return {
              position: [1.8, 0.6, 0],
              rotation: [0, -0.8, 0],
              scale: 0.35
            };
        }
      }
    };

    // 4. ANIMATION LOOP
    let animationFrameId: number;
    
    // Track target and current interpolation values
    const currentPos = new THREE.Vector3();
    const currentRot = new THREE.Euler();
    let currentScale = 0.001;

    const tick = () => {
      if (carGroupRef.current) {
        const viewportWidth = window.innerWidth;
        const preset = getPreset(routeRef.current, viewportWidth);

        // Scroll adjustments
        const scrollVal = scrollYRef.current;

        // Apply scroll offsets (car drives up/down slightly and rotates on scroll)
        const scrollYAdjustment = isLoaded ? -scrollVal * 0.0018 : 0;
        const scrollRyAdjustment = isLoaded ? scrollVal * 0.0012 : 0;

        // Mouse Parallax adjustment
        const parallaxX = mouseRef.current.x * 0.12;
        const parallaxY = mouseRef.current.y * 0.08;

        // Set target values
        const targetX = preset.position[0];
        const targetY = preset.position[1] + scrollYAdjustment;
        const targetZ = preset.position[2];

        const targetRotX = preset.rotation[0] + parallaxY;
        const targetRotY = preset.rotation[1] + scrollRyAdjustment + parallaxX;
        const targetRotZ = preset.rotation[2];

        // Smooth Lerping
        currentPos.x += (targetX - currentPos.x) * 0.05;
        currentPos.y += (targetY - currentPos.y) * 0.05;
        currentPos.z += (targetZ - currentPos.z) * 0.05;

        currentRot.x += (targetRotX - currentRot.x) * 0.05;
        currentRot.y += (targetRotY - currentRot.y) * 0.05;
        currentRot.z += (targetRotZ - currentRot.z) * 0.05;

        currentScale += (preset.scale - currentScale) * 0.05;

        // Apply to THREE.js object
        carGroupRef.current.position.copy(currentPos);
        carGroupRef.current.rotation.copy(currentRot);
        carGroupRef.current.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 5. RESIZE HANDLER
    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = canvasRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 6. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      
      // Deep resource cleanup
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, [isLoaded]);

  if (loadError) return null;

  return (
    <>
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-[40] pointer-events-none transition-opacity duration-1000 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0
        }}
      />

      {/* Global Loader Indicator (Top Corner) */}
      {!isLoaded && loadingProgress > 0 && loadingProgress < 100 && (
        <div className="fixed top-24 right-6 z-[45] bg-surface/90 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-glass flex items-center gap-2.5 text-xs text-textMuted font-medium select-none pointer-events-none">
          <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Optimizing 3D Experience ({loadingProgress}%)</span>
        </div>
      )}
    </>
  );
}
