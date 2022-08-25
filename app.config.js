import {
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, MEASUREMENT_ID, QRUNCH_API, QRUNCH_WEB
} from '@env';

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
        },
        web: {
            favicon: "./assets/images/favicon.png"
        },
        "notification":{
            "icon":"./assets/images/adaptive-icon.png"
        },
        "extra": {
            firebaseApiKey: FIREBASE_API_KEY,
            firebaseAuthDomain: FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: FIREBASE_PROJECT_ID,
            firebaseStorageBucket: FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: FIREBASE_APP_ID,
            measurementId: MEASUREMENT_ID,
            qrunchApi: QRUNCH_API,
            qrunchWeb: QRUNCH_WEB
        }
    }
}
