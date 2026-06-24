import React from 'react';
import { NewtonCannon, OrbitalDecay } from './PhysicsSimulations';

interface OrbitPrincipleProps {
  onClose: () => void;
}

const OrbitPrinciple: React.FC<OrbitPrincipleProps> = ({ onClose }) => {
  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-modal article-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dashboard-close" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="title" style={{ marginBottom: '1rem', color: '#00ffaa' }}>
          위성이 궤도에 머무는 원리
        </h2>
        
        <div className="article-content">
          <p>
            위성이 우주에 "떠 있는 것"처럼 보이지만, 사실은 <strong>계속 지구를 향해 떨어지고 있는 상태</strong>입니다. 
            다만, 너무 빠르게 옆으로 움직이기 때문에 지구에 부딪히지 않고 계속 지구 주위를 도는 것입니다.
          </p>

          <NewtonCannon />

          <p>위성에는 두 가지 힘(또는 운동)이 작용합니다.</p>

          <h3>① 지구의 중력</h3>
          <ul className="bullet-list">
            <li>위성을 지구 중심으로 끌어당깁니다.</li>
            <li>중력이 없다면 위성은 직선으로 우주 밖으로 날아갑니다.</li>
          </ul>

          <h3>② 위성의 공전 속도(관성)</h3>
          <ul className="bullet-list">
            <li>위성은 매우 빠른 속도로 앞으로 움직입니다.</li>
            <li>관성 때문에 계속 직선 방향으로 나아가려 합니다.</li>
          </ul>

          <p>이 둘이 정확히 균형을 이루면 위성은 계속 지구 주위를 돕니다.</p>

          <hr className="divider" />

          <h2>쉽게 이해하는 비유: 공을 던지는 경우</h2>
          <ol className="bullet-list numbered">
            <li>약하게 던지면 → 땅에 떨어집니다.</li>
            <li>강하게 던지면 → 더 멀리 떨어집니다.</li>
            <li>엄청나게 빠르게 던지면 → 지구가 휘어지는 만큼 공도 계속 떨어져서 결국 지구를 한 바퀴 돕니다.</li>
          </ol>
          <p style={{ marginTop: '0.5rem', color: '#8892b0' }}>이 개념을 처음 설명한 사람이 <strong>Isaac Newton</strong>입니다.</p>

          <hr className="divider" />

          <h2>위성은 사실 계속 떨어지고 있다</h2>
          <p>예를 들어 국제우주정거장(ISS)은:</p>
          <ul className="bullet-list">
            <li><strong>고도:</strong> 약 400 km</li>
            <li><strong>속도:</strong> 약 27,600 km/h (7.66 km/s)</li>
          </ul>
          <p>
            1초 동안 약 7.66 km를 앞으로 이동합니다. 하지만 동시에 지구 중력에 의해 약 8m 아래로 떨어집니다.<br />
            그런데 지구 표면도 같은 거리만큼 아래로 휘어져 있기 때문에 지구와 충돌하지 않고 계속 공전합니다.
          </p>

          <hr className="divider" />

          <h2>궤도별로 왜 계속 떠 있을 수 있을까?</h2>
          
          <h3>① 저궤도(LEO)</h3>
          <ul className="bullet-list">
            <li><strong>고도:</strong> 160~2,000 km</li>
            <li><strong>속도:</strong> 약 7.8 km/s</li>
          </ul>
          <p>중력이 비교적 강하기 때문에 매우 빠르게 움직여야 합니다. (예: ISS, Starlink)</p>

          <h3>② 중궤도(MEO)</h3>
          <ul className="bullet-list">
            <li><strong>고도:</strong> 약 20,000 km</li>
            <li><strong>속도:</strong> 약 3.9 km/s</li>
          </ul>
          <p>지구에서 멀어질수록 중력이 약해져 속도가 느려집니다. (예: GPS)</p>

          <h3>③ 정지궤도(GEO)</h3>
          <ul className="bullet-list">
            <li><strong>고도:</strong> 35,786 km</li>
            <li><strong>속도:</strong> 약 3.07 km/s</li>
          </ul>
          <p>중력이 더 약하므로 느린 속도로도 공전할 수 있습니다. 공전주기가 정확히 23시간 56분이 되도록 설계되어 지구와 같은 속도로 회전합니다. 그래서 지상에서는 위성이 하늘의 한 지점에 정지해 있는 것처럼 보입니다. (예: Koreasat 6A)</p>

          <hr className="divider" />

          <h2>그렇다면 연료는 안 쓰나?</h2>
          <p>많은 사람들이 "계속 날아다니려면 엔진을 계속 켜야 하지 않나?"라고 생각합니다. 그렇지 않습니다.</p>
          <p>우주에는 거의 공기가 없기 때문에 마찰이 거의 없습니다. 따라서 한번 궤도에 올려놓으면 엔진을 끄고도 수년~수십 년 동안 공전할 수 있습니다.</p>
          <p>연료는 주로 다음 용도로 사용됩니다:</p>
          <ul className="bullet-list">
            <li>궤도 진입 및 수정</li>
            <li>자세 제어</li>
            <li>정지궤도 위치 유지(Station Keeping)</li>
            <li>임무 종료 후 폐기궤도 이동</li>
          </ul>

          <hr className="divider" />

          <h2>그런데 왜 LEO 위성은 결국 떨어질까?</h2>
          <p>저궤도에는 아주 희박한 대기가 남아 있습니다.</p>

          <OrbitalDecay />

          <p>이 대기 때문에 조금씩 속도가 감소합니다. 속도가 감소하면:</p>
          <ol className="bullet-list numbered">
            <li>궤도가 낮아짐</li>
            <li>대기가 더 짙어짐</li>
            <li>마찰이 더 커짐</li>
            <li>결국 재진입하여 소멸</li>
          </ol>
          <p>예를 들어 ISS는 몇 달마다 추진기를 사용하여 고도를 다시 올립니다.</p>

          <div className="highlight-box">
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#00ffaa' }}>
              "위성은 중력 때문에 계속 지구로 떨어지고 있지만, 동시에 엄청난 속도로 앞으로 움직이기 때문에 지구를 빗나가며 영원히 떨어지는 상태(Free Fall)에 있는 것입니다."
            </p>
            <p style={{ margin: '1rem 0 0 0', color: '#fff' }}>
              즉, 위성은 <strong>"떠 있는 것"이 아니라 "계속 떨어지면서 지구를 도는 것"</strong>이라고 이해하면 됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrbitPrinciple;
