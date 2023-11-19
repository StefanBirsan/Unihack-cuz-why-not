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
    apiKey: "AIzaSyCWtbZwrdQ1pPHIN1jOpkcBU3iKyqdv4Xg",
    authDomain: "amazingproject-61eb2.firebaseapp.com",
    projectId: "amazingproject-61eb2",
    storageBucket: "amazingproject-61eb2.appspot.com",
    messagingSenderId: "755208471412",
    appId: "1:755208471412:web:6281db00a41e249882a221",
    measurementId: "G-HG8YVR6WL4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getFirestore(FIREBASE_APP);