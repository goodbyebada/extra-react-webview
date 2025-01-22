// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TOD O: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS1NhKQw7Zo4pK2T5aBy3cGaebneo-_cM",
  authDomain: "extra-a6046.firebaseapp.com",
  projectId: "extra-a6046",
  storageBucket: "extra-a6046.firebasestorage.app",
  messagingSenderId: "351934910176",
  appId: "1:351934910176:web:3b5d5b2feaf46fa3a28a85",
  measurementId: "G-WBFQPPHVHP",
};

const initialLizedApp = initializeApp(firebaseConfig);
// firestore 객체 생성
const db = getFirestore(initialLizedApp);

// firestore export
export { initialLizedApp, db };
