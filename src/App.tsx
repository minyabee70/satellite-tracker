import { useState } from 'react';
import Scene from './components/Scene';
import UIPanel from './components/UIPanel';
import RightPanel from './components/RightPanel';
import Dashboard from './components/Dashboard';
import CoverageDashboard from './components/CoverageDashboard';
import OrbitPrinciple from './components/OrbitPrinciple';
import MultiOrbitSystem from './components/MultiOrbitSystem';
import NavMenu from './components/NavMenu';
import type { OrbitType } from './data/satellites';
import './index.css';

function App() {
  const [activeOrbit, setActiveOrbit] = useState<OrbitType>('LEO');
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [showCoverage, setShowCoverage] = useState<boolean>(false);
  const [showPrinciple, setShowPrinciple] = useState<boolean>(false);
  const [showMultiOrbit, setShowMultiOrbit] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  return (
    <>
      <UIPanel activeOrbit={activeOrbit} setActiveOrbit={setActiveOrbit} />
      
      <div className="canvas-container">
        <Scene activeOrbit={activeOrbit} speedMultiplier={speedMultiplier} />
        <NavMenu activeOrbit={activeOrbit} setActiveOrbit={setActiveOrbit} />
        
        {/* Speed Controls Overlay (Now inside canvas-container) */}
        <div className="speed-controls" style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10,
          background: 'rgba(5,5,16,0.8)',
          padding: '12px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '4px', textAlign: 'center', opacity: 0.8 }}>
            시뮬레이션 속도
          </div>
          <button 
            className={`speed-btn ${speedMultiplier === 1 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(1)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #444', background: speedMultiplier === 1 ? '#00e5ff' : 'transparent', color: speedMultiplier === 1 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            1x (정상)
          </button>
          <button 
            className={`speed-btn ${speedMultiplier === 10 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(10)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #444', background: speedMultiplier === 10 ? '#00e5ff' : 'transparent', color: speedMultiplier === 10 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            10x (빠르게)
          </button>
          <button 
            className={`speed-btn ${speedMultiplier === 100 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(100)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #444', background: speedMultiplier === 100 ? '#00e5ff' : 'transparent', color: speedMultiplier === 100 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            100x (매우 빠르게)
          </button>
        </div>
      </div>

      <RightPanel activeOrbit={activeOrbit} />

      <div className="top-nav-container">
        <div className="center-nav-menu">
          <button 
            className={`center-nav-button ${showPrinciple ? 'active' : ''}`} 
            onClick={() => setShowPrinciple(true)}
          >
            위성이 궤도에 머무는 원리
          </button>
          <button 
            className={`center-nav-button ${showDashboard ? 'active' : ''}`} 
            onClick={() => setShowDashboard(true)}
          >
            전체 궤도 비교 대시보드
          </button>
          <button 
            className={`center-nav-button ${showCoverage ? 'active' : ''}`} 
            onClick={() => setShowCoverage(true)}
          >
            위성 궤도별 커버리지 및 활용 비교
          </button>
          <button 
            className={`center-nav-button ${showMultiOrbit ? 'active' : ''}`} 
            onClick={() => setShowMultiOrbit(true)}
          >
            다중궤도(Multi-Orbit) 체계
          </button>
        </div>
      </div>

      {showCoverage && <CoverageDashboard onClose={() => setShowCoverage(false)} />}
      {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}
      {showPrinciple && <OrbitPrinciple onClose={() => setShowPrinciple(false)} />}
      {showMultiOrbit && <MultiOrbitSystem onClose={() => setShowMultiOrbit(false)} />}


      <div style={{ position: 'fixed', bottom: '15px', right: '25px', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', zIndex: 10, pointerEvents: 'none', letterSpacing: '0.5px' }}>
        제작자 : 김민엽 (minyabee@naver.com)
      </div>
    </>
  );
}

export default App;
