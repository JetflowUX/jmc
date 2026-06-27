import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Wrench, BadgeCheck } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function HeroCarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const carGroupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Default camera configuration (will be updated dynamically)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    // Lights Setup (same high-quality configuration as Car3DOverlay)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
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

    // GLTF Loading
    const loader = new GLTFLoader();
    const carWrapper = new THREE.Group();
    scene.add(carWrapper);

    const modelUrl = '/3d assets/bmw_x7_m60i.glb';

    loader.load(
      modelUrl,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const mat = child.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.min(mat.roughness, 0.35);
              mat.metalness = Math.max(mat.metalness, 0.7);
            }
          }
        });

        // Center the geometry and normalize its size
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.sub(center);

        // Normalize largest dimension to 1.0 unit (scaling handled dynamically inside the tick loop)
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalScale = 1.0 / maxDim;
        gltf.scene.scale.set(normalScale, normalScale, normalScale);

        // Set initial premium orientation (3/4 front view)
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
        console.error('Error loading car model inside Hero card:', error);
        setLoadError(true);
      }
    );

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const currentPos = new THREE.Vector3(0, 0, 0);
    const currentRot = new THREE.Euler(0, -0.6, 0); 
    let currentScale = 0.001;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const isMobile = window.innerWidth < 768;

      // Dynamically adjust camera parameters based on current viewport size
      camera.position.y = isMobile ? 0.60 : 0.70;
      camera.position.z = isMobile ? 5.2 : 5.0;

      // Dynamic resize of drawing buffer to match canvas display size
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }

      if (carGroupRef.current) {
        // Floating effect (sine wave oscillation)
        const floatOffset = Math.sin(elapsedTime * 1.5) * 0.06;
        const targetY = (isMobile ? 0.40 : 0.50) + floatOffset; 

        // Slowly spin over time
        const autoSpin = elapsedTime * 0.025;

        // Mouse Parallax adjustment
        const parallaxX = mouseRef.current.x * 0.22;
        const parallaxY = mouseRef.current.y * 0.12;

        // Set target parameters
        const targetX = 0;
        const targetZ = 0;
        
        const targetRotX = 0.05 + parallaxY;
        const targetRotY = -0.6 + autoSpin + parallaxX;
        const targetRotZ = 0;

        // Scale is adjusted dynamically for mobile vs desktop
        const targetScale = isMobile ? 1.65 : 2.15; 

        // Interpolate (Lerp) values for smooth transitions
        currentPos.x += (targetX - currentPos.x) * 0.05;
        currentPos.y += (targetY - currentPos.y) * 0.05;
        currentPos.z += (targetZ - currentPos.z) * 0.05;

        currentRot.x += (targetRotX - currentRot.x) * 0.05;
        currentRot.y += (targetRotY - currentRot.y) * 0.05;
        currentRot.z += (targetRotZ - currentRot.z) * 0.05;

        currentScale += (targetScale - currentScale) * 0.05;

        carGroupRef.current.position.copy(currentPos);
        carGroupRef.current.rotation.copy(currentRot);
        carGroupRef.current.scale.set(currentScale, currentScale, currentScale);

        // Point the camera to look at a target slightly below the car to render the car higher
        camera.lookAt(new THREE.Vector3(0, 0.05, 0));
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Resize Handler
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

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();

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
  }, []); // Empty dependency array prevents double loading the 19MB model

  if (loadError) return null;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full transition-opacity duration-1000 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3.5" />
          <span className="text-[10px] text-textMuted font-medium tracking-wider uppercase select-none">
            Preparing 3D Showroom {loadingProgress > 0 ? `(${loadingProgress}%)` : ''}
          </span>
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const trustBadges = [
    { icon: ShieldCheck, text: 'HPI Checked' },
    { icon: Wrench, text: '60 Point Inspection' },
    { icon: BadgeCheck, text: '12 Month MOT' },
    { icon: CheckCircle2, text: 'FCA Regulated' }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start md:justify-center py-12 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-background">
      {/* Drifting Organic Background Blobs (replicating Spline background) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-[32rem] h-72 md:h-[32rem] bg-primary/5 rounded-full blur-[85px] md:blur-[130px] animate-blob-1" />
        <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[36rem] h-80 md:h-[36rem] bg-border/40 rounded-full blur-[105px] md:blur-[145px] animate-blob-2" />
        <div className="absolute top-1/2 right-10 w-64 md:w-96 h-64 md:h-96 bg-primary/8 rounded-full blur-[75px] md:blur-[115px] animate-blob-1" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10 pt-12 md:pt-20">
        {/* Centered card mockup matching Spline project structure - fully responsive flex column on mobile and grid on desktop */}
        <div className="relative w-full bg-surface border border-border/80 shadow-glass rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-6 md:p-12 md:pb-16 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 min-h-none md:h-[600px]">
          
          {/* Vertical Divider line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-border/40 z-0 hidden md:block" />

          {/* Left Column (Main Brand / Headline) */}
          <div className="flex flex-col justify-between h-auto md:h-full z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-primary/85 uppercase mb-4 block">
                JMC Motors Heywood
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-serif font-light tracking-tight text-text leading-[1.05] mb-6">
                Find Your <br />
                Next Car
              </h1>
              <div className="pl-4 border-l-2 border-primary max-w-sm mt-6">
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-text uppercase mb-1.5">
                  Quality Approved Vehicles
                </h3>
                <p className="text-xs md:text-sm text-textMuted font-light leading-relaxed">
                  Experience premium car buying with transparency. Fully HPI checked, 60-point inspected, and ready to drive away.
                </p>
              </div>
            </motion.div>

            {/* Desktop Browse Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 md:mt-0 hidden md:block"
            >
              <a
                href="#/showroom"
                className="inline-block bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-glow hover:shadow-lg text-center"
              >
                Browse Showroom
              </a>
            </motion.div>
          </div>

          {/* 3D Car Canvas Wrapper - Inline on mobile, absolute overlay centered on desktop */}
          <div className="relative md:absolute w-full h-64 md:h-full md:w-[48%] md:left-[26%] md:top-0 z-10 pointer-events-none my-4 md:my-0 flex items-center justify-center">
            <HeroCarCanvas />
          </div>

          {/* Right Column (Promise / Actions) */}
          <div className="flex flex-col justify-between h-auto md:h-full z-20 relative text-left md:text-right md:items-end mt-4 md:mt-0">
            <div className="flex justify-between md:justify-end w-full">
              {/* Spline style Menu/Arrow button at top-right */}
              <div className="hidden md:block">
                <a
                  href="#/showroom"
                  className="w-11 h-11 border border-border/80 rounded-full flex items-center justify-center text-text hover:text-primary hover:border-primary transition-all duration-300 shadow-sm bg-surface"
                >
                  <svg className="w-4 h-4 transform rotate-[45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 md:mt-0 max-w-sm md:pl-4 text-left"
            >
              <div className="pl-4 border-l-2 border-primary md:border-l-0 md:border-r-2 md:border-primary md:pr-4 md:pl-0 text-left md:text-right">
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-text uppercase mb-1.5">
                  The JMC Promise
                </h3>
                <p className="text-xs md:text-sm text-textMuted font-light leading-relaxed">
                  Every vehicle undergoes our complete diagnostics inspection, complete with a minimum 12-month MOT and warranty.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-6 w-full"
            >
              {/* Actions stack for mobile, horizontal on larger screens */}
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-start md:justify-end">
                <a
                  href="#/showroom"
                  className="block md:hidden bg-primary hover:bg-primaryHover text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-glow hover:shadow-lg text-center"
                >
                  Browse Showroom
                </a>
                <a
                  href="#/soft-credit-checker"
                  className="flex items-center justify-center gap-3.5 group cursor-pointer bg-surface/50 backdrop-blur-sm border border-border/60 hover:border-primary/40 px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300 bg-primary/5">
                    <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-text uppercase group-hover:text-primary transition-colors">
                    Start Finance Check
                  </span>
                </a>
              </div>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-textMuted/40 uppercase mt-4 block text-left md:text-right">
                HEYWOOD
              </span>
            </motion.div>
          </div>

        </div>

        {/* Bottom Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 w-full border-t border-border/60 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-3 justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                <badge.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold tracking-wider text-text uppercase">
                {badge.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}