import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzSS9VYEovi4CqayJ9SBFvBO1DzQtSUgE",
    authDomain: "spending-tracker-c0529.firebaseapp.com",
    projectId: "spending-tracker-c0529",
    storageBucket: "spending-tracker-c0529.appspot.com",
    messagingSenderId: "92404839654",
    appId: "1:92404839654:web:b618df23135cedc7023727",
    measurementId: "G-FT0WPPEP4Y"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore();