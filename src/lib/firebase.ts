'use client'

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { 
  getFirestore
} from 'firebase/firestore';
import {   enableIndexedDbPersistence } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN! || "wizfore-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID! || "wizfore-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!  || "wizfore-demo.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID! || "12717939021",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID! || "1:12717939021:web:261ce55355dd0cfdddff04"
};

// const firebaseConfig = {
  
//   apiKey: "AIzaSyDmuAmLG4o-gH6X3jFI1o5FG6HGiqpDX6M",
//   authDomain: "wizfore-demo.firebaseapp.com",
//   projectId: "wizfore-demo",
//   storageBucket: "wizfore-demo.firebasestorage.app",
//   messagingSenderId: "12717939021",
//   appId: "1:12717939021:web:261ce55355dd0cfdddff04"

// };


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// 디버깅 정보 출력
console.log('Firebase 초기화됨');
console.log('Firebase 앱 이름:', app.name);
console.log('Firestore 인스턴스 생성됨');

// 오프라인 지속성 활성화 (선택 사항)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log('Firestore 오프라인 지속성 활성화됨');
    })
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('다중 탭이 열려있어 오프라인 지속성을 활성화할 수 없습니다');
      } else if (err.code === 'unimplemented') {
        console.warn('현재 브라우저는 오프라인 지속성을 지원하지 않습니다');
      } else {
        console.error('Firestore 지속성 활성화 오류:', err);
      }
    });
}

export { app, auth, db, storage };