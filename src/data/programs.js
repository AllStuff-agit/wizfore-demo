// src/data/programs.js
/**
 * 프로그램 기본 데이터
 * 위즈포레 센터에서 제공하는 프로그램 정보
 */

export const programs = [
  {
    id: 'language-therapy',
    name: '언어치료',
    description: '언어발달지연, 유창성장애(말더듬), 조음음운장애, 중복언어장애, 의사소통프로그램 등',
    icon: 'comments', // Font Awesome 아이콘 키
    order: 1,
    isActive: true,
    details: {
      target: '언어 발달 지연, 조음 장애, 유창성 장애 등',
      content: '언어 표현 및 이해력 향상, 발음 교정 등',
      process: '1:1 개별 치료, 주 1-2회, 회당 40분',
      effect: '의사소통 능력 향상, 언어발달 촉진'
    },
    category: '치료 프로그램'
  },
  {
    id: 'art-therapy',
    name: '미술치료',
    description: '발달미술치료, 심리미술치료, 기초미술치료, 사회성 집단미술치료, 퍼포먼스 오감 미술치료',
    icon: 'paint-brush',
    order: 2,
    isActive: true,
    details: {
      target: '정서적 어려움, 자기표현 부족, 사회성 발달 지연',
      content: '다양한 미술 매체를 통한 자기표현 및 감정 해소',
      process: '개인 및 그룹 치료, 주 1회, 회당 50분',
      effect: '감정 표현 능력 향상, 자아 존중감 증진'
    },
    category: '치료 프로그램'
  },
  {
    id: 'sensory-integration',
    name: '감각통합',
    description: '신체지각, 운동기획, 공간지각 발달, 전정감, 고유감, 촉각, 적응반응, 신체협응 등',
    icon: 'puzzle-piece',
    order: 3,
    isActive: true,
    details: {
      target: '감각처리 어려움, 협응력 부족, 자세 조절 어려움 등',
      content: '다양한 감각 경험, 적응 반응 향상 등',
      process: '1:1 또는 그룹 치료, 주 1-2회, 회당 50분',
      effect: '감각처리 능력 향상, 운동계획 및 실행 능력 발달'
    },
    category: '치료 프로그램'
  },
  {
    id: 'music-therapy',
    name: '음악치료',
    description: '노래부르기, 악기연주, 음악감상, 소리 지각 및 구별, 호흡 및 발성, 악양, 심호작용 향상, 사회기술 발달 등',
    icon: 'music',
    order: 4,
    isActive: true,
    details: {
      target: '의사소통 어려움, 감정 표현 부족, 사회적 상호작용 어려움',
      content: '노래, 악기 연주, 음악 감상을 통한 치료적 접근',
      process: '개인 및 그룹 세션, 주 1회, 회당 50분',
      effect: '감정 표현력 향상, 사회적 상호작용 증진'
    },
    category: '치료 프로그램'
  },
  {
    id: 'special-physical-education',
    name: '특수체육',
    description: '인지영역, 신체적 영역, 정의적 영역 발달',
    icon: 'running',
    order: 5,
    isActive: true,
    details: {
      target: '신체 활동에 어려움을 겪는 아동',
      content: '기본 운동 기술, 신체 협응력 향상 등',
      process: '개인 및 그룹 활동, 주 1-2회, 회당 50분',
      effect: '신체 발달 촉진, 자신감 향상, 건강한 생활습관 형성'
    },
    category: '특수 스포츠'
  },
  {
    id: 'play-therapy',
    name: '놀이치료',
    description: '아동의 내면적 세계 표현, 문제해결능력 및 자기조절력, 공감적 상호작용, 부정적 인지 사고 재개념화',
    icon: 'child',
    order: 6,
    isActive: true,
    details: {
      target: '정서적 어려움, 행동 문제를 겪는 아동',
      content: '놀이를 통한 자기표현 및 감정 해소',
      process: '1:1 개별 치료, 주 1회, 회당 50분',
      effect: '정서 문제 해결, 자기표현 능력 향상'
    },
    category: '상담 프로그램'
  },
  {
    id: 'psychomotor',
    name: '심리운동',
    description: '신체경험, 신체지각, 운동조절 및 기획, 물질경험, 환경경험, 사회경험, 사회지각 및 인지, 사회적 정서 발달',
    icon: 'heartbeat',
    order: 7,
    isActive: true,
    details: {
      target: '운동 발달 지연, 사회성 발달 지연',
      content: '다양한 움직임 경험을 통한 신체적, 심리적 발달 촉진',
      process: '개인 및 그룹 활동, 주 1회, 회당 50분',
      effect: '자기인식 향상, 사회적 상호작용 발달'
    },
    category: '치료 프로그램'
  },
  {
    id: 'parent-counseling',
    name: '부모상담/심리검사',
    description: '지능양육코칭, 효율적 양육기술, 감정코칭, 우울, 불안, 분노조절, 기록상담, 종합심리검사 등',
    icon: 'users',
    order: 8,
    isActive: true,
    details: {
      target: '자녀 양육에 어려움을 겪는 부모',
      content: '양육 방법, 아동 이해, 가족 관계 개선 등',
      process: '개별 상담, 주 1회 또는 격주, 회당 50분',
      effect: '효과적인 양육 기술 습득, 부모-자녀 관계 개선'
    },
    category: '상담 프로그램'
  },
  {
    id: 'after-school',
    name: '방과후활동',
    description: '만 6세이상 만 18세 미만의 발달장애 학생을 위한 다양한 방과후 활동',
    icon: 'school',
    order: 9,
    isActive: true,
    details: {
      target: '학령기 발달장애 아동 및 청소년',
      content: '다양한 체험활동, 학습 지원, 사회성 훈련',
      process: '그룹 활동, 주 5일, 1일 3시간',
      effect: '사회성 향상, 자립생활 기술 습득, 여가 활용 능력 향상'
    },
    category: '방과 후 프로그램'
  },
  {
    id: 'adult-day-activity',
    name: '성인주간활동',
    description: '만 18세이상 만 65세 미만 성인 발달장애인을 위한 낮 시간 활동',
    icon: 'calendar-alt',
    order: 10,
    isActive: true,
    details: {
      target: '성인 발달장애인',
      content: '지역사회 기반 활동, 자립생활 지원, 여가 활동',
      process: '그룹 활동, 월 176시간(확장형) / 132시간(기본형)',
      effect: '자립생활 능력 향상, 사회참여 증진, 삶의 질 향상'
    },
    category: '성인주간활동'
  }
];

export default programs;