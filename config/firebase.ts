import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.manifest?.extra?.firebaseApiKey,
    authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
    projectId: Constants.manifest?.extra?.firebaseProjectId,
    storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
    appId: Constants.manifest?.extra?.firebaseAppId,
    measurementId: Constants.manifest?.extra?.measurementId
};

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

const fbAuth = getAuth(fbApp);

export { fbApp, fbAuth }
