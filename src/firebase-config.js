// firebase-config.js 
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIeFEukLAitagI5apERsfnUlKBieOl7bY",
  authDomain: "travelmedic-af210.firebaseapp.com",
  projectId: "travelmedic-af210",
  storageBucket: "travelmedic-af210.firebasestorage.app",
  messagingSenderId: "111585316127",
  appId: "1:111585316127:web:503259c3f7718d6aac342a",
  measurementId: "G-Y49RWL00FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(app);

export { auth };