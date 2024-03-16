import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import localforage from 'localforage';
import { parseJsonFromString } from '../json';

const firebaseCloudMessaging = {
    //checking whether token is available in indexed DB
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token');
    },

    //initializing firebase app
    init: async function () {
        const firebaseApp = initializeApp({
            apiKey: process.env.firebaseApiKey,
            authDomain: process.env.firebaseAuthDomain,
            projectId: process.env.firebaseProjectId,
            storageBucket: process.env.firebaseStorageBucket,
            messagingSenderId: process.env.firebaseMessagingSenderId,
            appId: process.env.firebaseAppId,
            measurementId: process.env.firebaseMeasurementId
        });

        try {
            const messaging = getMessaging(firebaseApp);
            const tokenInLocalForage = await this.tokenInlocalforage();
            const isAllowNotification = parseJsonFromString<boolean | null>(localStorage.getItem("isAllowNotification"));

            //if FCM token is already there just return the token
            if (tokenInLocalForage) {
                return { tokenInLocalForage, isNewRegister: false };
            }

            //requesting notification permission from browser
            if (isAllowNotification) {
                alert("ios")
                // Error "no service worker" - retry 3 times to register tokens.
                let retry = 0;
                do {
                    try {
                        //getting token from FCM
                        const fcm_token = await getToken(messaging, { vapidKey: process.env.firebaseMessagingServerKey });
                        alert("fcm_token" + fcm_token)
                        if (fcm_token) {
                            //setting FCM token in indexed db using localforage
                            localforage.setItem('fcm_token', fcm_token);
                            //return the FCM token after saving it
                            return { tokenInLocalForage: fcm_token, isNewRegister: true };
                        }
                    }
                    catch (error) {
                        alert("retry " + error);
                        retry++;
                    }
                } while (retry <= 3);
            }
            else {
                const status = await Notification.requestPermission();
                if (status && status === 'granted') {
                    alert("other");
                    // Error "no service worker" - retry 3 times to register tokens.
                    let retry = 0;
                    do {
                        try {
                            //getting token from FCM
                            const fcm_token = await getToken(messaging, { vapidKey: process.env.firebaseMessagingServerKey });
                            alert("fcm_token" + fcm_token)
                            if (fcm_token) {
                                //setting FCM token in indexed db using localforage
                                localforage.setItem('fcm_token', fcm_token);
                                //return the FCM token after saving it
                                return { tokenInLocalForage: fcm_token, isNewRegister: true };
                            }
                        }
                        catch (error) {
                            retry++;
                        }
                    } while (retry <= 3);
                }
            }

            return { tokenInLocalForage: null, isNewRegister: false };
        } catch (error) {
            alert(error);
            console.error(error);
            return null;
        }
    },
};
export { firebaseCloudMessaging };