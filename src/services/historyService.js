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
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('isActive', '==', true),
      orderBy('year', 'asc'),
      orderBy('month', 'asc'),
      orderBy('day', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('연혁 데이터를 불러오는데 실패했습니다:', error);
    throw error;
  }
};

// 관리자 페이지용 - 모든 연혁 가져오기
export const getAllHistory = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('year', 'asc'),
      orderBy('month', 'asc'),
      orderBy('day', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('모든 연혁 데이터를 불러오는데 실패했습니다:', error);
    throw error;
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
