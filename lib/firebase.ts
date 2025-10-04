import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD8vwvuqG8oum3rP4s1NK9sSSmMLCTcTFg",
  authDomain: "ask-y-5705f.firebaseapp.com",
  projectId: "ask-y-5705f",
  storageBucket: "ask-y-5705f.firebasestorage.app",
  messagingSenderId: "786528042733",
  appId: "1:786528042733:web:b9fe6ccc11bfb429ac56e4",
  measurementId: "G-37NGXQGTXT",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
