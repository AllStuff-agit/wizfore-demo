// src/data/services.js
/**
 * 서비스 기본 데이터
 * 위즈포레 센터에서 제공하는 서비스 카테고리 및 설명
 */

export const services = [
  {
    id: 'therapy',
    name: '치료 프로그램',
    description: '아동의 발달 촉진을 위한 다양한 치료 프로그램을 제공합니다.',
    icon: 'heartbeat',
    order: 1,
    isActive: true,
    programs: [
      {
        id: 'language-therapy',
        name: '언어치료',
        description: '언어발달지연, 조음 장애, 유창성 장애 등 다양한 언어 문제를 개선하기 위한 프로그램',
        target: '언어 발달 지연, 조음 장애, 유창성 장애 등',
        content: '언어 표현 및 이해력 향상, 발음 교정 등',
        process: '1:1 개별 치료, 주 1-2회, 회당 40분',
        effect: '의사소통 능력 향상, 언어발달 촉진',
        imageUrl: '/images/services/language-therapy.jpg',
        order: 1,
        isActive: true
      },
      {
        id: 'sensory-integration',
        name: '감각통합치료',
        description: '신체 감각 처리 능력을 향상시켜 일상생활 기능을 개선하는 프로그램',
        target: '감각처리 어려움, 협응력 부족, 자세 조절 어려움 등',
        content: '다양한 감각 경험, 적응 반응 향상 등',
        process: '1:1 또는 그룹 치료, 주 1-2회, 회당 50분',
        effect: '감각처리 능력 향상, 운동계획 및 실행 능력 발달',
        imageUrl: '/images/services/sensory-integration.jpg',
        order: 2,
        isActive: true
      },
      {
        id: 'art-therapy',
        name: '미술치료',
        description: '미술 활동을 통해 정서적 안정과 자기표현력을 향상시키는 프로그램',
        target: '정서적 어려움, 자기표현 부족, 사회성 발달 지연',
        content: '다양한 미술 매체를 통한 자기표현 및 감정 해소',
        process: '개인 및 그룹 치료, 주 1회, 회당 50분',
        effect: '감정 표현 능력 향상, 자아 존중감 증진',
        imageUrl: '/images/services/art-therapy.jpg',
        order: 3,
        isActive: true
      },
      {
        id: 'music-therapy',
        name: '음악치료',
        description: '음악 활동을 통해 정서적, 사회적, 인지적 발달을 촉진하는 프로그램',
        target: '의사소통 어려움, 감정 표현 부족, 사회적 상호작용 어려움',
        content: '노래, 악기 연주, 음악 감상을 통한 치료적 접근',
        process: '개인 및 그룹 세션, 주 1회, 회당 50분',
        effect: '감정 표현력 향상, 사회적 상호작용 증진',
        imageUrl: '/images/services/music-therapy.jpg',
        order: 4,
        isActive: true
      },
      {
        id: 'psychomotor',
        name: '심리운동',
        description: '신체 움직임을 통해 심리적, 정서적 발달을 촉진하는 프로그램',
        target: '운동 발달 지연, 사회성 발달 지연',
        content: '다양한 움직임 경험을 통한 신체적, 심리적 발달 촉진',
        process: '개인 및 그룹 활동, 주 1회, 회당 50분',
        effect: '자기인식 향상, 사회적 상호작용 발달',
        imageUrl: '/images/services/psychomotor.jpg',
        order: 5,
        isActive: true
      }
    ]
  },
  {
    id: 'counseling',
    name: '상담 프로그램',
    description: '아동 및 가족의 심리적 안정과 발달을 지원하는 상담 프로그램을 제공합니다.',
    icon: 'comments',
    order: 2,
    isActive: true,
    programs: [
      {
        id: 'child-counseling',
        name: '아동 심리상담',
        description: '아동의 정서적, 행동적 어려움을 해결하기 위한 전문 상담 프로그램',
        target: '정서적 어려움, 행동 문제를 겪는 아동',
        content: '놀이치료, 미술치료, 음악치료 등',
        process: '1:1 개별 상담, 주 1회, 회당 50분',
        effect: '정서 안정, 자기조절력 향상, 적응 능력 증진',
        imageUrl: '/images/services/child-counseling.jpg',
        order: 1,
        isActive: true
      },
      {
        id: 'parent-counseling',
        name: '부모 상담',
        description: '부모의 양육 어려움을 지원하고 효과적인 양육 방법을 안내하는 프로그램',
        target: '자녀 양육에 어려움을 겪는 부모',
        content: '양육 방법, 아동 이해, 가족 관계 개선 등',
        process: '개별 상담, 주 1회 또는 격주, 회당 50분',
        effect: '효과적인 양육 기술 습득, 부모-자녀 관계 개선',
        imageUrl: '/images/services/parent-counseling.jpg',
        order: 2,
        isActive: true
      },
      {
        id: 'family-counseling',
        name: '가족 상담',
        description: '가족 간 의사소통 개선과 관계 회복을 위한 가족 단위 상담 프로그램',
        target: '가족 관계 개선이 필요한 가정',
        content: '의사소통 기술, 갈등 해결, 관계 개선 등',
        process: '가족 단위 상담, 2주 1회, 회당 70분',
        effect: '가족 관계 개선, 의사소통 능력 향상',
        imageUrl: '/images/services/family-counseling.jpg',
        order: 3,
        isActive: true
      },
      {
        id: 'play-therapy',
        name: '놀이치료',
        description: '놀이를 통해 아동의 심리적 어려움을 해결하고 건강한 발달을 촉진하는 프로그램',
        target: '정서적 어려움, 행동 문제를 겪는 아동',
        content: '놀이를 통한 자기표현 및 감정 해소',
        process: '1:1 개별 치료, 주 1회, 회당 50분',
        effect: '정서 문제 해결, 자기표현 능력 향상',
        imageUrl: '/images/services/play-therapy.jpg',
        order: 4,
        isActive: true
      }
    ]
  },
  {
    id: 'after-school',
    name: '방과 후 프로그램',
    description: '발달장애 아동·청소년의 방과 후 활동을 지원하는 프로그램을 제공합니다.',
    icon: 'school',
    order: 3,
    isActive: true,
    programs: [
      {
        id: 'learning-support',
        name: '학습 지원',
        description: '학습에 어려움을 겪는 아동을 위한 개별화된 학습 지원 프로그램',
        target: '학습에 어려움을 겪는 아동',
        content: '개별화된 학습 지원, 학습 전략 훈련 등',
        process: '소그룹 또는 개별 학습, 주 5일, 각 40분',
        effect: '학업 성취도 향상, 학습 동기 증진',
        imageUrl: '/images/services/learning-support.jpg',
        order: 1,
        isActive: true
      },
      {
        id: 'social-skills',
        name: '사회성 향상 프로그램',
        description: '또래 관계 및 사회적 상호작용 능력을 향상시키기 위한 프로그램',
        target: '또래 관계에 어려움을 겪는 아동',
        content: '의사소통 기술, 감정 조절, 협동 활동 등',
        process: '그룹 활동, 주 3회, 각 50분',
        effect: '사회적 상호작용 능력 향상, 또래 관계 개선',
        imageUrl: '/images/services/social-skills.jpg',
        order: 2,
        isActive: true
      },
      {
        id: 'creative-arts',
        name: '창의 예술 활동',
        description: '다양한 예술 활동을 통해 창의력과 자기표현 능력을 향상시키는 프로그램',
        target: '예술적 표현에 관심 있는 아동',
        content: '미술, 음악, 연극 등 다양한 예술 활동',
        process: '그룹 활동, 주 2회, 각 60분',
        effect: '창의력 발달, 자기표현 능력 향상',
        imageUrl: '/images/services/creative-arts.jpg',
        order: 3,
        isActive: true
      }
    ]
  },
  {
    id: 'sports',
    name: '특수 스포츠',
    description: '장애 아동·청소년의 신체 발달과 건강 증진을 위한 특수체육 프로그램을 제공합니다.',
    icon: 'running',
    order: 4,
    isActive: true,
    programs: [
      {
        id: 'adaptive-pe',
        name: '적응체육',
        description: '개인의 능력과 필요에 맞게 조정된 체육 활동 프로그램',
        target: '신체 활동에 어려움을 겪는 아동',
        content: '기본 운동 기술, 신체 협응력 향상 등',
        process: '소그룹 또는 개별 활동, 주 2회, 각 50분',
        effect: '신체 발달 촉진, 운동 기능 향상',
        imageUrl: '/images/services/adaptive-pe.jpg',
        order: 1,
        isActive: true
      },
      {
        id: 'swimming',
        name: '수영 프로그램',
        description: '물에 대한 적응과 수영 기술을 발달시키는 프로그램',
        target: '수중 활동에 관심 있는 아동',
        content: '물 적응, 기본 수영 기술, 수중 놀이 등',
        process: '소그룹 활동, 주 1회, 각 60분',
        effect: '물에 대한 적응력 향상, 수영 기술 발달',
        imageUrl: '/images/services/swimming.jpg',
        order: 2,
        isActive: true
      },
      {
        id: 'team-sports',
        name: '팀 스포츠',
        description: '협동심과 사회성을 기르는 팀 스포츠 활동 프로그램',
        target: '협동 활동에 참여하고 싶은 아동',
        content: '축구, 농구 등 팀 스포츠 기본 기술 및 규칙',
        process: '그룹 활동, 주 1회, 각 90분',
        effect: '협동심 향상, 사회적 상호작용 증진',
        imageUrl: '/images/services/team-sports.jpg',
        order: 3,
        isActive: true
      }
    ]
  },
  {
    id: 'adult-day',
    name: '성인주간활동',
    description: '성인 발달장애인의 자립생활과 사회참여를 지원하는 주간활동 프로그램을 제공합니다.',
    icon: 'calendar-alt',
    order: 5,
    isActive: true,
    programs: [
      {
        id: 'daily-living',
        name: '일상생활 기술 훈련',
        description: '독립적인 생활에 필요한 기본 기술을 훈련하는 프로그램',
        target: '성인 발달장애인',
        content: '자기관리, 가사활동, 지역사회 이용 등',
        process: '그룹 및 개별 활동, 주 5일, 일 6시간',
        effect: '일상생활 자립도 향상, 자기관리 능력 증진',
        imageUrl: '/images/services/daily-living.jpg',
        order: 1,
        isActive: true
      },
      {
        id: 'vocational',
        name: '직업 전 훈련',
        description: '직업 활동을 위한 기초 기술을 훈련하는 프로그램',
        target: '성인 발달장애인',
        content: '직업 기초 능력, 작업 태도, 간단한 작업 활동',
        process: '그룹 활동, 주 3회, 각 120분',
        effect: '작업 능력 향상, 직업 적응력 증진',
        imageUrl: '/images/services/vocational.jpg',
        order: 2,
        isActive: true
      },
      {
        id: 'leisure',
        name: '여가활동 프로그램',
        description: '다양한 여가활동을 통해 삶의 질을 향상시키는 프로그램',
        target: '성인 발달장애인',
        content: '취미활동, 문화체험, 신체활동 등',
        process: '그룹 활동, 주 2회, 각 120분',
        effect: '여가 생활 증진, 삶의 만족도 향상',
        imageUrl: '/images/services/leisure.jpg',
        order: 3,
        isActive: true
      }
    ]
  }
];

export default services;