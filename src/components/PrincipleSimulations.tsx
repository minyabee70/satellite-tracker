import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, Trail, Cone, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import type { OrbitType } from '../data/satellites';

const Earth = ({ opacity = 1.0, wireframe = false }) => {
  const map = useTexture('/textures/earth_map.jpg');
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial 
        map={wireframe ? null : map} 
        color={wireframe ? "#0044ff" : "#ffffff"} 
        wireframe={wireframe} 
        transparent={opacity < 1.0} 
        opacity={opacity} 
        roughness={0.8}
      />
    </Sphere>
  );
};

/* =========================================
   GEO Simulation: 3 satellites 120° apart
========================================= */
const GEOSatellite = ({ angle }: { angle: number }) => {
  // Cone needs to point from sat to Earth
  // Sat is at x=2.5. Vector to earth is -X.
  // A cone points UP (Y) by default. Rotate by Z to point to -X.
  return (
    <group rotation={[0, angle, 0]}>
      <Sphere position={[2.5, 0, 0]} args={[0.08, 16, 16]}>
        <meshBasicMaterial color="#ffaa00" />
        <group rotation={[0, 0, -Math.PI / 2]}>
          <Cone args={[1.1, 1.5, 32, 1, true]} position={[0, -0.75, 0]}>
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.25} side={THREE.DoubleSide} depthWrite={false} />
          </Cone>
        </group>
      </Sphere>
    </group>
  );
};

const GEOSimulation = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    // Both Earth and Satellites rotate together
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.5;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <group ref={groupRef}>
        <Earth />
        {[0, 1, 2].map((i) => (
          <GEOSatellite key={i} angle={(i / 3) * Math.PI * 2} />
        ))}
      </group>
    </>
  );
};

/* =========================================
   MEO Simulation: Intersecting Navigation planes
========================================= */
const MEOSatellite = ({ angleOffset, speed }: { angleOffset: number, speed: number }) => {
  const satRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (satRef.current) {
      const t = state.clock.getElapsedTime() * speed + angleOffset;
      satRef.current.position.set(2.0 * Math.cos(t), 2.0 * Math.sin(t), 0);
      satRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <Sphere ref={satRef} args={[0.06, 16, 16]}>
      <meshBasicMaterial color="#aaff00" />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <Cone args={[0.7, 1.0, 32, 1, true]} position={[0, -0.5, 0]}>
          <meshBasicMaterial color="#aaff00" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
        </Cone>
      </group>
    </Sphere>
  );
};

const MEOSimulation = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={earthRef}>
        <Earth opacity={0.7} />
      </group>
      {/* 3 planes, 8 satellites each */}
      {[0, 1, 2].map((plane) => (
        <group key={plane} rotation={[0, (Math.PI / 3) * plane, Math.PI / 3]}>
          <Line 
            points={Array.from({length: 64}).map((_, i) => new THREE.Vector3(2.0 * Math.cos((i/64)*Math.PI*2), 2.0 * Math.sin((i/64)*Math.PI*2), 0))}
            color="#aaff00" transparent opacity={0.1}
          />
          {Array.from({ length: 8 }).map((_, i) => (
            <MEOSatellite key={i} angleOffset={(i / 8) * Math.PI * 2} speed={0.4} />
          ))}
        </group>
      ))}
    </>
  );
};

/* =========================================
   LEO Simulation: Massive Constellation
========================================= */
const LEOConstellationSat = ({ angleOffset, speed }: { angleOffset: number, speed: number }) => {
  const satRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (satRef.current) {
      const t = state.clock.getElapsedTime() * speed + angleOffset;
      satRef.current.position.set(1.2 * Math.cos(t), 1.2 * Math.sin(t), 0);
      satRef.current.lookAt(0, 0, 0);
    }
  });
  return (
    <Sphere ref={satRef} args={[0.02, 8, 8]}>
      <meshBasicMaterial color="#00ffaa" />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <Cone args={[0.15, 0.25, 16, 1, true]} position={[0, -0.125, 0]}>
          <meshBasicMaterial color="#00ffaa" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
        </Cone>
      </group>
    </Sphere>
  );
};

const LEOSimulation = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={earthRef}>
        <Earth />
      </group>
      {/* 8 planes, 16 satellites each */}
      {Array.from({ length: 8 }).map((_, plane) => (
        <group key={plane} rotation={[0, (Math.PI / 8) * plane, Math.PI / 2.5]}>
          <Line 
            points={Array.from({length: 64}).map((_, i) => new THREE.Vector3(1.2 * Math.cos((i/64)*Math.PI*2), 1.2 * Math.sin((i/64)*Math.PI*2), 0))}
            color="#00ffaa" transparent opacity={0.05}
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <LEOConstellationSat key={i} angleOffset={(i / 16) * Math.PI * 2} speed={1.5} />
          ))}
        </group>
      ))}
    </>
  );
};

/* =========================================
   Polar Simulation
========================================= */
const PolarSimulation = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const satRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.5;
    if (satRef.current) {
      const t = state.clock.getElapsedTime() * 2.0;
      satRef.current.position.set(1.4 * Math.cos(t), 1.4 * Math.sin(t), 0);
      satRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <group ref={earthRef}>
        <Earth opacity={0.8} />
      </group>
      <Line 
        points={Array.from({length: 64}).map((_, i) => new THREE.Vector3(1.4 * Math.cos((i/64)*Math.PI*2), 1.4 * Math.sin((i/64)*Math.PI*2), 0))}
        color="#ff00aa" transparent opacity={0.2}
      />
      <Trail width={3} length={15} color="#ffffff">
        <Sphere ref={satRef} args={[0.08, 16, 16]}>
          <meshBasicMaterial color="#ffffff" />
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Cone args={[0.3, 0.4, 32, 1, true]} position={[0, -0.2, 0]}>
              <meshBasicMaterial color="#ff00aa" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
            </Cone>
          </group>
        </Sphere>
      </Trail>
    </>
  );
};

/* =========================================
   SSO Simulation (Sun-Synchronous Orbit)
========================================= */
const SSOSimulation = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const satRef = useRef<THREE.Mesh>(null);
  const sunRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // 1. Earth rotates (daily rotation, West to East)
    if (earthRef.current) earthRef.current.rotation.y -= delta * 1.0;
    
    // 2. Yearly revolution & Precession
    // The sun revolves around Earth (simulating Earth's orbit)
    // The orbital plane precesses at the exact same rate due to the equatorial bulge
    const yearSpeed = 0.3; // 1 year = ~20 seconds
    if (sunRef.current) sunRef.current.rotation.y += delta * yearSpeed;
    if (orbitGroupRef.current) orbitGroupRef.current.rotation.y += delta * yearSpeed;
    
    // 3. Satellite motion (orbiting Earth)
    if (satRef.current) {
      const t = state.clock.getElapsedTime() * 2.5;
      satRef.current.position.set(1.5 * Math.cos(t), 1.5 * Math.sin(t), 0);
      satRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Sun System rotating around Earth */}
      <group ref={sunRef}>
        {/* Sun is placed on the X axis */}
        <directionalLight position={[4, 0, 0]} intensity={2.0} color="#ffddaa" />
        <group position={[4, 0, 0]}>
          <Sphere args={[0.2, 32, 32]}>
            <meshBasicMaterial color="#ffcc00" />
          </Sphere>
          <Sphere args={[0.4, 32, 32]}>
            <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} depthWrite={false} />
          </Sphere>
        </group>
        {/* Line showing light direction to Earth */}
        <Line 
          points={[new THREE.Vector3(0,0,0), new THREE.Vector3(4,0,0)]} 
          color="#ffaa00" transparent opacity={0.3} 
        />
      </group>

      {/* Earth and Equatorial Bulge */}
      <group>
        <group ref={earthRef}>
          <Earth />
        </group>
        {/* Exaggerated Equatorial Bulge (Oblate Spheroid) to explain precession */}
        <Sphere args={[1.02, 32, 32]} scale={[1.1, 0.95, 1.1]}>
          <meshBasicMaterial color="#00ffaa" wireframe transparent opacity={0.15} />
        </Sphere>
      </group>

      {/* Orbit precessing around Y axis */}
      <group ref={orbitGroupRef}>
        {/* Tilted 98 degrees (90 degrees is polar, we add 8 degrees tilt) */}
        <group rotation={[0, 8 * (Math.PI / 180), 0]}>
          <Line 
            points={Array.from({length: 64}).map((_, i) => new THREE.Vector3(1.5 * Math.cos((i/64)*Math.PI*2), 1.5 * Math.sin((i/64)*Math.PI*2), 0))}
            color="#00ccff" transparent opacity={0.4}
          />
          <Trail width={3} length={15} color="#00ccff">
            <Sphere ref={satRef} args={[0.08, 16, 16]}>
              <meshBasicMaterial color="#00ccff" />
              <group rotation={[-Math.PI / 2, 0, 0]}>
                <Cone args={[0.3, 0.4, 32, 1, true]} position={[0, -0.2, 0]}>
                  <meshBasicMaterial color="#00ccff" transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
                </Cone>
              </group>
            </Sphere>
          </Trail>
        </group>
      </group>
    </>
  );
};

interface Props {
  orbitType: OrbitType;
}

const PrincipleSimulations: React.FC<Props> = ({ orbitType }) => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <React.Suspense fallback={null}>
        <color attach="background" args={['#000000']} />
        {orbitType === 'GEO' && <GEOSimulation />}
        {orbitType === 'MEO' && <MEOSimulation />}
        {orbitType === 'LEO' && <LEOSimulation />}
        {orbitType === 'POLAR' && <PolarSimulation />}
        {orbitType === 'SSO' && <SSOSimulation />}
      </React.Suspense>
    </Canvas>
  );
};

export default PrincipleSimulations;
