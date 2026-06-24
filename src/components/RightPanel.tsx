import React from 'react';
import { satelliteData } from '../data/satellites';
import type { OrbitType } from '../data/satellites';
import PrincipleSimulations from './PrincipleSimulations';

interface RightPanelProps {
  activeOrbit: OrbitType;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeOrbit }) => {
  const currentData = satelliteData[activeOrbit];

  return (
    <div className="right-panel">
      <h2 className="title" style={{ fontSize: '1.4rem' }}>
        작동 원리
      </h2>
      <p className="subtitle">Operational Principle</p>

      <div className="info-container">
        <div key={`principle-${activeOrbit}`} className="info-card" style={{ borderColor: currentData.color, marginBottom: '1rem' }}>
          <h3 className="info-title" style={{ color: currentData.color, fontSize: '1.1rem' }}>
            {currentData.principleTitle}
          </h3>
          <p className="info-desc">
            {currentData.principleDescription}
          </p>
        </div>

        <div className="mini-sim-container">
          <PrincipleSimulations orbitType={activeOrbit} />
          {activeOrbit === 'GEO' && (
            <div className="instructions" style={{ bottom: 10 }}>지구와 위성이 함께 돕니다</div>
          )}
          {activeOrbit === 'MEO' && (
            <div className="instructions" style={{ bottom: 10 }}>다수의 위성이 전 지구를 커버 (GPS)</div>
          )}
          {activeOrbit === 'LEO' && (
            <div className="instructions" style={{ bottom: 10 }}>빠른 속도로 중력을 이겨냅니다</div>
          )}
          {activeOrbit === 'POLAR' && (
            <div className="instructions" style={{ bottom: 10 }}>남북 회전 + 서동 자전 = 스캔</div>
          )}
          {activeOrbit === 'SSO' && (
            <div className="instructions" style={{ bottom: 10 }}>태양빛과 일정한 각도를 유지</div>
          )}
        </div>

        <div key={`reason-${activeOrbit}`} className="info-card" style={{ borderColor: currentData.color, marginTop: '1rem' }}>
          <h3 className="info-title" style={{ color: currentData.color, fontSize: '1.1rem' }}>
            {currentData.reasonTitle}
          </h3>
          <p className="info-desc">
            {currentData.reasonDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
