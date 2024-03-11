"use client"

import { firebaseCloudMessaging } from "@/lib/firebase-app";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";

export default function Firebase() {
    useEffect(() => {
        setToken();
        async function setToken() {
            try {
                const token = await firebaseCloudMessaging.init();
                console.log(token)
                // if (token) {
                //     getMessage();
                // }
            } catch (error) {
                console.log(error);
            }
        }
        // function getMessage() {
        //     const messaging = getMessaging();
        //     onMessage(messaging, (payload) => {
        //         const title = payload.notification?.title || '';
        //         const body = payload.notification?.body;
        //         registration?.showNotification(title, { body, icon: '/icons/icon-192x192.png' });
        //     });
        // }
    }, []);
    return (
        <></>
    )
}