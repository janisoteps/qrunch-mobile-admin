// import {RootTabScreenProps} from "../types";
import {useTheme} from "@react-navigation/native";
import {useContext, useState} from "react";
import AuthContext from "../components/auth/authContext";
import SettingsContext from "../components/settings/settingsContext";
import {SafeAreaView, ScrollView, Text} from "react-native";
// import Layout from "../constants/layout";
import * as React from "react";
// import useRestaurantOrders from "../hooks/useRestaurantOrders";
// import RestaurantOrdersList from "../components/order/RestaurantOrdersList";
// import OrderDetailsModal from "../components/order/details/OrderDetailsModal";
// import {ChangeOrderEta, ChangeOrderStatus, Order, SetModalOrderData} from "../components/order/interfaces/order";
// import useQrunchSockets from "../hooks/useQrunchSockets";
import {Button} from "react-native-paper";
import {RootTabScreenProps} from "../interfaces/general";
import {Order} from "../interfaces/order";
import Layout from "../constants/layout";


export default function OrdersScreen({route, navigation}: RootTabScreenProps<'Orders'>) {
    const {colors} = useTheme();
    const authContext = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext);
    // const {
    //     getRestaurantOrders,
    //     loadNewOrder,
    //     reloadOrders,
    //     updateOrderState,
    //     updateOrderProperty,
    //     orderList,
    //     updateOrderList,
    //     pageCount,
    //     viewOrderHistory,
    //     toggleOrderHistory,
    //     stateIterator
    // } = useRestaurantOrders(authContext.token, settingsContext.restaurantData, settingsContext.selectedLocation);

    // const {
    //     newOrders,
    //     setNewOrders,
    //     sendConfirm,
    //     socketsUpdateEta,
    //     socketsUpdateStatus
    // } = useQrunchSockets({
    //     restaurantId: settingsContext.usedRestaurantId,
    //     enabled: true,
    //     onConnected: () => {
    //         console.log('sockets connected');
    //     },
    //     loadNewOrder
    // });

    const [modalOrderDict, setModalOrderDict] = useState<null | Order>(null);
    const [stateItx, setStateItx] = useState('');
    const [isRefreshLoading, setIsRefreshLoading] = useState<boolean>(false);

    // const setModalOrderData: SetModalOrderData = (orderData) => {
    //     setModalOrderDict(orderData);
    // }

    // const changeOrderStatus: ChangeOrderStatus = async (orderId, newStatus) => {
    //     const updatedOrder = await updateOrderProperty(orderId, 'orderState', newStatus);
    //
    //     if (updatedOrder) {
    //         setModalOrderDict(updatedOrder);
    //         setStateItx(`${Math.random()}`);
    //     } else {
    //         if (newStatus === 'completed' || newStatus === 'canceled') {
    //             let updatedOrder = modalOrderDict;
    //             if (updatedOrder) {
    //                 updatedOrder.orderState = newStatus;
    //                 setModalOrderDict(updatedOrder);
    //                 setStateItx(`${Math.random()}`);
    //             }
    //         }
    //     }
    //     socketsUpdateStatus(orderId, newStatus);
    // }

    // const changeOrderEta: ChangeOrderEta = async (orderId, newEta) => {
    //     const updatedOrder = await updateOrderProperty(orderId, 'eta', newEta);
    //
    //     if (updatedOrder) {
    //         setModalOrderDict(updatedOrder);
    //         setStateItx(`${Math.random()}`);
    //         socketsUpdateEta(orderId, newEta);
    //     }
    // }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                alignSelf: 'stretch',
                backgroundColor: colors.background
            }}
        >
            <Button
                icon="refresh"
                mode="contained"
                loading={isRefreshLoading}
                onPress={() => {
                    // if (reloadOrders) {
                    //     setIsRefreshLoading(true);
                    //     reloadOrders();
                    //     setTimeout(() => {
                    //         setIsRefreshLoading(false);
                    //     }, 500);
                    // }
                }}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 10,
                    backgroundColor: colors.primary,
                    zIndex: 10
                }}
            >
                Refresh
            </Button>

            <ScrollView
                style={{
                    marginTop: Layout.headerHeight,
                    paddingTop: 40,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0
                }}
            >
                <Text
                    style={{
                        fontWeight: '500',
                        fontSize: 17,
                        margin: 20
                    }}
                >
                    Orders
                </Text>
                {/*<RestaurantOrdersList*/}
                {/*    orderList={orderList}*/}
                {/*    setModalOrderData={setModalOrderData}*/}
                {/*/>*/}

                {/*<OrderDetailsModal*/}
                {/*    orderDict={modalOrderDict}*/}
                {/*    setModalOrderData={setModalOrderData}*/}
                {/*    changeOrderStatus={changeOrderStatus}*/}
                {/*    changeOrderEta={changeOrderEta}*/}
                {/*    reloadOrders={reloadOrders}*/}
                {/*/>*/}
            </ScrollView>
        </SafeAreaView>
    )
}
