/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./lib/i18n/index.ts');
const nextConfig = {
    env: {
        identityServer: process.env.IDENTITY_API_URL,
        portalServer: process.env.PORTAL_API_URL,
        clientServer: process.env.NEXT_BASE_URL,
        googleAnalytics: process.env.GOOGLE_ANALYTICS,
        prePortalServer: process.env.PORTAL_PRE_API_URL,
        maintenanceMode: process.env.MAINTENANCE_MODE,
        maintenanceEstimateCompleted: process.env.MAINTENANCE_ESTIMATE_COMPLETED,
        storageS1: process.env.STORAGE_S1,
        mobileUrl: process.env.MOBILE_URL,
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID,
        firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
        firebaseMessagingServerKey: process.env.FIREBASE_MESSAGING_SERVER_KEY,
        googleAdsense: process.env.GOOGLE_ADSENSE
    }
}

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    cacheStartUrls: true,
    fallbacks: {
        document: "/offline"
    }
});

module.exports = withPWA(withNextIntl(nextConfig));
