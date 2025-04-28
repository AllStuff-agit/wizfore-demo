import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../firebase/firebase';

// 서비스 컬렉션 참조
const servicesCollection = collection(db, 'services');

/**
 * 카테고리별 서비스 문서 참조 가져오기
 * @param {string} category - 서비스 카테고리 (치료상담, 성인주간활동, 방과후활동, 특수스포츠교실)
 * @returns {FirebaseFirestore.DocumentReference} - 서비스 문서 참조
 */
const getServiceDocRef = (category) => {
  return doc(servicesCollection, category);
};

/**
 * 카테고리별 서비스 데이터 가져오기
 * @param {string} category - 서비스 카테고리 (치료상담, 성인주간활동, 방과후활동, 특수스포츠교실)
 * @returns {Promise<Object|null>} - 서비스 데이터 객체
 */
export const getServiceByCategory = async (category) => {
  try {
    const serviceRef = getServiceDocRef(category);
    const serviceDoc = await getDoc(serviceRef);
    
    if (serviceDoc.exists()) {
      return {
        id: serviceDoc.id,
        ...serviceDoc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`${category} 서비스 데이터 가져오기 오류:`, error);
    throw error;
  }
};

/**
 * 모든 서비스 데이터 가져오기
 * @returns {Promise<Array>} - 서비스 데이터 배열
 */
export const getAllServices = async () => {
  try {
    const querySnapshot = await getDocs(servicesCollection);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('모든 서비스 데이터 가져오기 오류:', error);
    throw error;
  }
};

/**
 * 서비스 데이터 추가 또는 업데이트
 * @param {string} category - 서비스 카테고리 (치료상담, 성인주간활동, 방과후활동, 특수스포츠교실)
 * @param {Object} serviceData - 추가할 서비스 데이터
 * @returns {Promise<void>}
 */
export const setServiceData = async (category, serviceData) => {
  try {
    const serviceRef = getServiceDocRef(category);
    
    // 타임스탬프 추가
    const dataWithTimestamp = {
      ...serviceData,
      updatedAt: serverTimestamp()
    };
    
    // 문서가 존재하는지 확인
    const docSnapshot = await getDoc(serviceRef);
    
    if (docSnapshot.exists()) {
      // 문서가 이미 존재하면 업데이트
      await updateDoc(serviceRef, dataWithTimestamp);
    } else {
      // 문서가 없으면 생성
      dataWithTimestamp.createdAt = serverTimestamp();
      await setDoc(serviceRef, dataWithTimestamp);
    }
  } catch (error) {
    console.error(`서비스 데이터 설정 오류 (카테고리: ${category}):`, error);
    throw error;
  }
};

/**
 * 서비스 데이터 존재 여부 확인
 * @param {string} category - 서비스 카테고리
 * @returns {Promise<boolean>} - 데이터 존재 여부
 */
export const checkServiceExists = async (category) => {
  try {
    const serviceRef = getServiceDocRef(category);
    const docSnapshot = await getDoc(serviceRef);
    return docSnapshot.exists();
  } catch (error) {
    console.error(`${category} 서비스 데이터 확인 오류:`, error);
    throw error;
  }
};

// 카테고리별 서비스 기본 데이터
export const serviceDefaultData = {
  // 치료상담 기본 데이터
  치료상담: {
    name: '치료·상담',
    description: '언어발달지연, 인지 발달지연, 사회성 발달지연, 주의산만, 우울, 불안 등 심리정서적 부적응, 감각운동 발달지연 아동을 위한 치료 및 상담 서비스',
    programs: [
      {
        id: 'lang-therapy',
        name: '언어치료',
        description: '언어발달지연, 유창성장애(말더듬), 조음음운장애 등 의사소통에 어려움이 있는 아동을 위한 치료 프로그램',
        icon: 'comments',
        status: 'active',
        sessions: 56,
        clients: 32
      },
      {
        id: 'art-therapy',
        name: '미술치료',
        description: '미술 활동을 통해 심리적 안정을 도모하고 자기표현력과 창의성을 향상시키는 치료 프로그램',
        icon: 'paint-brush',
        status: 'active',
        sessions: 42,
        clients: 28
      },
      {
        id: 'music-therapy',
        name: '음악치료',
        description: '음악 활동을 통해 정서적 안정과 사회성 발달을 도모하고 의사소통 능력을 향상시키는 치료 프로그램',
        icon: 'music',
        status: 'active',
        sessions: 38,
        clients: 23
      },
      {
        id: 'sensory-integration',
        name: '감각통합',
        description: '다양한 감각 경험을 통해 뇌의 통합적인 처리 능력을 향상시키는 치료 프로그램',
        icon: 'hand-holding',
        status: 'active',
        sessions: 64,
        clients: 35
      },
      {
        id: 'play-therapy',
        name: '놀이치료',
        description: '놀이 활동을 통해 아동의 정서적 안정과 자기표현, 문제해결 능력을 향상시키는 프로그램',
        icon: 'puzzle-piece',
        status: 'active',
        sessions: 48,
        clients: 26
      },
      {
        id: 'psychomotor',
        name: '심리운동',
        description: '움직임을 통해 자기를 인식하고 표현하며 주변 환경과 상호작용하는 능력을 향상시키는 프로그램',
        icon: 'child',
        status: 'active',
        sessions: 36,
        clients: 20
      },
      {
        id: 'counseling',
        name: '심리상담',
        description: '아동과 가족의 심리적 어려움을 해결하고 적응을 돕는 상담 프로그램',
        icon: 'heart',
        status: 'active',
        sessions: 32,
        clients: 22
      },
      {
        id: 'parent-counseling',
        name: '부모상담',
        description: '자녀 양육 및 발달 지원을 위한 부모 대상 상담 프로그램',
        icon: 'users',
        status: 'active',
        sessions: 28,
        clients: 24
      }
    ]
  },
  
  // 성인주간활동 기본 데이터
  성인주간활동: {
    name: '성인주간활동',
    description: '만 18세 이상 만 65세 미만 성인 발달장애인을 대상으로 낮 시간에 자신의 욕구를 반영한 지역사회 기반 활동에 참여함으로써 자립생활을 지원하는 서비스',
    programs: [
      {
        id: 'daily-life',
        name: '일상생활기술훈련',
        description: '신변자립생활, 자기관리생활, 청결/위생/안전/이동생활 등의 일상생활 기술 향상을 위한 프로그램',
        icon: 'home',
        status: 'active',
        sessions: 48,
        clients: 25
      },
      {
        id: 'social-adaptation',
        name: '사회적응기술훈련',
        description: '사회정서생활, 공동체적응생활, 공감/협동/배려/질서, 사회적기술 등의 사회적응 능력 향상을 위한 프로그램',
        icon: 'users',
        status: 'active',
        sessions: 42,
        clients: 22
      },
      {
        id: 'healing',
        name: '쉼(힐링)프로그램',
        description: '숲체험, 숲치유, 원예치료활동, 음악/영화/댄스, 문화예술교육 등 심리적 안정과 휴식을 제공하는 프로그램',
        icon: 'tree',
        status: 'active',
        sessions: 36,
        clients: 28
      },
      {
        id: 'leisure',
        name: '재미(여가)프로그램',
        description: '음악/미술/원예/레크레이션, 보드게임/컴퓨터/요리/운동 등 여가 활동 프로그램',
        icon: 'gamepad',
        status: 'active',
        sessions: 32,
        clients: 26
      },
      {
        id: 'community',
        name: '지역사회활용훈련',
        description: '공공/편의시설/문화시설 이용, 바리스타/난타/체육시설 이용 등 지역사회 자원 활용 능력 향상을 위한 프로그램',
        icon: 'city',
        status: 'active',
        sessions: 28,
        clients: 20
      },
      {
        id: 'health',
        name: '건강생활관리',
        description: '맞춤형 피트니스, 신체운동활동, 뇌파프로그램, 정신건강활동 등 건강 관리 프로그램',
        icon: 'heartbeat',
        status: 'active',
        sessions: 38,
        clients: 24
      }
    ]
  },
  
  // 방과후활동 기본 데이터
  방과후활동: {
    name: '방과후활동',
    description: '만 6세 이상 만 18세 미만의 발달장애 학생이 방과후 시간을 이용하여 지역사회 다양한 장소와 기관에서 자신이 원하는 활동에 참여하는 서비스',
    programs: [
      {
        id: 'social-saturday',
        name: '토요방과후(사회성교실)',
        description: '사회지각/인지, 의사소통, 사회감성(배려,질서 등), 사회적기술훈련, 문화예술체험 등의 사회성 향상 프로그램',
        icon: 'users',
        status: 'active',
        sessions: 32,
        clients: 18
      },
      {
        id: 'basic-learning',
        name: '평일방과후(기초학습교실)',
        description: '생활/학습, 기초인지, 진로적성/직업체험 등의 기초학습 향상 프로그램',
        icon: 'book',
        status: 'active',
        sessions: 45,
        clients: 24
      },
      {
        id: 'art-culture',
        name: '예술문화활동',
        description: '음악, 미술, 공예, 댄스 등의 예술 및 문화 체험 활동 프로그램',
        icon: 'paint-brush',
        status: 'active',
        sessions: 28,
        clients: 15
      },
      {
        id: 'self-independence',
        name: '자립준비활동',
        description: '일상생활 기술, 지역사회 이용, 자기결정기술 등의 자립 준비 프로그램',
        icon: 'hands-helping',
        status: 'active',
        sessions: 26,
        clients: 14
      },
      {
        id: 'career-experience',
        name: '진로체험활동',
        description: '직업 탐색, 직업체험, 현장 견학 등의 진로 체험 프로그램',
        icon: 'briefcase',
        status: 'active',
        sessions: 20,
        clients: 12
      }
    ]
  },
  
  // 특수스포츠교실 기본 데이터
  특수스포츠교실: {
    name: '특수스포츠교실',
    description: '신체 활동과 스포츠를 통한 발달 지원 프로그램으로 인지영역, 신체적 영역, 정의적 영역 발달 등을 지원하는 서비스',
    programs: [
      {
        id: 'special-pe',
        name: '특수체육',
        description: '신체 활동을 통해 대근육 및 소근육 발달을 촉진하고 협응력과 균형감각을 향상시키는 프로그램',
        icon: 'running',
        status: 'active',
        sessions: 48,
        clients: 25
      },
      {
        id: 'sports-integration',
        name: '통합스포츠',
        description: '일반 아동과 장애 아동이 함께 참여하는 통합형 스포츠 활동 프로그램',
        icon: 'users',
        status: 'active',
        sessions: 36,
        clients: 20
      },
      {
        id: 'adaptive-sports',
        name: '적응형 스포츠',
        description: '개인의 특성과 능력에 맞게 조정된 적응형 스포츠 활동 프로그램',
        icon: 'medal',
        status: 'active',
        sessions: 42,
        clients: 22
      }
    ]
  }
};
