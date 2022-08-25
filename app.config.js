import Config from "react-native-config"

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
            firebaseApiKey: Config.FIREBASE_API_KEY,
            firebaseAuthDomain: Config.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: Config.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: Config.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: Config.FIREBASE_APP_ID,
            measurementId: Config.MEASUREMENT_ID,
            qrunchApi: Config.QRUNCH_API,
            qrunchWeb: Config.QRUNCH_WEB
        }
    }
}
