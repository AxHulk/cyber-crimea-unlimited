import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Generate Ai-Petri-like mountain wireframe vertices
function generateMountainGeometry() {
  const points: THREE.Vector3[] = [];
  const width = 12;
  const depth = 6;
  const resX = 40;
  const resZ = 20;

  for (let ix = 0; ix <= resX; ix++) {
    for (let iz = 0; iz <= resZ; iz++) {
      const x = (ix / resX - 0.5) * width;
      const z = (iz / resZ - 0.5) * depth;

      // Ai-Petri: flat plateau with dramatic cliffs
      const dist = Math.sqrt(x * x + z * z);
      let y = 0;

      // Main plateau
      const plateau = Math.max(0, 1.8 - Math.abs(x) * 0.3);
      // Sharp peaks
      const peak1 = Math.exp(-((x - 0.5) ** 2 + (z + 0.3) ** 2) * 2) * 2.5;
      const peak2 = Math.exp(-((x + 1.2) ** 2 + (z - 0.5) ** 2) * 1.5) * 2.0;
      const peak3 = Math.exp(-((x - 2) ** 2 + z ** 2) * 3) * 1.8;
      // Ridge line
      const ridge = Math.exp(-(z ** 2) * 4) * Math.max(0, 1.5 - Math.abs(x) * 0.2);

      y = plateau * 0.3 + peak1 + peak2 + peak3 + ridge;
      // Cliff drop-off
      y *= Math.max(0, 1 - (Math.abs(z) - 1.5) * 0.5);
      // Add noise
      y += Math.sin(x * 5 + z * 3) * 0.05 + Math.cos(x * 3 - z * 7) * 0.03;
      y = Math.max(0, y);

      points.push(new THREE.Vector3(x, y - 0.5, z));
    }
  }

  return { points, resX, resZ };
}

function MountainWireframe() {
  const meshRef = useRef<THREE.Group>(null);
  
  const { lineSegments } = useMemo(() => {
    const { points, resX, resZ } = generateMountainGeometry();
    const linePoints: number[] = [];
    const colors: number[] = [];
    
    const purpleColor = new THREE.Color("hsl(270, 80%, 60%)");
    const cyanColor = new THREE.Color("hsl(185, 100%, 50%)");
    const greenColor = new THREE.Color("hsl(120, 100%, 50%)");

    for (let ix = 0; ix <= resX; ix++) {
      for (let iz = 0; iz <= resZ; iz++) {
        const idx = ix * (resZ + 1) + iz;
        const p = points[idx];

        // Horizontal lines
        if (iz < resZ) {
          const p2 = points[idx + 1];
          linePoints.push(p.x, p.y, p.z, p2.x, p2.y, p2.z);
          
          const heightRatio = Math.max(p.y, p2.y) / 2.5;
          const c = new THREE.Color().lerpColors(cyanColor, purpleColor, heightRatio);
          colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }

        // Vertical lines
        if (ix < resX) {
          const p2 = points[(ix + 1) * (resZ + 1) + iz];
          linePoints.push(p.x, p.y, p.z, p2.x, p2.y, p2.z);
          
          const heightRatio = Math.max(p.y, p2.y) / 2.5;
          const c = new THREE.Color().lerpColors(cyanColor, purpleColor, heightRatio);
          colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return { lineSegments: geometry };
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.5, 0]} rotation={[0.3, -0.3, 0]}>
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial vertexColors transparent opacity={0.7} />
      </lineSegments>
      {/* Glow layer */}
      <lineSegments geometry={lineSegments}>
        <lineBasicMaterial vertexColors transparent opacity={0.15} linewidth={2} />
      </lineSegments>
    </group>
  );
}

// Floating holographic grid floor
function HoloGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      (gridRef.current.material as THREE.Material).opacity = 0.15 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 40, "#7c3aed", "#7c3aed"]}
      position={[0, -1.5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Floating particles around the mountain
function NeonParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors: particleColors } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const purple = new THREE.Color("hsl(270, 80%, 60%)");
    const cyan = new THREE.Color("hsl(185, 100%, 50%)");
    const green = new THREE.Color("hsl(120, 100%, 50%)");
    const colorOptions = [purple, cyan, green];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 4 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={200}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 55 }}
        className="absolute inset-0"
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0a14"]} />
        <fog attach="fog" args={["#0a0a14", 8, 20]} />

        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#7c3aed" />
        <pointLight position={[-5, 3, -5]} intensity={0.2} color="#00e5ff" />

        <MountainWireframe />
        <HoloGrid />
        <NeonParticles />
        <Stars radius={50} depth={50} count={2000} factor={3} saturation={0.5} fade speed={0.5} />
      </Canvas>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none scanline" />

      {/* Hero text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4">
        <div className="font-mono text-[10px] tracking-[0.3em] text-neon-cyan mb-4 opacity-70">
          ▸ INITIALIZING SYSTEM ▸ LOADING MODULES ▸ READY
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-center leading-tight glitch-text">
          <span className="bg-gradient-to-r from-neon-purple via-foreground to-neon-cyan bg-clip-text text-transparent">
            CRIMEA
          </span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[0.2em] text-foreground/80">
            DIGITAL_FRONTIER
          </span>
        </h1>

        <div className="mt-6 font-mono text-xs text-muted-foreground tracking-wider text-center">
          ФЕДЕРАЦИЯ КОМПЬЮТЕРНОГО СПОРТА РЕСПУБЛИКИ КРЫМ
        </div>

        <div className="mt-8 flex gap-4 pointer-events-auto">
          <a
            href="/tournaments"
            className="px-6 py-3 font-display text-xs tracking-wider bg-primary text-primary-foreground border border-primary hover:bg-primary/80 transition-all neon-glow-purple tactile-shadow"
          >
            ТУРНИРЫ →
          </a>
          <a
            href="/about"
            className="px-6 py-3 font-display text-xs tracking-wider border border-border text-foreground hover:border-primary hover:text-primary transition-all"
          >
            О ФЕДЕРАЦИИ
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-float">
          <div className="font-mono text-[9px] text-muted-foreground tracking-widest">SCROLL</div>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* HUD corners */}
      <div className="absolute top-24 left-4 w-16 h-16 border-t-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="absolute top-24 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/30 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-primary/30 pointer-events-none" />
    </div>
  );
}
