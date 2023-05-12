import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDPYXra_6vq8OhKYtJVJhY75KW8G5nQWB4",
  authDomain: "detecto-49eca.firebaseapp.com",
  projectId: "detecto-49eca",
  storageBucket: "detecto-49eca.appspot.com",
  messagingSenderId: "214750770681",
  appId: "1:214750770681:web:d847bbd4d7df57ffb3f928"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);