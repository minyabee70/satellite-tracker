import React from 'react';

interface DashboardProps {
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onClose }) => {
  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dashboard-close" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="title" style={{ marginBottom: '0.5rem', color: '#00ffaa' }}>
          궤도별 비교 대시보드
        </h2>
        <p className="subtitle" style={{ marginBottom: '2rem' }}>
          Overview of Satellite Orbits
        </p>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>구분</th>
              <th>고도</th>
              <th>공전주기</th>
              <th>주요 용도</th>
              <th>대표 시스템</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LEO</td>
              <td>160~2,000km</td>
              <td>90~120분</td>
              <td>통신, 지구관측</td>
              <td>Starlink, ISS</td>
            </tr>
            <tr>
              <td>MEO</td>
              <td>2,000~35,786km</td>
              <td>2~24시간</td>
              <td>항법</td>
              <td>GPS, Galileo</td>
            </tr>
            <tr>
              <td>GEO</td>
              <td>35,786km</td>
              <td>24시간</td>
              <td>방송, 통신, 기상</td>
              <td>천리안, Koreasat</td>
            </tr>
            <tr>
              <td>Polar</td>
              <td>다양</td>
              <td>다양</td>
              <td>지구관측</td>
              <td>Landsat</td>
            </tr>
            <tr>
              <td>SSO</td>
              <td>500~800km</td>
              <td>약 100분</td>
              <td>정밀관측</td>
              <td>KOMPSAT</td>
            </tr>
          </tbody>
        </table>

        <div className="maritime-section">
          <h3>해사 분야와의 관계</h3>
          <p style={{ lineHeight: 1.6, marginBottom: '1rem', color: '#ddd' }}>
            해사·선박 분야에서는 다음과 같이 다양한 궤도의 위성이 활용됩니다:
          </p>
          <ul className="bullet-list" style={{ color: '#fff', marginBottom: '1.5rem' }}>
            <li><strong>GEO</strong> : 위성통신, Inmarsat 서비스</li>
            <li><strong>LEO</strong> : Iridium, 차세대 선박 인터넷, 위성 AIS</li>
            <li><strong>MEO</strong> : GPS, Galileo, GLONASS 등 선박 위치측정</li>
            <li><strong>SSO/Polar</strong> : 해양관측, 해빙·기상·환경 모니터링</li>
          </ul>
          <p style={{ lineHeight: 1.6, color: '#aaddff', fontWeight: 500 }}>
            특히 최근 해사 분야는 <strong>GEO 중심에서 LEO+GEO 하이브리드 통신 체계</strong>로 빠르게 전환되고 있으며, 
            MASS(자율운항선박)와 e-Navigation에서는 저지연 LEO 위성의 중요성이 크게 증가하고 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
