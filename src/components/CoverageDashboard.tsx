import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import '../index.css';

const Earth = () => {
  const map = useTexture('/textures/earth_map.jpg');
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial map={map} roughness={0.8} />
    </Sphere>
  );
};

const OrbitRing = ({ radius, color, speed, satCount, size }: { radius: number, color: string, speed: number, satCount: number, size: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += delta * speed;
  });

  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      <Line 
        points={Array.from({length: 64}).map((_, i) => new THREE.Vector3(radius * Math.cos((i/64)*Math.PI*2), radius * Math.sin((i/64)*Math.PI*2), 0))}
        color={color} transparent opacity={0.2}
      />
      <group ref={groupRef}>
        {Array.from({ length: satCount }).map((_, i) => {
          const angle = (i / satCount) * Math.PI * 2;
          return (
            <Sphere key={i} position={[radius * Math.cos(angle), radius * Math.sin(angle), 0]} args={[size, 16, 16]}>
              <meshBasicMaterial color={color} />
            </Sphere>
          );
        })}
      </group>
    </group>
  );
};

const InnerMultiOrbitSim = () => {
  const earthGroupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (earthGroupRef.current) earthGroupRef.current.rotation.y += delta * 0.2;
  });

  return (
    <>
      <color attach="background" args={['#02040a']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <group ref={earthGroupRef}>
        <Earth />
      </group>
      <OrbitRing radius={1.3} color="#00ffaa" speed={1.5} satCount={12} size={0.03} />
      <OrbitRing radius={2.2} color="#aaff00" speed={0.8} satCount={8} size={0.05} />
      <OrbitRing radius={3.8} color="#ffaa00" speed={0.2} satCount={3} size={0.08} />
    </>
  );
};

const MultiOrbitSim = () => {
  return (
    <div className="mini-sim-container" style={{ margin: '0 0 2rem 0', height: '350px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
      <Canvas camera={{ position: [0, -1, 5.5], fov: 50 }}>
        <React.Suspense fallback={null}>
          <InnerMultiOrbitSim />
        </React.Suspense>
      </Canvas>
      <div className="instructions" style={{ bottom: '10px', fontSize: '0.9rem' }}>
        <span style={{ color: '#00ffaa', marginRight: '10px' }}>■ LEO (가장 빠름)</span>
        <span style={{ color: '#aaff00', marginRight: '10px' }}>■ MEO (중간 속도)</span>
        <span style={{ color: '#ffaa00' }}>■ GEO (지구 자전과 동일)</span>
      </div>
    </div>
  );
};

interface CoverageDashboardProps {
  onClose: () => void;
}

const CoverageDashboard: React.FC<CoverageDashboardProps> = ({ onClose }) => {
  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-modal article-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dashboard-close" onClick={onClose}>&times;</button>
        
        <div className="article-content">
          <h2 className="title" style={{ marginTop: 0, marginBottom: '1rem', color: '#00ccff' }}>위성 궤도별 커버리지 및 활용 목적 비교</h2>
          <p>
            위성은 단순히 높이에 따라 분류되는 것이 아니라, <strong>원하는 서비스 특성(지연시간, 해상도, 커버리지, 재방문주기 등)</strong>에 맞춰 궤도를 선택합니다.
          </p>

          <MultiOrbitSim />

          <h3>1. 주요 궤도 비교표</h3>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>고도</th>
                  <th>1기당 커버리지</th>
                  <th>지구 전체 커버 위성 수</th>
                  <th>지연시간</th>
                  <th>주요 활용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>LEO</td>
                  <td>160~2,000km</td>
                  <td>매우 작음 (반경 수백~수천 km)</td>
                  <td>수십~수천 기</td>
                  <td>매우 낮음 (20~50ms)</td>
                  <td>통신, 인터넷, 지구관측</td>
                </tr>
                <tr>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>MEO</td>
                  <td>2,000~35,786km</td>
                  <td>중간</td>
                  <td>10~30기</td>
                  <td>중간 (50~150ms)</td>
                  <td>항법, 일부 통신</td>
                </tr>
                <tr>
                  <td style={{color: '#ffaa00', fontWeight: 'bold'}}>GEO</td>
                  <td>35,786km</td>
                  <td>매우 큼 (지구 약 42%)</td>
                  <td>3기</td>
                  <td>높음 (500~600ms)</td>
                  <td>방송, 통신, 기상</td>
                </tr>
                <tr>
                  <td style={{color: '#ff00aa', fontWeight: 'bold'}}>Polar</td>
                  <td>다양</td>
                  <td>좁은 띠 형태</td>
                  <td>다수</td>
                  <td>다양</td>
                  <td>극지 관측, 정찰</td>
                </tr>
                <tr>
                  <td style={{color: '#00ccff', fontWeight: 'bold'}}>SSO</td>
                  <td>500~800km</td>
                  <td>좁은 띠 형태</td>
                  <td>다수</td>
                  <td>낮음</td>
                  <td>정밀 지구관측</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" />

          <h3>2. 해사 분야 관점에서 비교</h3>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>분야</th>
                  <th>최적 궤도</th>
                  <th>이유</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>LRIT (장거리 선박 추적)</td>
                  <td>GEO</td>
                  <td>넓은 커버리지로 대양의 선박 파악 가능</td>
                </tr>
                <tr>
                  <td>위성 AIS</td>
                  <td>LEO</td>
                  <td>낮은 지연, 한 번에 촘촘한 선박 데이터 수집</td>
                </tr>
                <tr>
                  <td>GPS 항법</td>
                  <td>MEO</td>
                  <td>전 지구를 사각지대 없이 커버하는 위치 정보 제공</td>
                </tr>
                <tr>
                  <td>북극항로 모니터링</td>
                  <td>LEO / Polar</td>
                  <td>유일하게 극지방을 커버할 수 있는 궤도</td>
                </tr>
                <tr>
                  <td>해양환경 감시 (오염 등)</td>
                  <td>SSO</td>
                  <td>매일 같은 조건에서 바다 변화를 촬영하여 분석 용이</td>
                </tr>
                <tr>
                  <td>태풍 감시</td>
                  <td>GEO</td>
                  <td>고정된 위치에서 태풍의 이동 경로를 24시간 연속 관측</td>
                </tr>
                <tr>
                  <td>MASS 자율운항</td>
                  <td>GEO + LEO</td>
                  <td>광역 커버리지(GEO)와 대용량/저지연 데이터(LEO)의 융합 필요</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="highlight-box" style={{ marginTop: '3rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>한눈에 이해하기</h3>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong style={{color: '#00ffaa'}}>LEO</strong> : 빠르다, 낮다, 많이 필요하다.</li>
              <li><strong style={{color: '#aaff00'}}>MEO</strong> : 적당하다, 항법에 최적.</li>
              <li><strong style={{color: '#ffaa00'}}>GEO</strong> : 넓다, 느리다, 항상 보인다.</li>
              <li><strong style={{color: '#ff00aa'}}>Polar</strong> : 지구 전체를 훑는다.</li>
              <li><strong style={{color: '#00ccff'}}>SSO</strong> : 같은 시간에 반복 촬영한다.</li>
            </ul>
            <p style={{ marginTop: '1.5rem', marginBottom: 0 }}>
              즉, <strong>어떤 궤도가 무조건 더 좋은 것이 아니라, 원하는 서비스의 특성에 따라 가장 적합한 궤도를 선택한 결과가 지금의 위성 체계</strong>입니다. 특히 해사 분야는 최근 GEO(안정적 광역 통신) + LEO(저지연) + MEO(GNSS) + SSO(해양관측)를 결합한 <strong>다중궤도(Multi-Orbit) 체계</strong>로 발전하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverageDashboard;
