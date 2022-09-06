import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAqhFxwXwXQDq3Wkc_tKF6XqBsbg-0jCxo",

  authDomain: "crop-ai-a62ae.firebaseapp.com",

  projectId: "crop-ai-a62ae",

  storageBucket: "crop-ai-a62ae.appspot.com",

  messagingSenderId: "245929269525",

  appId: "1:245929269525:web:70258884a923d3dc84f11c",

  measurementId: "G-XEL3BECB6R",
};

// Initialize Firebase

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
