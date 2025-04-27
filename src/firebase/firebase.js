import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID
} = process.env;

const firebaseConfig = {
  
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY.replace(/\\n/g, '\n'),
  authDomain: "wizfore-demo.firebaseapp.com",
  projectId: "wizfore-demo",
  storageBucket: "wizfore-demo.firebasestorage.app",
  messagingSenderId: "12717939021",
  appId: "1:12717939021:web:261ce55355dd0cfdddff04"

};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };