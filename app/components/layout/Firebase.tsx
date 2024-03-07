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
                if (token) {
                    getMessage();
                }
            } catch (error) {
                console.log(error);
            }
        }
        function getMessage() {
            const messaging = getMessaging();
            console.log({ messaging });
            (self as any).registration.showNotification('hello', { body: 'hello' });
            onMessage(messaging, (payload) => {
                const title = payload.notification?.title;
                const body = payload.notification?.body;
                (self as any).registration.showNotification(title, { body });
            });
        }
    }, []);
    return (
        <></>
    )
}