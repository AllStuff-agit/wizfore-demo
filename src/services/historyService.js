import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const COLLECTION_NAME = 'history';

// 공개 페이지용 - 활성화된 연혁만 가져오기
export const getActiveHistory = async () => {
  try {
    console.log('getActiveHistory: 연혁 데이터 불러오기 시작');
    // 복합 쿼리 오류 가능성이 있으므로 인덱스 없이 모든 데이터를 가져온 후 필터링
    const historyRef = collection(db, COLLECTION_NAME);
    console.log('컬렉션 참조 생성:', COLLECTION_NAME);
    
    // 단순 쿼리로 시작
    const querySnapshot = await getDocs(historyRef);
    console.log(`쿼리 실행 완료, ${querySnapshot.docs.length}개 문서 반환`);
    
    // 클라이언트 측에서 필터링하고 정렬
    const allData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 활성화된 항목만 필터링
    const activeItems = allData.filter(item => item.isActive === true);
    console.log(`활성화된 항목 ${activeItems.length}개 필터링됨`);
    
    // 날짜순으로 정렬
    const sortedItems = activeItems.sort((a, b) => {
      // 연도 비교
      if (a.year !== b.year) return a.year.localeCompare(b.year);
      // 월 비교
      if (a.month !== b.month) return a.month.localeCompare(b.month);
      // 일 비교
      return a.day.localeCompare(b.day);
    });
    
    console.log('필터링 및 정렬 완료:', sortedItems.length);
    return sortedItems;
  } catch (error) {
    console.error('연혁 데이터를 불러오는데 실패했습니다:', error);
    console.error('오류 상세:', error.message, error.code);
    // 에러가 발생해도 빈 배열 반환
    return [];
  }
};

// 관리자 페이지용 - 모든 연혁 가져오기
export const getAllHistory = async () => {
  try {
    console.log('getAllHistory: 모든 연혁 항목 불러오기 시작');
    
    // 복합 쿼리 없이 단순하게 데이터 가져오기
    const historyRef = collection(db, COLLECTION_NAME);
    console.log('컬렉션 참조 생성:', COLLECTION_NAME);
    
    const querySnapshot = await getDocs(historyRef);
    console.log(`쿼리 실행 완료, ${querySnapshot.docs.length}개 문서 반환`);
    
    const allData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 클라이언트 측에서 정렬
    const sortedItems = allData.sort((a, b) => {
      // 연도 비교
      if (a.year !== b.year) return a.year.localeCompare(b.year);
      // 월 비교
      if (a.month !== b.month) return a.month.localeCompare(b.month);
      // 일 비교
      return a.day.localeCompare(b.day);
    });
    
    console.log('정렬된 데이터:', sortedItems);
    return sortedItems;
  } catch (error) {
    console.error('모든 연혁 데이터를 불러오는데 실패했습니다:', error);
    console.error('오류 상세:', error.message, error.code);
    
    // 에러가 발생해도 빈 배열 반환
    return [];
  }
};

// 연혁 항목 추가
export const addHistoryItem = async (historyItem) => {
  try {
    const itemWithActive = {
      ...historyItem,
      isActive: historyItem.isActive !== undefined ? historyItem.isActive : true
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), itemWithActive);
    return { id: docRef.id, ...itemWithActive };
  } catch (error) {
    console.error('연혁 항목 추가에 실패했습니다:', error);
    throw error;
  }
};

// 연혁 항목 수정
export const updateHistoryItem = async (id, historyItem) => {
  try {
    const historyRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(historyRef, historyItem);
    return { id, ...historyItem };
  } catch (error) {
    console.error('연혁 항목 수정에 실패했습니다:', error);
    throw error;
  }
};

// 연혁 항목 삭제
export const deleteHistoryItem = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return id;
  } catch (error) {
    console.error('연혁 항목 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 연혁 상태 토글 (활성화/비활성화)
export const toggleHistoryActive = async (id, currentStatus) => {
  try {
    const historyRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(historyRef, { isActive: !currentStatus });
    return { id, isActive: !currentStatus };
  } catch (error) {
    console.error('연혁 항목 상태 변경에 실패했습니다:', error);
    throw error;
  }
};

// API를 통해 기본 연혁 데이터 가져오기
export const getInitialHistoryData = async () => {
  try {
    const response = await fetch('/api/migrate-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('기본 데이터 가져오기 실패');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('초기 데이터 가져오기 실패:', error);
    throw error;
  }
};

// 초기 데이터 마이그레이션
export const migrateInitialHistory = async () => {
  try {
    // 기본 데이터 가져오기
    const initialData = await getInitialHistoryData();
    
    // Firestore에 추가
    const batch = [];
    for (const item of initialData) {
      batch.push(addHistoryItem(item));
    }
    
    await Promise.all(batch);
    return initialData.length;
  } catch (error) {
    console.error('데이터 마이그레이션 실패:', error);
    throw error;
  }
};
