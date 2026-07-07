import { useState } from 'react';
import Scene from './components/Scene';
import UIPanel from './components/UIPanel';
import RightPanel from './components/RightPanel';
import Dashboard from './components/Dashboard';
import CoverageDashboard from './components/CoverageDashboard';
import OrbitPrinciple from './components/OrbitPrinciple';
import MultiOrbitSystem from './components/MultiOrbitSystem';
import MainSummary from './components/MainSummary';
import NavMenu from './components/NavMenu';
import type { OrbitType } from './data/satellites';
import './index.css';

function App() {
  const [activeOrbit, setActiveOrbit] = useState<OrbitType>('LEO');
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [showCoverage, setShowCoverage] = useState<boolean>(false);
  const [showPrinciple, setShowPrinciple] = useState<boolean>(false);
  const [showMultiOrbit, setShowMultiOrbit] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <>
      <UIPanel 
        activeOrbit={activeOrbit} 
        setActiveOrbit={setActiveOrbit} 
        speedMultiplier={speedMultiplier} 
        setSpeedMultiplier={setSpeedMultiplier}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      
      <div className="canvas-container">
        <Scene activeOrbit={activeOrbit} speedMultiplier={speedMultiplier} isPaused={isPaused} />
        <NavMenu activeOrbit={activeOrbit} setActiveOrbit={setActiveOrbit} />
      </div>

      <RightPanel activeOrbit={activeOrbit} />

      <div className="top-nav-container">
        <div className="center-nav-menu">
          <button 
            className={`center-nav-button ${showLanding ? 'active' : ''}`}
            onClick={() => setShowLanding(true)}
            style={{ border: '1px dashed rgba(0, 255, 136, 0.4)', color: '#00ffaa' }}
          >
            📖 학습 요약 메인
          </button>
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

      {showLanding && <MainSummary onClose={() => setShowLanding(false)} />}
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
