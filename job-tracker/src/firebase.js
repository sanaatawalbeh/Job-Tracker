// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeuJLcXT7cVZZDdhf_jbwHTlQIGorUHgA",
  authDomain: "job-tracker-1b825.firebaseapp.com",
  projectId: "job-tracker-1b825",
  storageBucket: "job-tracker-1b825.firebasestorage.app",
  messagingSenderId: "1082860405240",
  appId: "1:1082860405240:web:798399ee5b5d60d7cfd60d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
