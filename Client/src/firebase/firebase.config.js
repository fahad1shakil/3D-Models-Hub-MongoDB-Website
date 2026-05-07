// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { LuRotate3D } from "react-icons/lu";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUl2IBb9c655YIvAL61TP3LQGNaiMorcc",
  authDomain: "con10-fe2ee.firebaseapp.com",
  projectId: "con10-fe2ee",
  storageBucket: "con10-fe2ee.firebasestorage.app",
  messagingSenderId: "929286496618",
  appId: "1:929286496618:web:fb48b5ca263d3e83e68513",
  measurementId: "G-GN6BX5EFPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
