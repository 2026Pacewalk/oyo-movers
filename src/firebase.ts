// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// export const firebaseConfig = {
//   apiKey: "AIzaSyAi4THuuaU92ncvrZZh1o5f0YqT-ZZsqHs",
//   authDomain: "oyo-movers.firebaseapp.com",
//   projectId: "oyo-movers",
//   storageBucket: "oyo-movers.appspot.com",
//   messagingSenderId: "985205587586",
//   appId: "1:985205587586:web:03507dbc511808ec04be9b",
//   measurementId: "G-4PB35W798R"
// };

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
