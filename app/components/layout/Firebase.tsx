"use client"

import { firebaseCloudMessaging } from "@/lib/firebase-app";
import { useEffect } from "react";

export default function Firebase() {
    useEffect(() => {
        setToken();
        async function setToken() {
            try {
                const token = await firebaseCloudMessaging.init();

                // User register new Notification Device
                const usernDeviceNotificatio = {
                    deviceName: getOS(),
                    deviceToken: token?.tokenInLocalForage,
                    browserVersion: getBrowserVersion(),
                    screenResolution: getScreenResolution(),
                }

                console.log(usernDeviceNotificatio);
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    function getOS() {
        const userAgent = navigator.userAgent || navigator.vendor;

        if (/android/i.test(userAgent)) {
            return 'Android';
        } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
            return 'iOS';
        } else {
            return 'Unknown';
        }
    }

    function getBrowserVersion() {
        var ua = navigator.userAgent;
        var tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    function getScreenResolution() {
        return `${window.screen.width}x${window.screen.height}`;
    }

    return (
        <></>
    )
}