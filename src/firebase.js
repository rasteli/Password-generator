import { initializeApp } from "firebase/app"

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithRedirect
} from "firebase/auth"

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore"

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const db = getFirestore()

export const collections = {
  addDoc,
  getDocs,
  updateDoc,
  passwords: collection(db, "passwords"),
  delete: (col, id) => {
    return deleteDoc(doc(db, col, id))
  },
  getRef: (col, id) => {
    return doc(db, col, id)
  },
  query: (col, userId) => {
    return query(col, where("userId", "==", userId))
  },
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  }
}

export const methods = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  signOut
}

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app
