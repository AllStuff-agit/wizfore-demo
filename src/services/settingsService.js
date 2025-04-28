import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SETTINGS_DOC_ID = 'site_info';

export const getSettings = async () => {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting settings:', error);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}; 