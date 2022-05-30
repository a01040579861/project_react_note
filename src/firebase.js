// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxZuZb6IOJks0QAaJBNfAusUKufrD4Q7k",
  authDomain: "react-note-bdfa7.firebaseapp.com",
  projectId: "react-note-bdfa7",
  storageBucket: "react-note-bdfa7.appspot.com",
  messagingSenderId: "828021410736",
  appId: "1:828021410736:web:9b0e0d82b5ec56d2e86475",
  measurementId: "G-KDNSDS2P49"
};

initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
