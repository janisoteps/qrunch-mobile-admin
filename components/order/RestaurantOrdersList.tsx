import React, {useContext} from "react";
import {useTheme} from "@react-navigation/native";
import RestaurantOrdersListRow from "./row/RestaurantOrdersListRow";
import SettingsContext from "../settings/settingsContext";
import {Order, SetModalOrderData} from "../../interfaces/order";
import {View, Text} from "react-native";

export interface RestaurantOrdersListProps {
    orderList: Order[],
    setModalOrderData: SetModalOrderData,
    ordersLoading: boolean
}


export default function RestaurantOrdersList(props: RestaurantOrdersListProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    const ordersList = props.orderList.map(orderDict => {
        return (
            <RestaurantOrdersListRow
                key={orderDict._id}
                orderDict={orderDict}
                setModalOrderData={props.setModalOrderData}
                isMobile={(settingsContext && settingsContext.isMobile !== undefined) ? settingsContext.isMobile : false}
                isSingleOrderView={false}
            />
        )
    });

    return (
        <View
            style={{
                backgroundColor: colors.background,
                margin: 0,
                marginTop: 20,
                marginBottom: 100,
                width: '100%',

            }}
        >
            {props.ordersLoading ? (
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'center',
                        fontSize: 20
                    }}
                >
                    Loading orders...
                </Text>
            ):(
                <View
                    style={{
                        backgroundColor: colors.background,
                        margin: 0,
                        width: '100%'
                    }}
                >
                    {(ordersList && ordersList.length === 0) && (
                        <Text
                            style={{
                                color: colors.text,
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            No orders found
                        </Text>
                    )}
                </View>
            )}

            {ordersList}
        </View>
    )
}
