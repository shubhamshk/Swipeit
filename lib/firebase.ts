import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAT-OgbckSe9CkKNiefd-q2QGxaVmIaU7s",
  authDomain: "launchswipe.firebaseapp.com",
  projectId: "launchswipe",
  storageBucket: "launchswipe.firebasestorage.app",
  messagingSenderId: "479317649595",
  appId: "1:479317649595:web:53f4c5793b33cdff3be19e",
  measurementId: "G-XBZQJCR7SE"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };