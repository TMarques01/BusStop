// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF_HjiGruXV10vbTDgwGjY737Nxl8g4vE",
  authDomain: "busstop-63bfe.firebaseapp.com",
  projectId: "busstop-63bfe",
  storageBucket: "busstop-63bfe.firebasestorage.app",
  messagingSenderId: "1048021819914",
  appId: "1:1048021819914:web:56ea703726778b8e54b5f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };