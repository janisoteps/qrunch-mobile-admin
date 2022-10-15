import 'dotenv/config';

export default {
    "expo": {
        "owner": "qrunch",
        "name": "qrunch-mobile-admin",
        "slug": "qrunch-mobile-admin",
        "version": "1.0.1",
        "orientation": "portrait",
        icon: "./assets/images/logo-icon-1024-72dpi.png",
        scheme: "qrunch-mobile-admin",
        "userInterfaceStyle": "light",
        "splash": {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        "updates": {
            "fallbackToCacheTimeout": 0
        },
        "assetBundlePatterns": [
            "**/*"
        ],
        "ios": {
            "supportsTablet": true,
            bundleIdentifier: "com.qrunch.qrunch-mobile-admin",
            buildNumber: "1.0.1"
        },
        "android": {
            adaptiveIcon: {
                "foregroundImage": "./assets/images/adaptive-icon.png",
                "backgroundColor": "#ffffff",
            },
            package: "com.qrunch.qrunch_mobile_admin",
            versionCode: 2,
            permissions: ["NOTIFICATIONS"],
            useNextNotificationsApi: true,
            googleServicesFile: "./google-services.json",
        },
        web: {
            favicon: "./assets/images/favicon.png"
        },
        "notification":{
            "icon":"./assets/images/adaptive-icon.png"
        },
        "extra": {
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.MEASUREMENT_ID,
            qrunchApi: process.env.QRUNCH_API,
            qrunchWeb: process.env.QRUNCH_WEB,
            "eas": {
                "projectId": "fb49ac4c-e2bf-4076-9cde-cd4fc79f4370"
            }
        }
    }
}
