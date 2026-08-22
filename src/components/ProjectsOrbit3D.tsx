import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import './ProjectsOrbit3D.css';

interface RepoNode {
  id: string;
  label: string;
  url: string;
}

const REPOS: RepoNode[] = [
  { id: 'rasco-gosi', label: 'Rasco-Gosi', url: 'https://github.com/AlirezaRg/Rasco-Gosi' },
  { id: 'ex-changes-code', label: 'Ex-Changes-Code', url: 'https://github.com/AlirezaRg/Ex-Changes-Code' },
  { id: 'code-analysis', label: 'code-analysis', url: 'https://github.com/AlirezaRg/code-analysis' },
  { id: 'codeiish-3d', label: 'codeiish-3d', url: 'https://github.com/AlirezaRg/codeiish-3d' },
  { id: 'codeiish-ir', label: 'codeiish.ir', url: 'https://github.com/AlirezaRg/codeiish.ir' },
  { id: 'herossite', label: 'herossite', url: 'https://github.com/AlirezaRg/herossite' },
  { id: 'luman-site', label: 'luman-site', url: 'https://github.com/AlirezaRg/luman-site' },
  { id: 'ironman', label: 'ironman-', url: 'https://github.com/AlirezaRg/ironman-' },
  { id: 'candlestick-ohlc-converter', label: 'candlestick-ohlc-converter', url: 'https://github.com/AlirezaRg/candlestick-ohlc-converter' },
  { id: 'sd-food', label: 'sd-food', url: 'https://github.com/AlirezaRg/sd-food' },
  { id: 'batman', label: 'batman', url: 'https://github.com/AlirezaRg/batman' },
  { id: 'hand-mouse-control', label: 'hand-mouse-control', url: 'https://github.com/AlirezaRg/hand-mouse-control' },
  { id: 'cv-playground', label: 'cv-playground', url: 'https://github.com/AlirezaRg/cv-playground' },
  { id: 'pdf-insurance-to-excel', label: 'pdf-insurance-to-excel', url: 'https://github.com/AlirezaRg/pdf-insurance-to-excel' },
  { id: 'instagram-bot', label: 'instagram_bot', url: 'https://github.com/AlirezaRg/instagram_bot' },
  { id: 'insta-exel', label: 'insta-exel', url: 'https://github.com/AlirezaRg/insta-exel' },
  { id: 'telegram-downloader', label: 'telegram_downloader', url: 'https://github.com/AlirezaRg/telegram_downloader' },
  { id: 'bottelegram-id', label: 'bottelegram_id', url: 'https://github.com/AlirezaRg/bottelegram_id' },
  { id: 'chrome-extentions', label: 'chrome-extentions', url: 'https://github.com/AlirezaRg/chrome-extentions' },
  { id: 'telegrambot-video01', label: 'telegrambot-video01', url: 'https://github.com/AlirezaRg/telegrambot-video01' },
];

const RADIUS = 4.4;
// electric cyan -> violet -> magenta sweep, used for both nodes & their lines
const HUE_START = 0.5; // cyan
const HUE_END = 0.86; // magenta/pink

function hueColor(t: number, sat = 0.85, light = 0.58) {
  return new THREE.Color().setHSL(HUE_START + (HUE_END - HUE_START) * t, sat, light);
}

/** Evenly distributes n points on a sphere (fibonacci sphere). */
function fibonacciSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([Math.cos(theta) * r * RADIUS, y * RADIUS * 0.82, Math.sin(theta) * r * RADIUS]);
  }
  return pts;
}

function CenterHub() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.05;
      meshRef.current.scale.setScalar(s);
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    const hue = (0.55 + Math.sin(t * 0.25) * 0.18 + 1) % 1;
    const c = new THREE.Color().setHSL(hue, 0.9, 0.6);
    if (matRef.current) {
      matRef.current.color.set(c);
      matRef.current.emissive.set(c);
    }
    if (lightRef.current) lightRef.current.color.set(c);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.35, 96, 96]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2.4}
          roughness={0.15}
          metalness={0.3}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
      <Sparkles count={70} scale={3} size={3} speed={0.4} color="#7dd3ff" opacity={0.9} />
      <Sparkles count={50} scale={3.6} size={2.2} speed={0.25} color="#ff6ec7" opacity={0.7} />
      <pointLight ref={lightRef} color="#8b5cf6" intensity={22} distance={10} decay={2} />
      <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
        <div className="po3-center-label">AlirezaRg</div>
      </Html>
    </group>
  );
}

function RepoNodeMesh({
  repo,
  position,
  hue,
}: {
  repo: RepoNode;
  position: [number, number, number];
  hue: number;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const color = useMemo(() => hueColor(hue), [hue]);
  const colorHex = useMemo(() => `#${color.getHexString()}`, [color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const s = hovered ? 2.1 : 1 + Math.sin(t * 2 + position[0]) * 0.14;
      meshRef.current.scale.setScalar(s);
    }
  });

  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...position)]);
    return g;
  }, [position]);

  return (
    <group>
      <primitive object={new THREE.Line(lineGeom, new THREE.LineBasicMaterial({
        color: hovered ? colorHex : '#5b6cff',
        transparent: true,
        opacity: hovered ? 0.95 : 0.14,
      }))} />
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); window.open(repo.url, '_blank', 'noopener,noreferrer'); }}
      >
        <icosahedronGeometry args={[0.17, 1]} />
        <meshStandardMaterial
          color={colorHex}
          emissive={colorHex}
          emissiveIntensity={hovered ? 3.6 : 1.4}
          roughness={0.25}
          metalness={0.4}
        />
        <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
          <div
            className={`po3-node-label ${hovered ? 'is-hot' : ''}`}
            style={{ ['--po3-node-color' as any]: colorHex }}
          >
            {repo.label}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function Scene() {
  const positions = useMemo(() => fibonacciSphere(REPOS.length), []);
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.045;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <Stars radius={35} depth={25} count={1400} factor={2.2} saturation={0.4} fade speed={0.5} />
      <group ref={groupRef}>
        <CenterHub />
        {REPOS.map((repo, i) => (
          <RepoNodeMesh
            key={repo.id}
            repo={repo}
            position={positions[i]}
            hue={i / (REPOS.length - 1)}
          />
        ))}
      </group>
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={5}
        maxDistance={14}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} luminanceSmoothing={0.85} mipmapBlur />
        <ChromaticAberration offset={[0.0009, 0.0009]} />
      </EffectComposer>
    </>
  );
}

export default function ProjectsOrbit3D() {
  return (
    <div className="po3-canvas-wrap">
      <Canvas camera={{ position: [0, 1.5, 9.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
