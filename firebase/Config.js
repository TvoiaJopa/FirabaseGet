// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  //data
};

initializeApp(firebaseConfig);

const MESSAGES = "messages";

const firestore = getFirestore();

export {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  MESSAGES,
};
