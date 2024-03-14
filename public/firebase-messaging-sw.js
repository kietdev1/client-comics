// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyAiXVY_SzuQqTcwF11t1XtgKiz5WW-Y7N0",
    authDomain: "fast-scans.firebaseapp.com",
    projectId: "fast-scans",
    storageBucket: "fast-scans.appspot.com",
    messagingSenderId: "1014287035776",
    appId: "1:1014287035776:web:d4228ca08f707cf977e565",
    measurementId: "G-PWC03B46V3"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/icons/icon-192x192.png',
        data: {
            click_action: payload.data.click_action
        }
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});

function handleClick(event) {
    console.log(event)
    event.notification.close();
    // Open the url you set on notification.data
    clients.openWindow(event.notification.data.click_action)
}
self.addEventListener('notificationclick', handleClick);