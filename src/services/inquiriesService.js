import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const COLLECTION_NAME = 'inquiries';

/**
 * 새 문의 추가
 * @param {Object} inquiryData - 문의 데이터
 * @returns {Promise<Object>} 추가된 문의 데이터
 */
export const addInquiry = async (inquiryData) => {
  try {
    console.log('문의 데이터 추가 시작:', inquiryData);
    
    // 메타데이터 추가
    const inquiryWithMeta = {
      ...inquiryData,
      createdAt: serverTimestamp(),
      status: 'pending', // 대기중 상태로 초기화
      resolvedAt: null,
      response: '',
      assignedTo: ''
    };
    
    // Firestore에 저장
    const docRef = await addDoc(collection(db, COLLECTION_NAME), inquiryWithMeta);
    console.log('문의 데이터 추가 완료, ID:', docRef.id);
    
    return { id: docRef.id, ...inquiryWithMeta };
  } catch (error) {
    console.error('문의 추가 실패:', error);
    throw error;
  }
};

/**
 * 모든 문의 조회
 * @returns {Promise<Array>} 문의 목록
 */
export const getAllInquiries = async () => {
  try {
    console.log('모든 문의 데이터 조회 시작');
    
    // 생성일 기준 내림차순 정렬 (최신순)
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const inquiries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`문의 데이터 ${inquiries.length}개 조회 완료`);
    return inquiries;
  } catch (error) {
    console.error('문의 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 특정 상태의 문의 조회
 * @param {string} status - 문의 상태 (pending, in_progress, resolved)
 * @returns {Promise<Array>} 문의 목록
 */
export const getInquiriesByStatus = async (status) => {
  try {
    console.log(`${status} 상태의 문의 데이터 조회 시작`);
    
    // status로 필터링된 쿼리 생성
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const inquiries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`${status} 상태의 문의 데이터 ${inquiries.length}개 조회 완료`);
    return inquiries;
  } catch (error) {
    console.error(`${status} 상태의 문의 목록 조회 실패:`, error);
    throw error;
  }
};

/**
 * 특정 문의 조회
 * @param {string} id - 문의 ID
 * @returns {Promise<Object|null>} 문의 데이터
 */
export const getInquiryById = async (id) => {
  try {
    console.log(`ID ${id}의 문의 데이터 조회 시작`);
    
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const inquiry = { id: docSnap.id, ...docSnap.data() };
      console.log(`ID ${id}의 문의 데이터 조회 완료`);
      return inquiry;
    }
    
    console.log(`ID ${id}의 문의 데이터가 없습니다.`);
    return null;
  } catch (error) {
    console.error(`ID ${id}의 문의 데이터 조회 실패:`, error);
    throw error;
  }
};

/**
 * 문의 상태 업데이트
 * @param {string} id - 문의 ID
 * @param {string} status - 새 상태 (pending, in_progress, resolved)
 * @param {string} response - 답변 내용 (선택)
 * @returns {Promise<Object>} 업데이트된 데이터
 */
export const updateInquiryStatus = async (id, status, response = '') => {
  try {
    console.log(`ID ${id}의 문의 상태 업데이트 시작:`, status);
    
    const updates = {
      status,
      updatedAt: serverTimestamp()
    };
    
    // 응답이 제공된 경우 추가
    if (response) {
      updates.response = response;
    }
    
    // 해결됨 상태로 변경된 경우 resolvedAt 추가
    if (status === 'resolved') {
      updates.resolvedAt = serverTimestamp();
    }
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
    
    console.log(`ID ${id}의 문의 상태 업데이트 완료`);
    return { id, ...updates };
  } catch (error) {
    console.error(`ID ${id}의 문의 상태 업데이트 실패:`, error);
    throw error;
  }
};

/**
 * 문의 할당 업데이트
 * @param {string} id - 문의 ID
 * @param {string} assignedTo - 할당된 사용자 ID 또는 이름
 * @returns {Promise<Object>} 업데이트된 데이터
 */
export const updateInquiryAssignment = async (id, assignedTo) => {
  try {
    console.log(`ID ${id}의 문의 할당 업데이트 시작:`, assignedTo);
    
    const updates = {
      assignedTo,
      status: assignedTo ? 'in_progress' : 'pending', // 할당 시 진행중으로 변경
      updatedAt: serverTimestamp()
    };
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, updates);
    
    console.log(`ID ${id}의 문의 할당 업데이트 완료`);
    return { id, ...updates };
  } catch (error) {
    console.error(`ID ${id}의 문의 할당 업데이트 실패:`, error);
    throw error;
  }
};

/**
 * 문의 삭제
 * @param {string} id - 문의 ID
 * @returns {Promise<string>} 삭제된 문의 ID
 */
export const deleteInquiry = async (id) => {
  try {
    console.log(`ID ${id}의 문의 삭제 시작`);
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    
    console.log(`ID ${id}의 문의 삭제 완료`);
    return id;
  } catch (error) {
    console.error(`ID ${id}의 문의 삭제 실패:`, error);
    throw error;
  }
};
