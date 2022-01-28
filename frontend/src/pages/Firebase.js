import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCXTA4lMfCFmmOIe9Ti8-4pZ75D_G-EmTA",
  authDomain: "development-fefbe.firebaseapp.com",
  projectId: "development-fefbe",
  storageBucket: "development-fefbe.appspot.com",
  messagingSenderId: "642435839318",
  appId: "1:642435839318:web:cd72793639266203e852f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
