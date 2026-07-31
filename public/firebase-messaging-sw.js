importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyAi4THuuaU92ncvrZZh1o5f0YqT-ZZsqHs",
    authDomain: "oyo-movers.firebaseapp.com",
    projectId: "oyo-movers",
    storageBucket: "oyo-movers.appspot.com",
    messagingSenderId: "985205587586",
    appId: "1:985205587586:web:03507dbc511808ec04be9b",
    measurementId: "G-4PB35W798R"
});


// firebase.initializeApp({
//     apiKey: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_API_KEY,
//     authDomain: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_AUTH_DOMAIN,
//     projectId: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_PROJECT_ID,
//     storageBucket: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_STORAGE_BUCKET,
//     messagingSenderId: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MESSAGING_SENDER_ID,
//     appId: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_APP_ID,
//     measurementId: self.publicRuntimeConfig.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MEASUREMENT_ID
// });

// firebase.initializeApp({
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_STORAGE_BUCKET,
//     messagingSenderId:
//       process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_NOTIFICATIONS_MEASUREMENT_ID,
// });

// Initialize the Firebase app in the service worker by passing in the
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
