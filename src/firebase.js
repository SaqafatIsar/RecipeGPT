// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔁 Replace this with your NEW config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB8F_Nsbx7YwD1U7cV80cbtxFmJ1ivgGi4",
  authDomain: "recipegpt-27682.firebaseapp.com",
  projectId: "recipegpt-27682",
  storageBucket: "recipegpt-27682.firebasestorage.app",
  messagingSenderId: "434071531942",
  appId: "1:434071531942:web:7efef4a47a3c8e98c71f67",
  measurementId: "G-19RDNV1SY3"
};

const app = initializeApp(firebaseConfig);

// ✅ Export auth and database
export const auth = getAuth(app);
export const db = getFirestore(app);
