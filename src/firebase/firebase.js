import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDmuAmLG4o-gH6X3jFI1o5FG6HGiqpDX6M",
  authDomain: "wizfore-demo.firebaseapp.com",
  projectId: "wizfore-demo",
  storageBucket: "wizfore-demo.firebasestorage.app",
  messagingSenderId: "12717939021",
  appId: "1:12717939021:web:261ce55355dd0cfdddff04",
  databaseURL: "https://wizfore-demo-default-rtdb.asia-southeast1.firebasedatabase.app/"

  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };