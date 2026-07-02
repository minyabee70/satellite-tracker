import React, { useState, useEffect } from 'react';
import { satelliteData } from '../data/satellites';
import type { OrbitType } from '../data/satellites';

interface UIPanelProps {
  activeOrbit: OrbitType;
  setActiveOrbit: (orbit: OrbitType) => void;
  speedMultiplier: number;
  setSpeedMultiplier: (speed: number) => void;
}

const UIPanel: React.FC<UIPanelProps> = ({ activeOrbit, speedMultiplier, setSpeedMultiplier }) => {
  const currentData = satelliteData[activeOrbit];
  const [fontSize, setFontSize] = useState<number>(1.0);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 100}%`;
  }, [fontSize]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 0.1, 1.5));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 0.1, 0.7));

  return (
    <div className="ui-panel">
      <div>
        <h1 className="title" style={{ color: currentData.color }}>
          Satellite Tracker
        </h1>
        <p className="subtitle" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Real-time orbit visualization
        </p>
      </div>

      <div className="info-container" style={{ flex: 1 }}>
        <div key={`info-${activeOrbit}`} className="info-card" style={{ borderColor: currentData.color }}>
          <h2 className="info-title" style={{ color: currentData.color, fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>
            {currentData.title}
          </h2>
          <p className="subtitle" style={{ marginBottom: '1rem', color: '#ccc' }}>{currentData.subtitle}</p>
          
          {currentData.images && currentData.images.length > 0 && (
            <div className="image-gallery">
              {currentData.images.map((imgUrl, idx) => (
                <img key={idx} src={imgUrl} alt={`${currentData.title} 이미지 ${idx + 1}`} className="gallery-image" />
              ))}
            </div>
          )}

          <h3 className="section-title" style={{ color: currentData.color }}>궤도 특성</h3>
          <ul className="bullet-list">
            <li><strong>고도:</strong> {currentData.altitude}</li>
            <li><strong>공전주기:</strong> {currentData.period}</li>
            <li><strong>속도:</strong> {currentData.speed}</li>
          </ul>

          <h3 className="section-title" style={{ color: currentData.color }}>특징</h3>
          <ul className="bullet-list">
            {currentData.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          {currentData.pros && currentData.pros.length > 0 && (
            <>
              <h3 className="section-title" style={{ color: currentData.color }}>장점</h3>
              <ul className="bullet-list pros">
                {currentData.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </>
          )}

          {currentData.cons && currentData.cons.length > 0 && (
            <>
              <h3 className="section-title" style={{ color: currentData.color }}>단점</h3>
              <ul className="bullet-list cons">
                {currentData.cons.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </>
          )}

          <h3 className="section-title" style={{ color: currentData.color }}>활용 포인트 및 사례</h3>
          <ul className="bullet-list">
            {currentData.examples.map((example, idx) => (
              <li key={idx}>{example}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Speed Controls */}
      <div className="speed-controls" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '0.8rem', color: '#8892b0' }}>시뮬레이션 속도</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`speed-btn ${speedMultiplier === 1 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(1)}
            style={{ flex: 1, padding: '6px 0', borderRadius: '4px', border: '1px solid #444', background: speedMultiplier === 1 ? '#00e5ff' : 'transparent', color: speedMultiplier === 1 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem' }}
          >
            1x
          </button>
          <button 
            className={`speed-btn ${speedMultiplier === 10 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(10)}
            style={{ flex: 1, padding: '6px 0', borderRadius: '4px', border: '1px solid #444', background: speedMultiplier === 10 ? '#00e5ff' : 'transparent', color: speedMultiplier === 10 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem' }}
          >
            10x
          </button>
          <button 
            className={`speed-btn ${speedMultiplier === 100 ? 'active' : ''}`}
            onClick={() => setSpeedMultiplier(100)}
            style={{ flex: 1, padding: '6px 0', borderRadius: '4px', border: '1px solid #444', background: speedMultiplier === 100 ? '#00e5ff' : 'transparent', color: speedMultiplier === 100 ? '#000' : '#fff', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem' }}
          >
            100x
          </button>
        </div>
      </div>
      
      <div className="zoom-controls" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: '0.8rem', color: '#8892b0', marginRight: 'auto' }}>글자 크기 조절</span>
        <button 
          onClick={decreaseFontSize} 
          style={{ width: '30px', height: '30px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
          title="글자 크기 축소"
        >
          -
        </button>
        <button 
          onClick={increaseFontSize} 
          style={{ width: '30px', height: '30px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
          title="글자 크기 확대"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default UIPanel;
