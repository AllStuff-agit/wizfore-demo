import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
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
 * 카테고리별 서비스 데이터 가져오기
 * @param {string} category - 서비스 카테고리 (발달재활서비스, 성인주간활동, 방과후활동, 특수스포츠교실)
 * @returns {Promise<Array>} - 서비스 데이터 배열
 */
export const getServicesByCategory = async (category) => {
  try {
    const q = query(
      servicesCollection, 
      where("category", "==", category),
      orderBy("name")
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`${category} 서비스 데이터 가져오기 오류:`, error);
    throw error;
  }
};

/**
 * 단일 서비스 데이터 가져오기
 * @param {string} serviceId - 서비스 문서 ID
 * @returns {Promise<Object|null>} - 서비스 데이터 객체
 */
export const getServiceById = async (serviceId) => {
  try {
    const serviceRef = doc(servicesCollection, serviceId);
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
    console.error(`서비스 데이터 가져오기 오류 (ID: ${serviceId}):`, error);
    throw error;
  }
};

/**
 * 새 서비스 데이터 추가
 * @param {Object} serviceData - 추가할 서비스 데이터
 * @returns {Promise<string>} - 생성된 문서 ID
 */
export const addService = async (serviceData) => {
  try {
    // 타임스탬프 추가
    const dataWithTimestamp = {
      ...serviceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(servicesCollection, dataWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error('서비스 데이터 추가 오류:', error);
    throw error;
  }
};

/**
 * 여러 서비스 데이터 일괄 추가 (배치 작업용 함수)
 * @param {Array} serviceDataArray - 추가할 서비스 데이터 배열
 * @param {FirebaseFirestore.WriteBatch} batch - Firestore 배치 객체
 */
export const addServicesBatch = (serviceDataArray, batch) => {
  try {
    serviceDataArray.forEach(serviceData => {
      // 새 문서 참조 생성
      const newDocRef = doc(servicesCollection);
      
      // 타임스탬프 추가
      const dataWithTimestamp = {
        ...serviceData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // 배치에 작업 추가
      batch.set(newDocRef, dataWithTimestamp);
    });
  } catch (error) {
    console.error('서비스 데이터 일괄 추가 오류:', error);
    throw error;
  }
};

/**
 * 서비스 데이터 업데이트
 * @param {string} serviceId - 업데이트할 서비스 문서 ID
 * @param {Object} serviceData - 업데이트할 서비스 데이터
 * @returns {Promise<void>}
 */
export const updateService = async (serviceId, serviceData) => {
  try {
    const serviceRef = doc(servicesCollection, serviceId);
    
    // 타임스탬프 추가
    const dataWithTimestamp = {
      ...serviceData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(serviceRef, dataWithTimestamp);
  } catch (error) {
    console.error(`서비스 데이터 업데이트 오류 (ID: ${serviceId}):`, error);
    throw error;
  }
};

/**
 * 서비스 데이터 삭제
 * @param {string} serviceId - 삭제할 서비스 문서 ID
 * @returns {Promise<void>}
 */
export const deleteService = async (serviceId) => {
  try {
    const serviceRef = doc(servicesCollection, serviceId);
    await deleteDoc(serviceRef);
  } catch (error) {
    console.error(`서비스 데이터 삭제 오류 (ID: ${serviceId}):`, error);
    throw error;
  }
};

/**
 * 서비스 데이터 존재 여부 확인
 * @param {string} category - 서비스 카테고리
 * @returns {Promise<boolean>} - 데이터 존재 여부
 */
export const checkServiceExistsByCategory = async (category) => {
  try {
    const q = query(
      servicesCollection, 
      where("category", "==", category),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error(`${category} 서비스 데이터 확인 오류:`, error);
    throw error;
  }
};
