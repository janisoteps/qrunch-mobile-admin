# Qrunch Mobile Admin

This is a mobile application for hotel staff to easily manage orders and service requests.
It is built with React Native using Expo framework.

## Develop
```
npm start
```

## Build application

1. Activate Node v16.
```
nvm use v16
```

2. Export all env variables in terminal.
* FIREBASE_API_KEY
* FIREBASE_AUTH_DOMAIN
* FIREBASE_PROJECT_ID
* FIREBASE_STORAGE_BUCKET
* FIREBASE_MESSAGING_SENDER_ID
* FIREBASE_APP_ID
* MEASUREMENT_ID
* QRUNCH_API
* QRUNCH_WEB

3. Run EAS build command
```
eas build --profile preview --platform android
```

4. Download the .apk file from the URL shown in terminal.


## Deploy to website

1. Activate `env-qr` virtualenv.
2. Ensure that S3 credentials are in `.env` file (S3_KEY_ID, S3_KEY_SECRET)
3. Place application file (.apk) in the root.
4. Run:
```
python3 deploy.py --filename application-394b27bb-c4db-49a0-b4bc-6f697e87ed19.apk
```
