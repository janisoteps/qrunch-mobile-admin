import {useEffect, useRef, useState} from "react";
import * as Notifications from 'expo-notifications';
import {QrunchUser} from "../../interfaces/qrunchUser";
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
) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(null);
    const [notification, setNotification] = useState<Notifications.Notification>();
    const [checking, setChecking] = useState<boolean>(false);
    const [initialRoute, setInitialRoute] = useState<ScreenTypesList>('Home');
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notificationDict => {
            const initialRoute = getInitialRoute(notificationDict);
            setNotification(notificationDict);
            setInitialRoute(initialRoute);
            navigation.navigate(initialRoute, {});
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                const initialRoute = getInitialRoute(response.notification);
                setNotification(response.notification);
                setInitialRoute(initialRoute);
                navigation.navigate(initialRoute, {});
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
        if (!!authToken) {
            setTimeout(() => {
                getPushToken().then(token => {
                    if (!!token) {
                        setExpoPushToken(token);
                    } else {
                        setTimeout(() => {
                            getPushToken().then(token => {
                                setExpoPushToken(token)
                            }).catch(error => {
                                console.log('error')
                                console.log(error)
                            });
                        }, 5000);
                    }
                }).catch(error => {
                    console.log('error')
                    console.log(error)
                });
            }, 5000);
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken && expoPushToken && userData && usedRestaurantId && !checking) {
            setChecking(true);
            validatePushTokens(
                authToken,
                userData.userEmail,
                usedRestaurantId,
                expoPushToken
            ).then(() => {
                setChecking(false);
            });
        }
    },[expoPushToken, userData, usedRestaurantId]);

    const reValidatePushToken: ReValidatePushToken = (
        user,
        accessToken,
        restId,
    ) => {
        if (accessToken && user && expoPushToken) {
            if (!!restId) {
                setChecking(true);
                validatePushTokens(
                    accessToken,
                    user.userEmail,
                    restId,
                    expoPushToken
                ).then(() => {
                    setChecking(false);
                });
            }
        }
    }

    const getInitialRoute = (notificationDict: any) => {
        const notifType = notificationDict?.request?.content?.data?.notifType;

        switch (notifType) {
            case 'order':
                return 'Orders'
            case 'serviceRequest':
                return 'Services'
            case 'serviceChat':
                return 'Services'
            default:
                return 'Orders'
        }
    }

    return {
        initialRoute,
        reValidatePushToken
    }
};

export default useNotifications;
