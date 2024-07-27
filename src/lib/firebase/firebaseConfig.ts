import { initializeApp, getApps, getApp } from "firebase/app";
//import { initializeApp } from 'firebase-admin/app';


import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firebaseAuth = getAuth(firebaseApp);

// Set persistence to LOCAL
setPersistence(firebaseAuth, browserLocalPersistence)
    .then(() => {
        console.log("Firebase persistence set to LOCAL");
    })
    .catch((error) => {
        console.error("Error setting Firebase persistence:", error);
    });

export { firebaseApp, firebaseAuth };
