"use client";
import UserDeviceRequest from "@/app/models/user-device/UserDeviceRequest";
import { firebaseCloudMessaging } from "@/lib/firebase-app";
import { parseJsonFromString } from "@/lib/json";
import { syncUserDevice } from "@/lib/services/client/user-device";
import { useEffect } from "react";

export default function Firebase() {
    const isPwa = () => {
        const displayModes = [
            // "fullscreen",
            "standalone",
            // "minimal-ui"
        ];
        return displayModes.some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches);
    }

    useEffect(() => {
        if (isPwa()) {
            setToken();
        }
    }, []);

    async function setToken() {
        try {
            const token = await firebaseCloudMessaging.init();
            const isCheckSyncDevice = parseJsonFromString<boolean | null>(sessionStorage.getItem("isCheckSyncDevice"));

            if (token && token.tokenInLocalForage && (!isCheckSyncDevice || token.isNewRegister)) {
                // User register new Notification Device
                const usernDeviceNotification: UserDeviceRequest = {
                    deviceTypeName: getOS(),
                    registrationToken: (token.tokenInLocalForage as string),
                    browserVersion: getBrowserVersion(),
                    screenResolution: getScreenResolution(),
                };

                // Sync To Request Notification
                await syncUserDevice(usernDeviceNotification);

                sessionStorage.setItem("isCheckSyncDevice", JSON.stringify(true));
            }
        } catch (error) {
            console.log(error);
        }
    }

    function getOS() {
        const userAgent = navigator.userAgent || navigator.vendor || navigator.platform;

        // iOS detection
        if (/iPad|iPhone|iPod/.test(userAgent) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
            return "iOS";
        }

        // Android detection
        if (/android/i.test(userAgent)) {
            return "Adnroid";
        }

        // Windows Phone detection
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        // Other mobile OS detection
        if (/blackberry|bb10|rim tablet os/i.test(userAgent)) {
            return "BlackBerry";
        }

        if (/webos/i.test(userAgent)) {
            return "webOS";
        }

        // Fallback for desktop or unknown systems
        if (/win/i.test(userAgent)) {
            return "Windows";
        }

        if (/mac/i.test(userAgent)) {
            return "MacOS";
        }

        if (/linux/i.test(userAgent)) {
            return "Linux";
        }

        return "Unknown";
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