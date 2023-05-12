importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDPYXra_6vq8OhKYtJVJhY75KW8G5nQWB4",
  authDomain: "detecto-49eca.firebaseapp.com",
  projectId: "detecto-49eca",
  storageBucket: "detecto-49eca.appspot.com",
  messagingSenderId: "214750770681",
  appId: "1:214750770681:web:d847bbd4d7df57ffb3f928"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });