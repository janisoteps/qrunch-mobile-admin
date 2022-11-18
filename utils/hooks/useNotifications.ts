import React, {useEffect, useRef, useState} from "react";
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import {QrunchUser} from "../../interfaces/qrunchUser";
import getPushToken from "../../components/notifications/getPushToken";
import {ReValidatePushToken} from "../../interfaces/notifications";
import validatePushTokens from "../../components/notifications/validatePushTokens";
import {ScreenTypesList} from "../../interfaces/general";
import {RestaurantSettings} from "../../interfaces/appSettings";
import {LocationOrderCount} from "../../interfaces/order";
import checkNewOrders from "../../components/notifications/checkNewOrders";
import getOrderData from "../order/getOrderData";
import loadOneServiceOrder from "../services/loadOneServiceOrder";

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
        restaurantData: RestaurantSettings | null | undefined
    ): {
        initialRoute: ScreenTypesList,
        reValidatePushToken: ReValidatePushToken,
        lastOrderId: string,
        lastServiceReqId: string,
        newOrdersChecked: boolean,
        showNewOrder: boolean,
        setShowNewOrder: React.Dispatch<boolean>,
        showNewServiceReq: boolean,
        setShowNewServiceReq: React.Dispatch<boolean>
    }
}


const useNotifications: UseNotifications = (
    navigation,
    authToken,
    userData,
    usedRestaurantId,
    restaurantData
) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null | undefined>(null);
    const [notification, setNotification] = useState<Notifications.Notification>();
    const [checking, setChecking] = useState<boolean>(false);
    const [initialRoute, setInitialRoute] = useState<ScreenTypesList>('Home');
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    const [locationCounts, setLocationCounts] = useState<LocationOrderCount[]>([]);
    const [lastOrderId, setLastOrderId] = useState<string>('');
    const [showNewOrder, setShowNewOrder] = useState<boolean>(false);
    const [lastServiceReqId, setLastServiceReqId] = useState<string>('');
    const [showNewServiceReq, setShowNewServiceReq] = useState<boolean>(false);
    const [newOrdersChecked, setNewOrdersChecked] = useState<boolean>(false);
    const [playingBeep, setPlayingBeep] = useState<boolean>(false);
    const [stateRefreshId, setStateRefreshId] = useState<string>('');

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

    useEffect(() => {
        if (!!userData && !!restaurantData && !!authToken) {
            const checkOrdersInterval = setInterval(() => {
                compareLatestOrders();
            }, 10000);
            return () => clearInterval(checkOrdersInterval);
        }
    }, [userData, restaurantData, authToken]);

    useEffect(() => {
        const checkSoundInterval = setInterval(() => {
            if (showNewOrder || showNewServiceReq) {
                setPlayingBeep(true);
            }
            setStateRefreshId(`${Math.random()}`);
        }, 10000);
        return () => clearInterval(checkSoundInterval);
    }, [showNewOrder, showNewServiceReq]);

    useEffect(() => {
        if (playingBeep) {
            playSound('beep').then(() => {
                setPlayingBeep(false);
            });
        }
    }, [playingBeep]);

    useEffect(() => {
        if (!!lastOrderId || !!lastServiceReqId) {
            if (newOrdersChecked) {
                if (!!lastOrderId) {
                    handleNewOrder(lastOrderId);
                }
                if (!!lastServiceReqId) {
                    handleNewServiceRequest(lastServiceReqId);
                }
            } else {
                setNewOrdersChecked(true);
            }
        }
    }, [lastOrderId, lastServiceReqId]);

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

    function compareLatestOrders() {
        if (!!authToken && !!userData && !!restaurantData) {
            checkNewOrders(authToken, userData, restaurantData).then(checkResult => {

                if (checkResult.success) {
                    let isNewOrders = false;
                    let isNewServiceReqs = false;

                    checkResult.counts.forEach(orderCount => {
                        const currentLocationCountDict = locationCounts.find(orderCountDict => {
                            return orderCountDict.locationId === orderCount.locationId
                        });

                        const newLastOrderId = (
                            !!orderCount.lastTenOrders
                            && Array.isArray(orderCount.lastTenOrders)
                            && orderCount.lastTenOrders.length > 0
                        ) ? orderCount.lastTenOrders[orderCount.lastTenOrders.length - 1] : '';

                        const currentLastOrderId = (
                            !!currentLocationCountDict && !!currentLocationCountDict?.lastTenOrders
                            && Array.isArray(currentLocationCountDict.lastTenOrders)
                            && currentLocationCountDict.lastTenOrders.length > 0
                        ) ? currentLocationCountDict.lastTenOrders[currentLocationCountDict.lastTenOrders.length - 1] : '';

                        const newLastServiceReqId = (
                            !!orderCount.lastTenServiceRequests
                            && Array.isArray(orderCount.lastTenServiceRequests)
                            && orderCount.lastTenServiceRequests.length > 0
                        ) ? orderCount.lastTenServiceRequests[orderCount.lastTenServiceRequests.length - 1] : '';

                        const currentLastServiceReqId = (
                            !!currentLocationCountDict && !!currentLocationCountDict.lastTenServiceRequests
                            && Array.isArray(currentLocationCountDict.lastTenServiceRequests)
                            && currentLocationCountDict.lastTenServiceRequests.length > 0
                        ) ? currentLocationCountDict.lastTenServiceRequests[currentLocationCountDict.lastTenServiceRequests.length - 1] : '';

                        setNewOrdersChecked(true);

                        if (newLastOrderId !== currentLastOrderId) {
                            isNewOrders = true;
                            setLastOrderId(newLastOrderId);
                        }
                        if (newLastServiceReqId !== currentLastServiceReqId) {
                            isNewServiceReqs = true;
                            setLastServiceReqId(newLastServiceReqId);
                        }
                    });

                    if (isNewOrders || isNewServiceReqs) {
                        setLocationCounts(checkResult.counts);
                    }
                }
            });
        }
    }

    function handleNewOrder(orderId: string) {
        getOrderData(orderId).then(orderLoadResult => {
            if (orderLoadResult?.orderData) {
                if (orderLoadResult.orderData?.orderState === 'pending') {
                    playSound('cash');
                    setShowNewOrder(true);
                }
            }
        });
    }

    function handleNewServiceRequest(serviceReqId: string) {
        loadOneServiceOrder(serviceReqId).then(loadResult => {
            if (loadResult.success) {
                if (loadResult.serviceOrder?.orderState === 'pending') {
                    playSound('bell');
                    setShowNewServiceReq(true);
                }
            }
        });
    }

    async function playSound(soundType: 'cash' | 'bell' | 'beep') {
        let soundUrl: string;

        switch (soundType) {
            case 'cash':
                soundUrl = 'https://qr-assets.s3.eu-central-1.amazonaws.com/sounds/cash_register.mp3';
                break;

            case 'bell':
                soundUrl = 'https://qr-assets.s3.eu-central-1.amazonaws.com/sounds/bell.mp3';
                break;

            case 'beep':
                soundUrl = 'https://qr-assets.s3.eu-central-1.amazonaws.com/sounds/short_bleep.mp3';
                break;

            default:
                soundUrl = 'https://qr-assets.s3.eu-central-1.amazonaws.com/sounds/beep.mp3';
                break;
        }

        const { sound } = await Audio.Sound.createAsync({uri: soundUrl});

        await sound.playAsync();
    }

    return {
        initialRoute,
        reValidatePushToken,
        lastOrderId,
        lastServiceReqId,
        newOrdersChecked,
        showNewOrder,
        setShowNewOrder,
        showNewServiceReq,
        setShowNewServiceReq
    }
};

export default useNotifications;
