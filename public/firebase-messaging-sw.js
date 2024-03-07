importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAiXVY_SzuQqTcwF11t1XtgKiz5WW-Y7N0",
    authDomain: "fast-scans.firebaseapp.com",
    projectId: "fast-scans",
    storageBucket: "fast-scans.appspot.com",
    messagingSenderId: "1014287035776",
    appId: "1:1014287035776:web:d4228ca08f707cf977e565",
    measurementId: "G-PWC03B46V3"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    const notification = payload.data.notification;
    const options = {
        body: notification.body,
        icon: '/icons/icon-192x192.png',
    };
    registration.showNotification(notification.title, options);
});