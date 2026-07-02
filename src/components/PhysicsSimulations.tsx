import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Box, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ({ radius = 1 }) => {
  const colorMap = useTexture('/textures/earth_map.jpg');
  return (
    <Sphere args={[radius, 32, 32]}>
      <meshStandardMaterial map={colorMap} roughness={0.8} />
    </Sphere>
  );
};

const NewtonCannonSimulation = () => {
  const ball1 = useRef<THREE.Mesh>(null);
  const ball2 = useRef<THREE.Mesh>(null);
  const ball3 = useRef<THREE.Mesh>(null);

  // Constants
  const R = 1.0; // Earth radius
  const H = 0.3; // Mountain height
  const startY = R + H;

  // Precompute paths
  const path1 = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 1.2; t += 0.05) {
      const x = 0.8 * t;
      const y = startY - 0.9 * t * t;
      if (x * x + y * y >= R * R * 0.98) {
        pts.push(new THREE.Vector3(x, y, 0));
      }
    }
    return pts;
  }, [R, startY]);

  const path2 = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 2.2; t += 0.05) {
      const x = 1.4 * t;
      // Wrap around the earth curvature roughly
      const angle = x / startY;
      const r = startY - 0.4 * t * t; // altitude drops
      if (r >= R * 0.98) {
        pts.push(new THREE.Vector3(r * Math.sin(angle), r * Math.cos(angle), 0));
      }
    }
    return pts;
  }, [R, startY]);

  const path3 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(startY * Math.sin(angle), startY * Math.cos(angle), 0));
    }
    return pts;
  }, [startY]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Ball 1 Animation (loops every 4s)
    const t1 = (t % 4) * 0.8;
    const p1Idx = Math.min(Math.floor((t1 / 1.2) * path1.length), path1.length - 1);
    if (ball1.current && path1[p1Idx]) {
      ball1.current.position.copy(path1[p1Idx]);
    }

    // Ball 2 Animation (loops every 4s)
    const t2 = (t % 4) * 0.8;
    const p2Idx = Math.min(Math.floor((t2 / 2.2) * path2.length), path2.length - 1);
    if (ball2.current && path2[p2Idx]) {
      ball2.current.position.copy(path2[p2Idx]);
    }

    // Ball 3 Animation (continuous orbit)
    if (ball3.current) {
      const angle = t * 2.0;
      ball3.current.position.set(startY * Math.sin(angle), startY * Math.cos(angle), 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      
      <Earth />
      
      {/* Mountain */}
      <Box args={[0.1, H, 0.1]} position={[0, R + H / 2, 0]}>
        <meshStandardMaterial color="#888888" />
      </Box>

      {/* Trajectory Lines */}
      <Line points={path1} color="#ff4444" lineWidth={2} transparent opacity={0.6} />
      <Line points={path2} color="#ffaa00" lineWidth={2} transparent opacity={0.6} />
      <Line points={path3} color="#00ffaa" lineWidth={2} transparent opacity={0.6} />

      {/* Projectiles */}
      <Sphere ref={ball1} args={[0.04, 16, 16]}>
        <meshBasicMaterial color="#ff4444" />
      </Sphere>
      <Sphere ref={ball2} args={[0.04, 16, 16]}>
        <meshBasicMaterial color="#ffaa00" />
      </Sphere>
      <Sphere ref={ball3} args={[0.05, 16, 16]}>
        <meshBasicMaterial color="#00ffaa" />
      </Sphere>
    </>
  );
};

const OrbitalDecaySimulation = () => {
  const satRef = useRef<THREE.Mesh>(null);
  const R = 1.0;
  const startAlt = 0.5;

  const spiralPath = useMemo(() => {
    const pts = [];
    const totalSpirals = 5;
    const pointsPerSpiral = 64;
    const totalPoints = totalSpirals * pointsPerSpiral;
    
    for (let i = 0; i <= totalPoints; i++) {
      const progress = i / totalPoints;
      const angle = progress * Math.PI * 2 * totalSpirals;
      // Exponential decay of altitude
      const currentAlt = startAlt * Math.pow(1 - progress, 2);
      const r = R + currentAlt;
      
      // Add slight z variation for 3D feel
      const z = Math.sin(angle * 0.5) * 0.2 * (1 - progress);
      pts.push(new THREE.Vector3(r * Math.cos(angle), r * Math.sin(angle), z));
    }
    return pts;
  }, [R, startAlt]);

  useFrame((state) => {
    if (satRef.current) {
      const t = (state.clock.getElapsedTime() * 0.1) % 1.0; // 0 to 1 loop every 10s
      const pIdx = Math.min(Math.floor(t * spiralPath.length), spiralPath.length - 1);
      
      if (spiralPath[pIdx]) {
        satRef.current.position.copy(spiralPath[pIdx]);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      <Earth />
      
      {/* Atmosphere Layer */}
      <Sphere args={[R + startAlt, 32, 32]}>
        <meshStandardMaterial color="#00ffff" transparent opacity={0.15} depthWrite={false} side={THREE.DoubleSide} />
      </Sphere>
      <Sphere args={[R + startAlt * 0.5, 32, 32]}>
        <meshStandardMaterial color="#0088ff" transparent opacity={0.2} depthWrite={false} side={THREE.DoubleSide} />
      </Sphere>

      <Line points={spiralPath} color="#ff3300" lineWidth={3} transparent opacity={0.8} />

      <Sphere ref={satRef} args={[0.06, 16, 16]}>
        <meshBasicMaterial color="#ffffff" />
      </Sphere>
    </>
  );
};

export const NewtonCannon = () => (
  <div className="mini-sim-container" style={{ margin: '2rem 0', height: '550px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
    <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
      <color attach="background" args={['#02040a']} />
      <NewtonCannonSimulation />
    </Canvas>
    <div className="instructions" style={{ bottom: '10px', fontSize: '0.9rem' }}>
      <span style={{ color: '#ff4444', marginRight: '10px' }}>■ 느림 (추락)</span>
      <span style={{ color: '#ffaa00', marginRight: '10px' }}>■ 중간 (멀리 추락)</span>
      <span style={{ color: '#00ffaa' }}>■ 빠름 (지속 궤도)</span>
    </div>
  </div>
);

export const OrbitalDecay = () => (
  <div className="mini-sim-container" style={{ margin: '2rem 0', height: '550px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
    <Canvas camera={{ position: [0, 1.5, 3.5], fov: 50 }}>
      <color attach="background" args={['#02040a']} />
      <OrbitalDecaySimulation />
    </Canvas>
    <div className="instructions" style={{ bottom: '10px', fontSize: '0.9rem' }}>
      대기 마찰에 의한 궤도 붕괴 시뮬레이션
    </div>
  </div>
);
