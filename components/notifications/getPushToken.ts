import * as Notifications from 'expo-notifications';
// import Device from 'expo-device';
import {Platform} from "react-native";
import Constants from "expo-constants";

export interface GetPushToken {
    (): Promise<string | undefined>
}


const getPushToken: GetPushToken = async () => {
    let token;

    try {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');

                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;

        } else {
            console.log('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    } catch (e) {
        console.log(e);
    }

    return token;
}

export default getPushToken;
