import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA17X5NC0Y6xcZ9nTkm6nwNChGVk_CSC7o",
  authDomain: "react-native-firebase-eec57.firebaseapp.com",
  projectId: "react-native-firebase-eec57",
  storageBucket: "react-native-firebase-eec57.appspot.com",
  messagingSenderId: "365997127231",
  appId: "1:365997127231:web:e4c166bf5dd915c4646a8a",
};

initializeApp(firebaseConfig);


export const database = getFirestore();
