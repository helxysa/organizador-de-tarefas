// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyDcM-n7rOE93hjJvmOeZNbz4mW1-C_gWgg",
  authDomain: "organizador-de-tarefas-87701.firebaseapp.com",
  projectId: "organizador-de-tarefas-87701",
  storageBucket: "organizador-de-tarefas-87701.firebasestorage.app",
  messagingSenderId: "480713926627",
  appId: "1:480713926627:web:02618f3cc050380e9f62d6",
  measurementId: "G-XKD9WNELDG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
