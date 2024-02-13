// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3Oz8EjEPYbubbwfHilVPhPFCjjqF3Rf0',
  authDomain: 'new-speed-bdd49.firebaseapp.com',
  projectId: 'new-speed-bdd49',
  storageBucket: 'new-speed-bdd49.appspot.com',
  messagingSenderId: '338185226699',
  appId: '1:338185226699:web:6c7b3a287e89f1d40ece4e'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
