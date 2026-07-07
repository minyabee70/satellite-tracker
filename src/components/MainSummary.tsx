import React from 'react';

interface MainSummaryProps {
  onClose: () => void;
}

const MainSummary: React.FC<MainSummaryProps> = ({ onClose }) => {
  return (
    <div className="dashboard-overlay" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
      <div className="dashboard-modal" style={{ maxWidth: '1000px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <button className="dashboard-close" onClick={onClose}>
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1px' }}>
            Satellite 3D Simulator
          </h1>
          <p style={{ color: '#8892b0', fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
            인공위성 궤도 및 물리 원리 학습 요약
          </p>
        </div>

        {/* 3-Column Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Card 1: 궤도별 핵심 요약 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '2rem' }}>🛰️</span>
              <h3 style={{ color: '#00ffaa', margin: 0, fontSize: '1.2rem' }}>궤도별 특징 요약</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#8892b0' }}>
              <div>
                <strong style={{ color: '#fff' }}>저궤도 (LEO):</strong> 고도 160~2,000km. 통신 지연(20~50ms)이 매우 낮으나 궤도 주기가 빨라 수백/수천 개의 위성군(Constellation) 필요.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>중궤도 (MEO):</strong> 고도 2,000~35,786km. 비교적 넓은 영역을 커버하며, 대표적으로 GPS 등 위치 항법 위성계에 활용.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>정지궤도 (GEO):</strong> 고도 35,786km. 지구 자전 속도와 일치하여 특정 위치에 고정된 것처럼 보이며 통신/기상/방송에 필수.
              </div>
            </div>
          </div>

          {/* Card 2: 물리 원리 요약 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '2rem' }}>⚙️</span>
              <h3 style={{ color: '#00e5ff', margin: 0, fontSize: '1.2rem' }}>핵심 궤도 물리학</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#8892b0' }}>
              <div>
                <strong style={{ color: '#fff' }}>원심력과 중력의 평형:</strong> 인공위성은 높은 중력을 극복하기 위해 제1우주속도(저궤도 기준 7.8km/s)로 회전하며 떨어지지 않는 평형 상태를 유지합니다.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>지구 팽대부 현상:</strong> 지구는 완벽한 구형이 아닌 적도가 볼록한 타원체로, 이 형태적 중력 왜곡으로 인해 위성의 궤도면이 서서히 회전(세차 운동)합니다.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>태양동기궤도 (SSO):</strong> 지구 팽대부로 인한 세차 운동 속도를 지구 공전 속도(하루에 약 0.986도)와 일치시켜 태양과의 각도를 늘 일정하게 조절한 특수 극궤도입니다.
              </div>
            </div>
          </div>

          {/* Card 3: 관제 및 추적 원리 */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '2rem' }}>📡</span>
              <h3 style={{ color: '#aaff00', margin: 0, fontSize: '1.2rem' }}>해상 선박 위치 추적</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: '#8892b0' }}>
              <div>
                <strong style={{ color: '#fff' }}>공개형 AIS:</strong> VHF 전파를 이용해 선박들이 상호 간에 위치를 공개 방송하며, 저궤도 위성이 이를 우주에서 잡아 지구 전역의 위치를 수집합니다.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>폐쇄형 위성 통신:</strong> Inmarsat, Orbcomm 등 보안 위성망을 통해 선박의 데이터를 지정된 국가 관제 센터 및 선주사 서버에 1:1로 직접 전달합니다.
              </div>
              <div>
                <strong style={{ color: '#fff' }}>어둠의 선박 탐지:</strong> AIS를 강제로 끈 배들은 전파 없이도 야간/기상을 뚫는 SAR(레이더) 위성과 광학 위성의 사진을 활용해 강제로 추적해 냅니다.
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Tips & Notice Section */}
        <div style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.15)', borderRadius: '10px', padding: '1.2rem', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#00e5ff', margin: '0 0 0.5rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💡 3D 시뮬레이터 100% 활용 가이드
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#ccd6f6', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li><strong>속도 및 제어 조절:</strong> 좌측 하단 제어판을 통해 배속을 실시간 게이지 조절 및 <span style={{ color: '#00ff88' }}>일시정지/재생</span> 할 수 있습니다.</li>
            <li><strong>태양동기궤도(SSO) 시각화:</strong> 배속을 높이면 극궤도와 SSO 궤도가 점차 각이 틀어지는 세차 운동을 한눈에 확인할 수 있습니다.</li>
            <li><strong>자유로운 뷰 회전:</strong> 마우스 좌클릭 드래그로 시점을 돌리고, 마우스 우클릭으로 뷰를 이동할 수 있습니다.</li>
          </ul>
        </div>

        {/* Start Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #00ff88 0%, #00e5ff 100%)',
              color: '#050814',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
            }}
          >
            시뮬레이션 시작하기 🚀
          </button>
        </div>

      </div>
    </div>
  );
};

export default MainSummary;
