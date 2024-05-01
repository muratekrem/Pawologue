// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9ZWVRFaUQ-G4fW9TMqF4proyDZuDeyf4",
  authDomain: "pawologue.firebaseapp.com",
  projectId: "pawologue",
  storageBucket: "pawologue.appspot.com",
  messagingSenderId: "299086677755",
  appId: "1:299086677755:web:8dee59e89a6fcffc2f525e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default app;