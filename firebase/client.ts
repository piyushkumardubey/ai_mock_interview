// Import the functions you need from the SDKs you need
import {initializeApp, getApps, getApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import{ getFirestore } from 'firebase/firestore'; // Make sure this import is correct

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF5mXNqY8bBu02cCw8wYCabE3yOPBaHRk",
    authDomain: "prewise-6100e.firebaseapp.com",
    projectId: "prewise-6100e",
    storageBucket: "prewise-6100e.firebasestorage.app",
    messagingSenderId: "861134329105",
    appId: "1:861134329105:web:63a5e78763559c7658a8b0",
    measurementId: "G-XHF1TT58V5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);




