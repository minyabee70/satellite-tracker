export type OrbitType = 'LEO' | 'MEO' | 'GEO' | 'POLAR' | 'SSO';

export interface SatelliteInfo {
  id: OrbitType;
  title: string;
  subtitle: string;
  images: string[];
  altitude: string;
  period: string;
  features: string[];
  pros?: string[];
  cons?: string[];
  examples: string[];
  speed: string; // Keep for simulation use
  inclination: string; // Keep for simulation use
  color: string; // Keep for UI and simulation
  principleTitle: string;
  principleDescription: string;
  reasonTitle: string;
  reasonDescription: string;
}

export const satelliteData: Record<OrbitType, SatelliteInfo> = {
  LEO: {
    id: 'LEO',
    title: '저궤도 위성',
    subtitle: '(LEO, Low Earth Orbit)',
    images: [],
    altitude: '약 160 ~ 2,000 km',
    period: '약 90분 ~ 2시간',
    features: [
      '매우 작은 커버리지 (반경 수백~수천 km)',
      '수십~수천 기 위성 필요',
      '낮은 지연시간 (20~50ms)',
      '고해상도 관측 가능'
    ],
    pros: [
      '낮은 지연시간으로 실시간 서비스 유리',
      '고해상도 지구관측 가능'
    ],
    cons: [
      '동일 지점 관측 시간이 수 분에 불과',
      '수많은 위성망(Constellation) 필요'
    ],
    examples: [
      '위성 인터넷 (Starlink 등)',
      '위성 AIS 및 자율운항선박(MASS)',
      '고해상도 지구관측 및 군사 정찰'
    ],
    speed: '약 7.8 km/s',
    inclination: '다양함',
    color: '#00ffaa',
    principleTitle: '강한 중력을 이겨내는 제1우주속도',
    principleDescription: '지표면과 가까울수록 지구의 중력이 강하게 작용합니다. 이 중력에 이끌려 추락하지 않기 위해 저궤도 위성은 초속 약 7.8km라는 어마어마한 속도로 날아야 합니다. 때문에 한 위성이 특정 지역 상공에 머무는 시간은 수 분에 불과하여 릴레이 통신망(Constellation)이 필요합니다.',
    reasonTitle: '왜 저궤도 방식을 채택했나?',
    reasonDescription: '왕복 20~40ms의 아주 낮은 지연시간(Low Latency)과 500km 고도 기준 30cm급의 초고해상도 관측이 가능하기 때문입니다. 한 기가 커버하는 면적이 좁고 너무 빨리 지나간다는 단점이 있지만, 수십~수천 기의 위성(Constellation)을 쏘아 올려 이를 극복하고 전 지구 서비스를 제공합니다.'
  },
  MEO: {
    id: 'MEO',
    title: '중궤도 위성',
    subtitle: '(MEO, Medium Earth Orbit)',
    images: [],
    altitude: '약 2,000 ~ 35,786 km',
    period: '약 2 ~ 24시간',
    features: [
      'LEO보다 넓은 중간 커버리지',
      '10~30기면 전 지구 서비스 가능',
      '중간 지연시간 (50~150ms)'
    ],
    pros: [
      'LEO 대비 적은 위성 수로 전 지구 커버 가능',
      'GEO 대비 통신 지연시간이 짧음'
    ],
    cons: [
      '신호가 약해 지상 수신기에 증폭 기술 필요',
      '극지방 완벽 커버가 어려움'
    ],
    examples: [
      'GPS (Global Positioning System)',
      'Galileo',
      'GLONASS'
    ],
    speed: '약 3.9 km/s',
    inclination: '약 55° (GPS 기준)',
    color: '#aaff00',
    principleTitle: '적절한 고도를 통한 글로벌 커버리지',
    principleDescription: '정지궤도보다는 낮아 통신 지연이 적고, 저궤도보다는 높아 위성 하나당 커버하는 면적(깔때기 넓이)이 큽니다. 약 24대 이상의 위성이 지구 전체를 감싸듯 돌며 지구상 어디서든 4대 이상의 위성을 관측할 수 있게 하여 정확한 GPS 위치를 계산합니다.',
    reasonTitle: '왜 중궤도 방식을 채택했나?',
    reasonDescription: '항법(Navigation) 시스템은 전 세계 동시 서비스, 적당한 지연, 적은 위성 수, 긴 가시시간이 필수적입니다. LEO는 너무 빨리 움직여 수천 기가 필요하고, GEO는 극지방 서비스가 어렵기 때문에 이 둘의 장단점을 적절히 융합한 MEO가 항법 시스템에 최적의 궤도입니다.'
  },
  GEO: {
    id: 'GEO',
    title: '정지궤도 위성',
    subtitle: '(GEO, Geostationary Earth Orbit)',
    images: [],
    altitude: '약 35,786 km',
    period: '23시간 56분 (지구 자전주기와 동일)',
    features: [
      '매우 큰 커버리지 (지구 약 42%)',
      '3기면 사실상 전 지구 커버 가능',
      '높은 지연시간 (500~600ms)'
    ],
    pros: [
      '안테나를 움직일 필요가 없음 (고정)',
      '동일 지역 24시간 연속 관측 가능'
    ],
    cons: [
      '통신 지연이 큼(왕복 약 600ms)',
      '극지방 서비스가 불가능에 가까움'
    ],
    examples: [
      'TV 위성방송',
      '해상/재난 통신',
      '기상 관측 (태풍 연속 감시)'
    ],
    speed: '약 3.07 km/s',
    inclination: '0° (적도 상공)',
    color: '#ffaa00',
    principleTitle: '지구 자전과의 완벽한 동기화',
    principleDescription: '위성이 지구 주위를 도는 원심력과 지구가 끌어당기는 중력이 평형을 이루는 특정 고도(약 36,000km)에서는 위성의 각속도와 지구의 자전 각속도가 정확히 일치하게 됩니다. 이로 인해 지표면의 안테나가 하늘의 한 곳만 바라보아도 24시간 끊김 없이 통신할 수 있습니다.',
    reasonTitle: '왜 정지궤도 방식을 채택했나?',
    reasonDescription: '가장 큰 이유는 "항상 같은 지역을 관측"할 수 있어 지상의 안테나 방향을 고정해둘 수 있다는 점입니다. 이러한 특성 덕분에 안테나 추적이 어려운 일반 가정의 위성방송 수신이나 해상 위성통신, 그리고 24시간 태풍의 움직임을 연속으로 감시해야 하는 기상위성에 완벽히 부합합니다.'
  },
  POLAR: {
    id: 'POLAR',
    title: '극궤도 위성',
    subtitle: '(Polar Orbit)',
    images: [],
    altitude: '다양 (보통 700 ~ 800 km)',
    period: '다양 (보통 약 100분)',
    features: [
      '좁은 띠 형태로 커버',
      '지구 자전으로 전 지구를 스캔',
      '전 지구 관측을 위해 다수 위성 필요'
    ],
    pros: [
      '유일하게 북극과 남극을 포함한 전 지구 관측 가능',
      '지구 전역의 기상 및 환경 데이터를 균일하게 수집'
    ],
    cons: [
      '특정 지역을 연속해서 관측할 수 없음',
      '궤도 유지를 위한 세밀한 컨트롤 필요'
    ],
    examples: [
      '극지방 및 해빙 관측 (북극항로 등)',
      '군사 정찰',
      '환경 감시'
    ],
    speed: '약 7.5 km/s',
    inclination: '약 90° (극 상공)',
    color: '#ff00aa',
    principleTitle: '지구 자전과 수직인 "사과 깎기" 스캔',
    principleDescription: '위성은 항상 남극과 북극을 지나는 고정된 궤도를 돕니다. 하지만 그 아래에서 지구가 서쪽에서 동쪽으로 계속 자전하고 있기 때문에, 위성이 한 바퀴를 돌고 오면 아까와는 조금 다른 지역의 상공을 지나게 됩니다. 시간이 지나면 결국 지구 전체의 표면을 스캔할 수 있습니다.',
    reasonTitle: '왜 극궤도 방식을 채택했나?',
    reasonDescription: '유일하게 극지방(남극, 북극)을 포함한 전 지구 관측이 가능하기 때문입니다. 위성은 남북으로 띠 형태를 돌지만 그 아래에서 지구가 자전하므로 결국 전 지구 표면을 훑게 됩니다. 특히 북극항로나 해빙 등 다른 궤도에서는 보이지 않는 극지방 임무에 필수적입니다.'
  },
  SSO: {
    id: 'SSO',
    title: '태양동기궤도 위성',
    subtitle: '(SSO, Sun-Synchronous Orbit)',
    images: [],
    altitude: '약 500 ~ 800 km',
    period: '약 100분',
    features: [
      '좁은 띠 형태로 커버',
      '낮은 지연시간',
      '항상 동일한 태양 조건에서 촬영'
    ],
    pros: [
      '항상 동일한 조명 조건(그림자 등)에서 촬영 가능',
      '동일 지역의 시간에 따른 정밀한 변화 탐지 가능'
    ],
    cons: [
      '관측 가능한 시간대가 궤도에 의해 고정됨',
      '특정 사건 발생 시 즉각적인 촬영이 어려움'
    ],
    examples: [
      '국토 관리 및 산림 감시',
      '해양오염 탐지 및 항만 변화 분석',
      '정밀 지도 제작'
    ],
    speed: '약 7.5 km/s',
    inclination: '약 98° (약간 기울어진 극궤도)',
    color: '#00ccff',
    principleTitle: '태양빛과의 완벽한 동기화',
    principleDescription: '지구가 태양 주위를 공전하면 태양빛이 들어오는 방향이 바뀝니다. 태양동기궤도는 지구의 적도가 불룩한 형태를 이용해 궤도면 자체를 1년에 360도 회전시켜, 사계절 내내 위성과 태양 사이의 각도를 일정하게 유지합니다. 이 덕분에 위성은 항상 같은 시각, 같은 그림자 조건에서 사진을 찍을 수 있습니다.',
    reasonTitle: '왜 태양동기궤도를 채택했나?',
    reasonDescription: '영상 분석 시 그림자의 길이가 매번 다르면 변화를 비교하기 어렵습니다. SSO는 특정 지역 상공을 항상 같은 시각(예: 매번 오전 10시)에 통과하도록 궤도를 비틀어 동일한 태양광 조명 조건을 유지합니다. 덕분에 항만 변화 분석이나 해양오염 탐지 등 정밀한 모니터링이 가능합니다.'
  }
};
