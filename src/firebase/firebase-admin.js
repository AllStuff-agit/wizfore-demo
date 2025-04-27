import * as admin from 'firebase-admin';

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_DATABASE_URL
} = process.env;

// 필수 값이 없으면 에러를 던져 빠르게 인지하도록
if (!FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY ||
    !FIREBASE_DATABASE_URL) {
  throw new Error('Missing one of Firebase admin environment variables');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:    FIREBASE_PROJECT_ID,
      clientEmail:  FIREBASE_CLIENT_EMAIL,
      privateKey:   FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

export default admin;
