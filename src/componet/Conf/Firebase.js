// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMqS8qlSKDC7cLw8N3S_NvIsiJi_MhuSU",
  authDomain: "movies-51cb8.firebaseapp.com",
  projectId: "movies-51cb8",
  storageBucket: "movies-51cb8.appspot.com",
  messagingSenderId: "897102380905",
  appId: "1:897102380905:web:454c08d2cfcdab3ca4c7f8",
  measurementId: "G-63S7WCRZNH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
