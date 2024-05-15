// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore için getFirestore fonksiyonunu içe aktar
import { getDatabase } from "firebase/database";
import { storage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ZWVRFaUQ-G4fW9TMqF4proyDZuDeyf4",
  authDomain: "pawologue.firebaseapp.com",
  databaseURL:"https://pawologue-default-rtdb.firebaseio.com/",
  projectId: "pawologue",
  storageBucket: "pawologue.appspot.com",
  messagingSenderId: "299086677755",
  appId: "1:299086677755:web:8dee59e89a6fcffc2f525e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export default {db,app,database}; // db nesnesini export et
