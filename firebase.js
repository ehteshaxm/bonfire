// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDL09Y7BlYmOulUSDvczQAa6tQF-aTFbGQ',
  authDomain: 'bonfire-93887.firebaseapp.com',
  projectId: 'bonfire-93887',
  storageBucket: 'bonfire-93887.appspot.com',
  messagingSenderId: '1014206071130',
  appId: '1:1014206071130:web:1918642261755b85f6b363',
  measurementId: 'G-8ZQB6PSVRQ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
