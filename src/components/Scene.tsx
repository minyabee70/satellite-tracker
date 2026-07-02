import React, { useRef, useMemo, createContext, useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

export const SpeedContext = createContext<number>(1);
import { OrbitControls, Stars, Line, Sphere, Trail, Cone, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { satelliteData } from '../data/satellites';
import type { OrbitType } from '../data/satellites';
// Math constants
const EARTH_RADIUS = 1;
// Scaled for visual purposes. Real ratio for GEO is ~6.6
const ORBIT_PARAMS = {
  LEO: { radius: 1.5, inclination: 0.5, speed: 1.5, color: satelliteData.LEO.color, funnelHeight: 0.5, funnelRadius: 0.3 },
  MEO: { radius: 2.5, inclination: 0.8, speed: 0.6, color: satelliteData.MEO.color, funnelHeight: 1.5, funnelRadius: 0.8 },
  GEO: { radius: 4.5, inclination: 0, speed: 0.2, color: satelliteData.GEO.color, funnelHeight: 3.5, funnelRadius: 1.0 },
  POLAR: { radius: 1.4, inclination: Math.PI / 2, speed: 2.0, color: satelliteData.POLAR.color, funnelHeight: 0.4, funnelRadius: 0.25 },
  SSO: { radius: 1.4, inclination: 98 * (Math.PI / 180), speed: 2.0, color: satelliteData.SSO.color, funnelHeight: 0.4, funnelRadius: 0.25 },
};

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const colorMap = useTexture('/textures/earth_map.jpg');

  const speedMultiplier = useContext(SpeedContext);

  useFrame((_, delta) => {
    // Earth rotates West to East (counter-clockwise from North Pole)
    if (earthRef.current) {
      earthRef.current.rotation.y -= delta * 0.2 * speedMultiplier; 
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= delta * 0.22 * speedMultiplier;
    }
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[EARTH_RADIUS, 64, 64]}>
        <meshStandardMaterial 
          map={colorMap}
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>
      {/* Atmosphere/clouds overlay for premium tech look */}
      <Sphere ref={cloudsRef} args={[EARTH_RADIUS * 1.01, 32, 32]}>
        <meshBasicMaterial 
          color="#00e5ff" 
          wireframe={true} 
          transparent={true} 
          opacity={0.15} 
        />
      </Sphere>
      {/* Glow */}
      <Sphere args={[EARTH_RADIUS * 1.05, 32, 32]}>
        <meshBasicMaterial 
          color="#0044ff" 
          transparent={true} 
          opacity={0.05} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

const YEAR_SPEED = 0.05;

const Sun = () => {
  const sunGroupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const speedMultiplier = useContext(SpeedContext);
  
  useFrame((_, delta) => {
    timeRef.current += delta * speedMultiplier;
    if (sunGroupRef.current) {
      // Sun revolves around the Earth over time
      sunGroupRef.current.rotation.y = -timeRef.current * YEAR_SPEED;
    }
  });

  return (
    <group ref={sunGroupRef}>
      <directionalLight position={[15, 0, 0]} intensity={2.5} color="#ffddaa" />
      <group position={[15, 0, 0]}>
        <Sphere args={[0.5, 32, 32]}>
          <meshBasicMaterial color="#ffcc00" />
        </Sphere>
        <Sphere args={[1.0, 32, 32]}>
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.3} depthWrite={false} />
        </Sphere>
      </group>
    </group>
  );
};

interface OrbitProps {
  type: OrbitType;
  active: boolean;
  isCompareTarget?: boolean;
}

const Satellite = ({ type, active, isCompareTarget }: OrbitProps) => {
  const satRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const params = ORBIT_PARAMS[type];
  const timeRef = useRef(0);
  const speedMultiplier = useContext(SpeedContext);

  // Create trajectory points
  const points = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // Parametric equation for inclined circular orbit
      const x = params.radius * Math.cos(theta);
      const y = params.radius * Math.sin(theta) * Math.sin(params.inclination);
      const z = params.radius * Math.sin(theta) * Math.cos(params.inclination);
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [params]);

  useFrame((_, delta) => {
    timeRef.current += delta * speedMultiplier;
    const t = timeRef.current * params.speed;

    if (satRef.current) {
      satRef.current.position.x = params.radius * Math.cos(t);
      satRef.current.position.y = params.radius * Math.sin(t) * Math.sin(params.inclination);
      satRef.current.position.z = params.radius * Math.sin(t) * Math.cos(params.inclination);
      satRef.current.lookAt(0, 0, 0);
    }

    if (type === 'SSO' && orbitGroupRef.current) {
      // SSO orbit precesses at exactly the same rate as the Sun revolves
      // Initial offset of PI/2 makes it a dawn-dusk orbit
      orbitGroupRef.current.rotation.y = (Math.PI / 2) - timeRef.current * YEAR_SPEED;
    }
  });

  return (
    <group ref={orbitGroupRef}>
      {/* Orbit path line */}
      <Line 
        points={points} 
        color={params.color} 
        lineWidth={active ? 2 : (isCompareTarget ? 2 : 1)}
        transparent={true}
        opacity={active ? 0.6 : (isCompareTarget ? 0.4 : 0.15)}
      />
      
      {/* Satellite object with Trail */}
      <Trail
        width={active ? 4 : 1}
        length={Math.max(2, Math.floor((active ? 25 : 8) / Math.sqrt(speedMultiplier)))}
        color={params.color}
        attenuation={(t) => t * t}
      >
        <Sphere ref={satRef} args={[0.04, 16, 16]}>
          <meshBasicMaterial 
            color={params.color} 
            transparent={true}
            opacity={active ? 1 : (isCompareTarget ? 0.7 : 0.3)}
          />
          {/* Coverage Funnel (Cone) */}
          {active && (
            <Cone 
              args={[params.funnelRadius, params.funnelHeight, 32, 1, true]} 
              position={[0, 0, params.funnelHeight / 2]} 
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <meshBasicMaterial 
                color={params.color} 
                transparent={true} 
                opacity={0.15} 
                side={THREE.DoubleSide} 
                depthWrite={false}
              />
            </Cone>
          )}
        </Sphere>
      </Trail>
      
      {/* Highlight glow if active */}
      {active && (
        <Sphere position={satRef.current?.position || new THREE.Vector3()} args={[0.08, 16, 16]}>
          <meshBasicMaterial 
            color={params.color} 
            transparent={true} 
            opacity={0.3} 
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      )}
    </group>
  );
};

interface SceneProps {
  activeOrbit: OrbitType;
  speedMultiplier?: number;
}

const Scene: React.FC<SceneProps> = ({ activeOrbit, speedMultiplier = 1 }) => {
  return (
    <div className="canvas-container">
      <SpeedContext.Provider value={speedMultiplier}>
        <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
          <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.2} />
        
        <Sun />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <group rotation={[0, 0, THREE.MathUtils.degToRad(-23.5)]}>
          {/* Axis of rotation passing through North and South poles */}
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 3.5, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
          </mesh>
          
          <Earth />
          
          {(Object.keys(ORBIT_PARAMS) as OrbitType[]).map((type) => {
            const isCompareTarget = activeOrbit === 'SSO' && type === 'POLAR';
            return (
              <Satellite 
                key={type} 
                type={type} 
                active={activeOrbit === type} 
                isCompareTarget={isCompareTarget} 
              />
            );
          })}
        </group>
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          autoRotate={false}
          minDistance={1.5}
          maxDistance={15}
        />
      </Canvas>
      </SpeedContext.Provider>
      <div className="instructions">
        마우스 우클릭: 이동 | 휠: 확대/축소 | 좌클릭 드래그: 회전 (지구를 위아래로 돌려보세요)
      </div>
    </div>
  );
};

export default Scene;
