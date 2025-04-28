import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

// 프로그램 컬렉션 참조
const programsCollection = collection(db, 'programs');

// 모든 프로그램 가져오기
export const getAllPrograms = async () => {
  try {
    const q = query(programsCollection, orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('프로그램 데이터 로드 오류:', error);
    throw error;
  }
};

// 새 프로그램 추가
export const addProgram = async (programData) => {
  try {
    const docRef = await addDoc(programsCollection, {
      ...programData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('프로그램 추가 오류:', error);
    throw error;
  }
};

// 프로그램 수정
export const updateProgram = async (id, programData) => {
  try {
    const programRef = doc(db, 'programs', id);
    await updateDoc(programRef, {
      ...programData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('프로그램 수정 오류:', error);
    throw error;
  }
};

// 프로그램 삭제
export const deleteProgram = async (id) => {
  try {
    const programRef = doc(db, 'programs', id);
    await deleteDoc(programRef);
  } catch (error) {
    console.error('프로그램 삭제 오류:', error);
    throw error;
  }
};

// 프로그램 활성화 상태 변경
export const toggleProgramActive = async (id, currentStatus) => {
  try {
    const programRef = doc(db, 'programs', id);
    await updateDoc(programRef, {
      isActive: !currentStatus,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('프로그램 상태 변경 오류:', error);
    throw error;
  }
};

// 기본 프로그램 데이터 마이그레이션
export const migrateInitialPrograms = async () => {
  const initialPrograms = [
    {
      name: '언어치료',
      description: '언어발달지연, 유창성장애(말더듬), 조음음운장애, 중복언어장애, 의사소통프로그램 등',
      order: 1,
      isActive: true
    },
    {
      name: '미술치료',
      description: '발달미술치료, 심리미술치료, 기초미술치료, 사회성 집단미술치료, 퍼포먼스 오감 미술치료',
      order: 2,
      isActive: true
    },
    {
      name: '감각통합',
      description: '신체지각, 운동기획, 공간지각 발달, 전정감, 고유감, 촉각, 적응반응, 신체협응 등',
      order: 3,
      isActive: true
    },
    {
      name: '음악치료',
      description: '노래부르기, 악기연주, 음악감상, 소리 지각 및 구별, 호흡 및 발성, 악양, 심호작용 향상, 사회기술 발달 등',
      order: 4,
      isActive: true
    },
    {
      name: '특수체육',
      description: '인지영역, 신체적 영역, 정의적 영역 발달',
      order: 5,
      isActive: true
    },
    {
      name: '놀이치료',
      description: '아동의 내면적 세계 표현, 문제해결능력 및 자기조절력, 공감적 상호작용, 부정적 인지 사고 재개념화',
      order: 6,
      isActive: true
    },
    {
      name: '심리운동',
      description: '신체경험, 신체지각, 운동조절 및 기획, 물질경험, 환경경험, 사회경험, 사회지각 및 인지, 사회적 정서 발달',
      order: 7,
      isActive: true
    },
    {
      name: '부모상담/심리검사',
      description: '지능양육코칭, 효율적 양육기술, 감정코칭, 우울, 불안, 분노조절, 기록상담, 종합심리검사 등',
      order: 8,
      isActive: true
    }
  ];

  try {
    let count = 0;
    for (const program of initialPrograms) {
      await addProgram(program);
      count++;
    }
    return count;
  } catch (error) {
    console.error('기본 프로그램 데이터 마이그레이션 오류:', error);
    throw error;
  }
}; 