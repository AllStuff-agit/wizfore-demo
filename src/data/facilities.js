// src/data/facilities.js
/**
 * 시설 정보 기본 데이터
 * 위즈포레 센터의 치료실, 상담실, 활동공간 등의 정보
 */

export const facilities = [
  {
    id: 'language-room',
    name: '언어치료실',
    category: '치료실',
    description: '아동과 치료사가 1:1로 활동할 수 있는 공간으로, 다양한 교구와 자료가 구비되어 있습니다.',
    features: [
      '소음이 차단된 집중 가능한 환경',
      '다양한 언어치료 교구',
      '편안한 1:1 상담 공간'
    ],
    imageUrl: '/images/facilities/language-room.jpg',
    order: 1,
    isActive: true
  },
  {
    id: 'sensory-room',
    name: '감각통합실',
    category: '치료실',
    description: '다양한 감각 경험을 제공하는 장비와 안전한 활동 공간이 마련되어 있습니다.',
    features: [
      '트램폴린, 그네, 볼풀 등 다양한 활동 도구',
      '안전하게 활동할 수 있는 패딩 설비',
      '다양한 감각 자극 장비'
    ],
    imageUrl: '/images/facilities/sensory-room.jpg',
    order: 2,
    isActive: true
  },
  {
    id: 'art-room',
    name: '미술치료실',
    category: '치료실',
    description: '아동들이 자유롭게 미술 활동을 통해 자신을 표현할 수 있는 공간입니다.',
    features: [
      '다양한 미술 재료와 도구',
      '편안하고 창의적인 환경',
      '개인 및 그룹 활동이 가능한 공간'
    ],
    imageUrl: '/images/facilities/art-room.jpg',
    order: 3,
    isActive: true
  },
  {
    id: 'music-room',
    name: '음악치료실',
    category: '치료실',
    description: '음악을 통한 치료적 접근이 이루어지는 방음 시설이 갖춰진 공간입니다.',
    features: [
      '다양한 악기와 음악 자료',
      '방음 시설',
      '편안한 음악 활동 공간'
    ],
    imageUrl: '/images/facilities/music-room.jpg',
    order: 4,
    isActive: true
  },
  {
    id: 'counseling-room',
    name: '상담실',
    category: '상담실',
    description: '프라이버시가 보장되는 상담 공간으로, 아동 및 가족 상담이 이루어집니다.',
    features: [
      '편안하고 아늑한 분위기',
      '1:1 상담을 위한 프라이버시 보장',
      '아동 친화적 환경'
    ],
    imageUrl: '/images/facilities/counseling-room.jpg',
    order: 5,
    isActive: true
  },
  {
    id: 'play-therapy-room',
    name: '놀이치료실',
    category: '치료실',
    description: '아동이 놀이를 통해 자신을 표현하고 치료적 경험을 할 수 있는 공간입니다.',
    features: [
      '다양한 놀이 도구와 인형',
      '안전하고 편안한 환경',
      '치료적 놀이 공간'
    ],
    imageUrl: '/images/facilities/play-therapy-room.jpg',
    order: 6,
    isActive: true
  },
  {
    id: 'after-school-room',
    name: '방과후교실',
    category: '그룹 활동 공간',
    description: '발달장애 학생들의 방과후 활동이 이루어지는 공간입니다.',
    features: [
      '학습과 활동을 위한 테이블과 의자',
      '다양한 교재와 학습 도구',
      '편안하고 밝은 분위기'
    ],
    imageUrl: '/images/facilities/after-school-room.jpg',
    order: 7,
    isActive: true
  },
  {
    id: 'group-activity-room',
    name: '그룹활동실',
    category: '그룹 활동 공간',
    description: '다양한 사회성 프로그램과 단체 활동이 진행되는 넓은 공간입니다.',
    features: [
      '다양한 그룹 활동을 위한 넓은 공간',
      '이동 가능한 가구로 다양한 활동 설정 가능',
      '프로젝터와 오디오 시스템'
    ],
    imageUrl: '/images/facilities/group-activity-room.jpg',
    order: 8,
    isActive: true
  },
  {
    id: 'sports-room',
    name: '체육활동실',
    category: '특수 스포츠 시설',
    description: '특수체육 프로그램이 진행되는 안전한 운동 공간입니다.',
    features: [
      '안전한 바닥 매트와 패딩',
      '다양한 운동 기구',
      '신체 발달을 돕는 장비'
    ],
    imageUrl: '/images/facilities/sports-room.jpg',
    order: 9,
    isActive: true
  },
  {
    id: 'waiting-room',
    name: '대기실',
    category: '편의 시설',
    description: '보호자가 치료 시간 동안 편안하게 대기할 수 있는 공간입니다.',
    features: [
      '편안한 소파와 의자',
      '잡지, 도서 등 읽을거리',
      '무선 인터넷 제공'
    ],
    imageUrl: '/images/facilities/waiting-room.jpg',
    order: 10,
    isActive: true
  },
  {
    id: 'restroom',
    name: '화장실/수유실',
    category: '편의 시설',
    description: '장애인 접근성을 고려한 화장실과 수유실이 마련되어 있습니다.',
    features: [
      '장애인 접근성이 좋은 화장실',
      '아동용 설비',
      '수유실 및 기저귀 교환대'
    ],
    imageUrl: '/images/facilities/restroom.jpg',
    order: 11,
    isActive: true
  }
];

export default facilities;