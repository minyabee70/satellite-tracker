# 🛰️ 프리미엄 3D 위성 궤도 추적기 (Satellite Tracker)

React, TypeScript, Three.js(@react-three/fiber, @react-three/drei)를 사용하여 구현한 **웹 기반 실시간 3D 위성 궤도 추적 및 시뮬레이션 애플리케이션**입니다. 
다양한 위성 궤도의 원리를 시각적으로 이해하고, 해사 분야의 다중궤도(Multi-Orbit) 체계 개념을 쉽게 학습할 수 있도록 디자인되었습니다.

## ✨ 주요 기능
- **실시간 3D 지구 및 궤도 렌더링**: 자전축이 23.5도 기울어진 지구와 LEO, MEO, GEO, POLAR, SSO 궤도의 실시간 시각화.
- **위성별 커버리지 뷰**: 위성에서 지구를 향해 방사되는 통신/관측 커버리지(깔때기 모양)의 정밀한 각도 연산 및 렌더링.
- **물리 시뮬레이션 모달**: '뉴턴의 대포(Newton's Cannon)', '궤도 붕괴(Orbital Decay)' 등 위성이 궤도에 머무는 원리를 보여주는 인터랙티브 시뮬레이션 제공.
- **다중궤도(Multi-Orbit) 체계 가이드**: 단일 궤도의 한계를 극복하고 다양한 궤도의 장점을 결합한 최신 해사 통신/관측 아키텍처 흐름도 제공.
- **글로벌 반응형 줌 컨트롤**: 사용자 편의를 위해 좌측 하단의 +, - 버튼으로 애플리케이션 전체 텍스트 및 UI의 크기를 조절 가능.

## 🛠 기술 스택
- **Core:** React, Vite, TypeScript
- **3D 렌더링:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **스타일링:** Vanilla CSS (다크 모드, 글래스모피즘, 네온 글로우 효과 적용)

## 🚀 실행 방법
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

---

**제작자** : 김민엽 (minyabee@naver.com)
