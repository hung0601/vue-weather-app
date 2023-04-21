import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoWhfFOVRLQ9ILZKIyUG8eeKUfKs9R3hk",
  authDomain: "vue-js-2a8ee.firebaseapp.com",
  projectId: "vue-js-2a8ee",
  storageBucket: "vue-js-2a8ee.appspot.com",
  messagingSenderId: "1002086315583",
  appId: "1:1002086315583:web:27264e19650f9822a2aa8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth();

export { app, auth };
