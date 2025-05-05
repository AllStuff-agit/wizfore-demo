import { db } from '../firebase/firebase';
import { 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  setDoc, 
  updateDoc, 
  serverTimestamp
} from 'firebase/firestore';

// 컬렉션 이름
export const SETTINGS_COLLECTION = 'settings';

// 자주 사용되는 설정 문서 ID
export const SITE_CONFIG_DOC_ID = 'siteConfig';
export const HOME_CONFIG_DOC_ID = 'homeConfig';

/**
 * 설정 문서 가져오기
 * @param {string} docId - 문서 ID
 * @returns {Promise<Object|null>} - 설정 데이터 또는 null
 */
export const getSettingsDoc = async (docId) => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`${docId} 문서가 존재하지 않습니다`);
      return null;
    }
  } catch (error) {
    console.error(`${docId} 설정 가져오기 오류:`, error);
    throw error;
  }
};

/**
 * 사이트 설정 가져오기
 * @returns {Promise<Object|null>} - 사이트 설정 데이터 또는 null
 */
export const getSiteSettings = async () => {
  return getSettingsDoc(SITE_CONFIG_DOC_ID);
};

/**
 * 홈 페이지 설정 가져오기
 * @returns {Promise<Object|null>} - 홈 페이지 설정 데이터 또는 null
 */
export const getHomeSettings = async () => {
  return getSettingsDoc(HOME_CONFIG_DOC_ID);
};

/**
 * 모든 설정 가져오기
 * @returns {Promise<Object>} - 모든 설정 데이터
 */
export const getAllSettings = async () => {
  try {
    const settingsCollection = await getDocs(collection(db, SETTINGS_COLLECTION));
    const settings = {};
    
    settingsCollection.forEach((doc) => {
      settings[doc.id] = doc.data();
    });
    
    return settings;
  } catch (error) {
    console.error('설정 가져오기 오류:', error);
    throw error;
  }
};

/**
 * 설정 문서 업데이트
 * @param {string} docId - 문서 ID
 * @param {Object} data - 저장할 데이터
 * @returns {Promise<void>}
 */
export const updateSettingsDoc = async (docId, data) => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, docId);
    const docSnap = await getDoc(docRef);
    
    // 문서 존재 여부에 따라 setDoc 또는 updateDoc 사용
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    console.log(`${docId} 설정 저장 완료`);
  } catch (error) {
    console.error(`${docId} 설정 저장 오류:`, error);
    throw error;
  }
};

/**
 * 사이트 설정 업데이트
 * @param {Object} data - 저장할 데이터
 * @returns {Promise<void>}
 */
export const updateSiteSettings = async (data) => {
  return updateSettingsDoc(SITE_CONFIG_DOC_ID, data);
};

/**
 * 홈 페이지 설정 업데이트
 * @param {Object} data - 저장할 데이터
 * @returns {Promise<void>}
 */
export const updateHomeSettings = async (data) => {
  return updateSettingsDoc(HOME_CONFIG_DOC_ID, data);
};

// 하위 호환성을 위한 기존 함수 유지
export const getSettings = getSiteSettings;
export const updateSettings = updateSiteSettings;