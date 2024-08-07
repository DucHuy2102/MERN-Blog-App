// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: 'mern-blog-d0426.firebaseapp.com',
    projectId: 'mern-blog-d0426',
    storageBucket: 'mern-blog-d0426.appspot.com',
    messagingSenderId: '639963914877',
    appId: '1:639963914877:web:7e60564e50e487a87f4714',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
