import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDchCTPIUiLEoCYrwBXoXCaaBMWBlYN5qk",
  authDomain: "recipegpt-270c7.firebaseapp.com",
  projectId: "recipegpt-270c7",
  storageBucket: "recipegpt-270c7.appspot.com", // ✅ FIXED
  messagingSenderId: "314269568302",
  appId: "1:314269568302:web:231a72543ba6cef144bebf",
  measurementId: "G-1TVPHJ18PL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
