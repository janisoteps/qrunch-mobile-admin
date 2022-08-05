import {useEffect, useRef, useState} from "react";
import * as Notifications from 'expo-notifications';
import {QrunchUser} from "../../interfaces/qrunchUser";
import {LocationDict} from "../../interfaces/appSettings";
import getPushToken from "../../components/notifications/getPushToken";
import {ReValidatePushToken} from "../../interfaces/notifications";
import validatePushTokens from "../../components/notifications/validatePushTokens";
import {ScreenTypesList} from "../../interfaces/general";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false
    })
});

export interface UseNotifications {
    (
        navigation: any,
        authToken: string | null,
        userData: QrunchUser | null | undefined,
        usedRestaurantId: string | null | undefined,
        selectedLocation: LocationDict | null | undefined
    ): {
        initialRoute: ScreenTypesList,
        reValidatePushToken: ReValidatePushToken
    }
}


const useNotifications: UseNotifications = (
    navigation,
    authToken,
    userData,
    usedRestaurantId,
    selectedLocation
) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(null);
    const [notification, setNotification] = useState<Notifications.Notification>();
    const [checking, setChecking] = useState<boolean>(false);
    const [initialRoute, setInitialRoute] = useState<ScreenTypesList>('Home');
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        getPushToken().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notificationDict => {
            setNotification(notificationDict);
            setInitialRoute('Orders');
            navigation.navigate('Orders', {});
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                setNotification(response.notification);
                setInitialRoute('Orders');
                navigation.navigate('Orders', {});
            }
        );

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (authToken && expoPushToken && userData && usedRestaurantId && selectedLocation && !checking) {
            setChecking(true);
            validatePushTokens(
                authToken,
                userData._id,
                usedRestaurantId,
                selectedLocation.locationId,
                expoPushToken
            ).then(() => {
                setChecking(false);
            });
        }
    },[expoPushToken, userData, usedRestaurantId, selectedLocation]);

    const reValidatePushToken: ReValidatePushToken = (
        user,
        accessToken,
        restId,
        locId
    ) => {
        if (accessToken && user && expoPushToken) {
            if (restId && locId) {
                setChecking(true);
                validatePushTokens(
                    accessToken,
                    user._id,
                    restId,
                    locId,
                    expoPushToken
                ).then(() => {
                    setChecking(false);
                });
            }
        }
    }

    return {
        initialRoute,
        reValidatePushToken
    }
};

export default useNotifications;
