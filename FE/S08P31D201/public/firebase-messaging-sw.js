importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyApxj3R7G6FBh_iA6J7iVklXAdPx68VdqQ",
  authDomain: "detecto-92de8.firebaseapp.com",
  projectId: "detecto-92de8",
  storageBucket: "detecto-92de8.appspot.com",
  messagingSenderId: "849569437999",
  appId: "1:849569437999:web:f0896484f6e1c67ae3e9da",
  measurementId: "G-SPCW1TNPV7"
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