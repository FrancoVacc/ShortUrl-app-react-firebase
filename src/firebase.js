
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyA8J_YRu4tgDJTDybzv53MAHTieQBMao5k",
  authDomain: "react-firebase-a686e.firebaseapp.com",
  projectId: "react-firebase-a686e",
  storageBucket: "react-firebase-a686e.appspot.com",
  messagingSenderId: "846315651794",
  appId: "1:846315651794:web:cf1850e92e640e453aa30b"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
export const auth = getAuth(app);

