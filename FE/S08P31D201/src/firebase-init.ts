import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyApxj3R7G6FBh_iA6J7iVklXAdPx68VdqQ",
  authDomain: "detecto-92de8.firebaseapp.com",
  projectId: "detecto-92de8",
  storageBucket: "detecto-92de8.appspot.com",
  messagingSenderId: "849569437999",
  appId: "1:849569437999:web:f0896484f6e1c67ae3e9da",
  measurementId: "G-SPCW1TNPV7"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDPYXra_6vq8OhKYtJVJhY75KW8G5nQWB4",
//   authDomain: "detecto-49eca.firebaseapp.com",
//   projectId: "detecto-49eca",
//   storageBucket: "detecto-49eca.appspot.com",
//   messagingSenderId: "214750770681",
//   appId: "1:214750770681:web:d847bbd4d7df57ffb3f928"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);