import React from 'react';

interface MultiOrbitSystemProps {
  onClose: () => void;
}

const MultiOrbitSystem: React.FC<MultiOrbitSystemProps> = ({ onClose }) => {
  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-modal article-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dashboard-close" onClick={onClose}>&times;</button>
        
        <div className="article-content">
          <h2 className="title" style={{ marginTop: 0, marginBottom: '1rem', color: '#cc66ff' }}>다중궤도(Multi-Orbit) 체계</h2>
          
          <p>
            다중궤도 체계는 “위성 종류를 많이 쓰자”가 아니라 통신·항법·관측·복원력을 궤도별 강점으로 나눠 설계하는 구조로 보시면 됩니다. 해사 분야 기준으로 정리해드리겠습니다.
          </p>
          <p>
            핵심은 <strong>하나의 궤도로 모든 요구사항을 만족할 수 없기 때문에 역할을 나누는 것</strong>입니다.
          </p>

          <hr className="divider" />

          <h3>1. 다중궤도 체계 개념</h3>
          <p><strong>Multi-Orbit 체계</strong>는 다음을 조합합니다.</p>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>궤도</th>
                  <th>주 역할</th>
                  <th>강점</th>
                  <th>약점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{color: '#ffaa00', fontWeight: 'bold'}}>GEO 정지궤도</td>
                  <td>광역 통신, 방송, 기상</td>
                  <td>넓은 커버리지, 안정적 연결</td>
                  <td>지연시간 큼, 극지 취약</td>
                </tr>
                <tr>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>LEO 저궤도</td>
                  <td>저지연 통신, 위성 AIS</td>
                  <td>빠른 응답, 극지 포함 가능</td>
                  <td>많은 위성 필요, 핸드오버 필요</td>
                </tr>
                <tr>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>MEO 중궤도</td>
                  <td>GNSS, 일부 고성능 통신</td>
                  <td>전 지구 항법, GEO보다 낮은 지연</td>
                  <td>LEO보다 지연 큼</td>
                </tr>
                <tr>
                  <td style={{color: '#00ccff', fontWeight: 'bold'}}>SSO 태양동기궤도</td>
                  <td>해양·환경 관측</td>
                  <td>같은 시간대 반복 촬영, 변화탐지 유리</td>
                  <td>실시간 통신용은 아님</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{fontSize: '0.85rem', color: '#8892b0'}}>* ESA도 LEO는 지구와 가까워 고해상도 영상에 유리하고, GEO·MEO·LEO는 고도 차이에 따라 임무 특성이 달라진다고 설명합니다.</p>

          <hr className="divider" />

          <h3>2. 왜 GEO 하나로 안 되나?</h3>
          <p>GEO는 해사 통신에서 오래 쓰인 방식입니다. 예를 들어 Inmarsat 계열 서비스는 전통적으로 GEO 기반 해상통신의 대표 사례입니다.</p>
          <p>하지만 GEO만 쓰면 문제가 있습니다.</p>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>문제</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>지연시간</td>
                  <td>왕복 지연이 커서 원격제어, 영상회의, 자율운항 데이터에는 불리</td>
                </tr>
                <tr>
                  <td>극지 커버리지</td>
                  <td>북극항로, 고위도 해역에서 품질 저하</td>
                </tr>
                <tr>
                  <td>단일 장애점</td>
                  <td>특정 위성·빔·게이트웨이 장애 시 대체 경로 제한</td>
                </tr>
                <tr>
                  <td>대역폭 한계</td>
                  <td>선박 디지털화, IoT, 영상, 원격정비 수요 증가에 부담</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>그래서 GEO는 <strong>기본망·백업망·광역 안정망</strong>으로 두고, LEO/MEO/SSO를 결합합니다.</p>

          <hr className="divider" />

          <h3>3. 궤도별 역할 분담</h3>
          
          <h4 style={{ color: '#ffaa00', fontSize: '1.1rem', marginTop: '1.5rem' }}>① GEO: 안정적인 광역 통신망</h4>
          <p>GEO는 지구에서 보면 거의 같은 위치에 있으므로 선박 안테나 운용이 안정적입니다. 즉, <strong>“느리지만 넓고 안정적인 기본 통신망”</strong>입니다.</p>
          <ul className="bullet-list">
            <li><strong>LRIT, GMDSS 계열 통신:</strong> 넓은 해역을 안정적으로 커버</li>
            <li><strong>선박 업무망:</strong> 이메일, 운항보고, 전자문서 송수신</li>
            <li><strong>기상정보 수신:</strong> 광역 해역 대상 지속 서비스</li>
            <li><strong>백업 통신:</strong> LEO 장애 시 대체 경로</li>
          </ul>

          <h4 style={{ color: '#00ffaa', fontSize: '1.1rem', marginTop: '1.5rem' }}>② LEO: 저지연·고속·극지 대응 통신망</h4>
          <p>LEO는 <strong>“빠르고 반응성이 좋은 실시간 통신망”</strong>입니다. 위성이 빠르게 움직이므로 선박 단말은 계속 다른 위성으로 접속을 넘겨야 하며(핸드오버), 전자식 위상배열 안테나(ESA)가 중요합니다.</p>
          <ul className="bullet-list">
            <li><strong>선박 인터넷:</strong> 낮은 지연, 높은 체감속도</li>
            <li><strong>원격정비:</strong> 영상·센서 데이터 실시간 전송</li>
            <li><strong>MASS 원격 모니터링:</strong> 지연시간이 매우 중요함</li>
            <li><strong>위성 AIS:</strong> 다수 선박 신호 수집</li>
            <li><strong>북극항로 통신:</strong> GEO보다 고위도 대응에 유리</li>
          </ul>

          <h4 style={{ color: '#aaff00', fontSize: '1.1rem', marginTop: '1.5rem' }}>③ MEO: GNSS와 중간지연 고신뢰 서비스</h4>
          <p>대표적으로 GPS, Galileo 등의 GNSS가 있습니다. LEO처럼 빨리 지나가지 않고, GEO처럼 극지 가시성 문제가 크지 않아 항법에 적합한 <strong>“위치를 잡아주는 기준 인프라”</strong>입니다.</p>
          <ul className="bullet-list">
            <li><strong>선박 위치결정:</strong> 전 세계 항법 서비스</li>
            <li><strong>시간동기:</strong> AIS, 통신망, 로그시스템 기준시간</li>
            <li><strong>항로 추적:</strong> GICOMS, LRIT, VTS 연계</li>
            <li><strong>보정정보 활용:</strong> DGPS, SBAS, PPP 등과 결합 가능</li>
          </ul>

          <h4 style={{ color: '#00ccff', fontSize: '1.1rem', marginTop: '1.5rem' }}>④ SSO: 해양관측·환경감시·상황인식</h4>
          <p>같은 지역을 매번 비슷한 태양 고도에서 촬영하므로 영상 비교에 아주 좋습니다. 통신망이라기보다는 <strong>“눈 역할”</strong>을 합니다.</p>
          <ul className="bullet-list">
            <li><strong>해양오염 탐지:</strong> 유류오염, 적조, 부유물 감시</li>
            <li><strong>해빙 관측:</strong> 북극항로 안전 운항</li>
            <li><strong>항만 변화 탐지:</strong> 매립, 시설 변화, 선박 밀집 분석</li>
            <li><strong>재난 대응:</strong> 태풍·침수·해양사고 후 상황 파악</li>
            <li><strong>불법조업 감시:</strong> AIS 정보와 영상 비교</li>
          </ul>

          <hr className="divider" />

          <h3>4. 해사 Multi-Orbit 구조 예시</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
            
            {/* 1. 선박 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🚢 [선박]
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#ffaa00', fontWeight: 'bold', minWidth: '130px' }}>• GEO 단말</span>
                  <span style={{ color: '#e0e0e0' }}>기본 업무통신 / 백업 / 광역 안정망</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#00ffaa', fontWeight: 'bold', minWidth: '130px' }}>• LEO 단말</span>
                  <span style={{ color: '#e0e0e0' }}>고속 인터넷 / 저지연 원격지원 / MASS 데이터</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#aaff00', fontWeight: 'bold', minWidth: '130px' }}>• GNSS (MEO)</span>
                  <span style={{ color: '#e0e0e0' }}>위치 · 속도 · 시각</span>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#8892b0', fontWeight: 'bold', minWidth: '130px' }}>• 자체 장비</span>
                  <span style={{ color: '#e0e0e0' }}>AIS / 센서 / ECDIS / VDR / 엔진데이터</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: '#00ccff', fontSize: '2rem' }}>
              ↓
            </div>

            {/* 2. 선박 내 통합 게이트웨이 */}
            <div style={{ background: 'rgba(0, 204, 255, 0.1)', border: '1px solid rgba(0,204,255,0.3)', borderRadius: '8px', padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#00ccff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🖥️ [선박 내 통합 게이트웨이]
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginLeft: '1rem' }}>
                {['링크 상태 감시', 'GEO/LEO 자동 전환', '업무별 우선순위 제어', '보안 터널/VPN', '데이터 압축·캐싱'].map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(0, 204, 255, 0.2)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', color: '#fff' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: '#00ccff', fontSize: '2rem' }}>
              ↓
            </div>

            {/* 3. 육상 운영센터 */}
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🏢 [육상 운영센터]
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#00ccff' }}>✔</span> <span style={{ color: '#e0e0e0' }}>선박 위치관제</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#00ccff' }}>✔</span> <span style={{ color: '#e0e0e0' }}>LRIT/GICOMS/VTS 연계</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#00ccff' }}>✔</span> <span style={{ color: '#e0e0e0' }}>원격정비</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#00ccff' }}>✔</span> <span style={{ color: '#e0e0e0' }}>항로·기상·해양위험 분석</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#00ccff' }}>✔</span> 
                  <span style={{ color: '#e0e0e0' }}>
                    <span style={{ color: '#00ccff', fontWeight: 'bold' }}>SSO 관측영상</span> + AIS/GNSS 융합
                  </span>
                </div>
              </div>
            </div>

          </div>

          <hr className="divider" />

          <h3>5. 업무별 최적 조합</h3>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>업무</th>
                  <th>GEO</th>
                  <th>LEO</th>
                  <th>MEO/GNSS</th>
                  <th>SSO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>선박 위치 추적</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                </tr>
                <tr>
                  <td>LRIT</td>
                  <td style={{color: '#ffaa00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#aaff00'}}>위치기준</td>
                  <td style={{color: '#8892b0'}}>-</td>
                </tr>
                <tr>
                  <td>위성 AIS</td>
                  <td style={{color: '#8892b0'}}>-</td>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#aaff00'}}>위치기준</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                </tr>
                <tr>
                  <td>MASS 원격 모니터링</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                </tr>
                <tr>
                  <td>해양오염 감시</td>
                  <td style={{color: '#ffaa00'}}>통신전송</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#aaff00'}}>위치기준</td>
                  <td style={{color: '#00ccff', fontWeight: 'bold'}}>핵심</td>
                </tr>
                <tr>
                  <td>북극항로</td>
                  <td style={{color: '#8892b0'}}>취약</td>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#00ccff', fontWeight: 'bold'}}>핵심</td>
                </tr>
                <tr>
                  <td>재난·비상통신</td>
                  <td style={{color: '#ffaa00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#aaff00'}}>위치기준</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                </tr>
                <tr>
                  <td>항만 디지털 트윈</td>
                  <td style={{color: '#8892b0'}}>보조</td>
                  <td style={{color: '#00ffaa', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#aaff00', fontWeight: 'bold'}}>핵심</td>
                  <td style={{color: '#00ccff', fontWeight: 'bold'}}>핵심</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" />

          <h3>6. 왜 이 방식이 채택되는가?</h3>
          <ul className="bullet-list" style={{ marginTop: '1rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#fff', fontSize: '1.05rem' }}>첫째, 서비스 품질이 다릅니다.</strong><br />
              GEO는 넓지만 느리고, LEO는 빠르지만 복잡하며, MEO는 위치 기준에 강하고, SSO는 관측에 강합니다. 하나로 통일하면 반드시 약점이 생깁니다.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#fff', fontSize: '1.05rem' }}>둘째, 장애 대응력이 좋아집니다.</strong><br />
              LEO가 장애나 음영에 들어가면 GEO로 전환하고, GNSS 교란이 의심되면 AIS, 레이더, 관성항법, SSO 영상과 비교하여 복원력을 높입니다.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#fff', fontSize: '1.05rem' }}>셋째, 해사 디지털화에 맞습니다.</strong><br />
              IMO의 e-Navigation 개념처럼 해양 정보를 조화롭게 수집, 통합, 교환, 분석하려면 "통신 + 위치 + 관측 + 상황판단 + 보안 + 표준연계"의 결합이 필수적입니다.
            </li>
          </ul>

          <div className="highlight-box" style={{ marginTop: '3rem', borderLeftColor: '#cc66ff', background: 'rgba(204, 102, 255, 0.05)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>7. 한 문장으로 정리</h3>
            <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#cc66ff', lineHeight: 1.6 }}>
              "GEO는 넓게 연결하고, LEO는 빠르게 연결하고, MEO는 정확한 위치와 시간을 제공하고, SSO는 바다를 관측합니다."
            </p>
            <p style={{ marginTop: '1.5rem', marginBottom: 0, color: '#e0e0e0', lineHeight: 1.6 }}>
              따라서 해사 분야의 Multi-Orbit 체계는 단순한 위성통신 고도화가 아니라, <strong>선박-육상-항만-해양환경을 하나의 디지털 운영체계로 묶는 기반 인프라</strong>입니다.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MultiOrbitSystem;
