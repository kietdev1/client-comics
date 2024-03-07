import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import localforage from 'localforage';

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token');
    },

    //initializing firebase app
    init: async function () {
        const firebaseApp = initializeApp({
            apiKey: "AIzaSyAiXVY_SzuQqTcwF11t1XtgKiz5WW-Y7N0",
            authDomain: "fast-scans.firebaseapp.com",
            projectId: "fast-scans",
            storageBucket: "fast-scans.appspot.com",
            messagingSenderId: "1014287035776",
            appId: "1:1014287035776:web:d4228ca08f707cf977e565",
            measurementId: "G-PWC03B46V3"
        });

        try {
            const messaging = getMessaging(firebaseApp);
            const tokenInLocalForage = await this.tokenInlocalforage();

            //if FCM token is already there just return the token
            if (tokenInLocalForage !== null) {
                return tokenInLocalForage;
            }

            //requesting notification permission from browser
            const status = await Notification.requestPermission();
            if (status && status === 'granted') {
                //getting token from FCM
                const fcm_token = await getToken(messaging, { vapidKey: 'BMK1U8K65AWtMmZTxB3MGpMq9IZbavX2VHqd62HoIe_JMxhrR4QiuGlgOzg0CaovinQNiA72BwitIP3Iob17has' });
                if (fcm_token) {
                    //setting FCM token in indexed db using localforage
                    localforage.setItem('fcm_token', fcm_token);
                    //return the FCM token after saving it
                    return fcm_token;
                }
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};
export { firebaseCloudMessaging };