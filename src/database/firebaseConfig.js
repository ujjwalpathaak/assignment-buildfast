// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pintastic-6ea0e.firebaseapp.com",
  projectId: "pintastic-6ea0e",
  storageBucket: "pintastic-6ea0e.appspot.com",
  messagingSenderId: "834784822850",
  appId: "1:834784822850:web:9f848fccb52ca1505d8fdb",
  measurementId: "G-XDXSDDGT29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
