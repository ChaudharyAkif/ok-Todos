// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAECuel3fMjr9WWaV_o7yIexuYRLIa0pp8",
  authDomain: "fir-app11597.firebaseapp.com",
  projectId: "fir-app11597",
  storageBucket: "fir-app11597.firebasestorage.app",
  messagingSenderId: "808851476534",
  appId: "1:808851476534:web:f191917d92880db3da4897",
  measurementId: "G-2FXYDW3TNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {analytics,auth,firestore}