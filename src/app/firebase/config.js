import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de firebase se guarda en .env para evitar mal uso
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRESTORE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIRESTORE_MEASUREMENT_ID
  };
  
// Inicializamos Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();



