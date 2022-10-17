import {RestaurantSettings} from "../../interfaces/appSettings";
import {
    GetRestaurantOrders,
    LoadNewOrder, Order,
    ReloadOrders, ToggleOrderHistory, UpdateOrderList,
    UpdateOrderProperty,
    UpdateOrderState
} from "../../interfaces/order";
import {useEffect, useState} from "react";
import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";
import updateOneOrderProperty from "../order/updateOneOrderProperty";
import {QrunchUser} from "../../interfaces/qrunchUser";
import filterUserOrders from "../order/filterUserOrders";

export interface UseRestaurantOrders {
    (
        authToken: string | null | undefined,
        restaurantData: RestaurantSettings | null | undefined,
        userData: QrunchUser | null | undefined
    ): {
        getRestaurantOrders: GetRestaurantOrders,
        loadNewOrder: LoadNewOrder,
        reloadOrders: ReloadOrders,
        updateOrderState: UpdateOrderState,
        updateOrderProperty: UpdateOrderProperty,
        orderList: Order[],
        updateOrderList: UpdateOrderList,
        pageCount: number,
        viewOrderHistory: boolean,
        toggleOrderHistory: ToggleOrderHistory,
        stateIterator: string | null,
        ordersLoading: boolean
    }
}

const useRestaurantOrders: UseRestaurantOrders = (
    authToken,
    restaurantData,
    userData
) => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [viewOrderHistory, setViewOrderHistory] = useState<boolean>(false);
    const [stateIterator, setStateIterator] = useState<string | null>(null);
    const [ordersLoading, setOrdersLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!!authToken && !!restaurantData) {
            getRestaurantOrders(restaurantData._id, authToken, viewOrderHistory, true).then(orders => {
                setOrderList(orders);
                setPageCount(Math.ceil(orders.length / 10));
                setStateIterator(`${Math.random()}`);
            });
        }
    }, [authToken, restaurantData]);

    const getRestaurantOrders: GetRestaurantOrders = async (
        restaurantId,
        token,
        showHistory,
        showLoading = false
    ) => {
        if (showLoading) {
            setOrdersLoading(true);
        }
        const authHeader: string = `Bearer ${token}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_get_restaurant_orders_v2` : null;

        if (!!requestUrl && !!restaurantId) {
            try {
                const ordersRes = await axios.post(
                    requestUrl,
                    {
                        restaurant_id: restaurantId,
                        limit: 100,
                        open_orders_only: !viewOrderHistory
                    },
                    {
                        headers: reqHeaders
                    }
                );

                setOrdersLoading(false);

                if (ordersRes.data.success) {
                    const activeOrders = ordersRes.data.orders.filter((orderDict: any) => {
                        if (showHistory) {
                            return true
                        } else {
                            return orderDict.orderState !== 'completed' && orderDict.orderState !== 'canceled'
                        }
                    });

                    const userFilteredOrders = filterUserOrders(userData, activeOrders);
                    if (!!userFilteredOrders) {
                        return userFilteredOrders
                    } else {
                        return []
                    }
                } else {
                    return []
                }

            } catch (e) {
                console.log(`getRestaurantOrders ${e}`);

                return []
            }
        } else {
            return []
        }
    }

    const loadNewOrder: LoadNewOrder = orderEventDict => {
        if (restaurantData && authToken) {
            getRestaurantOrders(restaurantData._id, authToken, viewOrderHistory).then(orders => {
                setOrderList(orders);
                setPageCount(Math.ceil(orders.length / 10));
                setStateIterator(`${Math.random()}`);
            });
        }
    }

    const reloadOrders: ReloadOrders = () => {
        if (restaurantData && authToken) {
            getRestaurantOrders(restaurantData._id, authToken, viewOrderHistory).then(orders => {
                setOrderList(orders);
                setPageCount(Math.ceil(orders.length / 10));
                setStateIterator(`${Math.random()}`);
            });
        }
    }

    const updateOrderState: UpdateOrderState = async (opts) => {
        let updatedOrderList = orderList.filter(orderDict => {
            return orderDict._id !== opts.orderId
        });
        let updatedOrderDict = orderList.find(orderDict => {
            return orderDict._id === opts.orderId
        });
        if (updatedOrderDict) {
            updatedOrderDict.orderState = opts.newStatus;
            updatedOrderList.push(updatedOrderDict);
            setOrderList(updatedOrderList);
            setStateIterator(`${Math.random()}`);

            return true
        } else {
            return false
        }
    }

    const updateOrderProperty: UpdateOrderProperty = async (orderId, settingKey, newValue) => {
        if (authToken && restaurantData) {
            const updateResult = await updateOneOrderProperty(authToken, restaurantData._id, orderId, settingKey, newValue);

            if (updateResult) {

                const orders = await getRestaurantOrders(restaurantData._id, authToken, viewOrderHistory);

                setOrderList(orders);
                setPageCount(Math.ceil(orders.length / 10));
                setStateIterator(`${Math.random()}`);

                const updatedOrder = orders.find(orderDict => {
                    return orderDict._id === orderId
                });

                if (updatedOrder) {
                    return updatedOrder
                } else {
                    return null
                }

            } else {
                return null
            }
        } else {
            return null
        }
    }

    const updateOrderList: UpdateOrderList = (newOrderList) => {
        if (newOrderList) {
            setOrderList(newOrderList);
        }
    }

    const toggleOrderHistory: ToggleOrderHistory = (newValue) => {
        setViewOrderHistory(newValue);
    }

    return {
        getRestaurantOrders,
        loadNewOrder,
        reloadOrders,
        updateOrderState,
        updateOrderProperty,
        orderList,
        updateOrderList,
        pageCount,
        viewOrderHistory,
        toggleOrderHistory,
        stateIterator,
        ordersLoading
    }
}

export default useRestaurantOrders;
