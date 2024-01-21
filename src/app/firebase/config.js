import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbcqkSR6vCRuFKPmfC_80-7vLTsXHK94Y",
  authDomain: "proactivity-db.firebaseapp.com",
  projectId: "proactivity-db",
  storageBucket: "proactivity-db.appspot.com",
  messagingSenderId: "74758377432",
  appId: "1:74758377432:web:9f0c90aae2faa6e967acad",
  measurementId: "G-XBW5BTYEMS"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();