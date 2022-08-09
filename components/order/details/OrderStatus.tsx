import React from "react";
import OrderStateStep from "./OrderStateStep";
import {ChangeOrderStatus, Order} from "../../../interfaces/order";
import {orderTypes} from "../../../constants/orderTypes";
import {deliveryOrderStates, eatInOrderStates, pickUpOrderStates} from "../../../constants/order";
import {View, Text} from "react-native";

interface OrderStatusProps {
    orderDict: Order | null,
    changeOrderStatus: ChangeOrderStatus,
    isMobile: boolean | undefined
}

function getOrderStates(orderType: string | null) {
    switch (orderType) {
        case orderTypes.delivery.name:
            return deliveryOrderStates

        case orderTypes.pickUp.name:
            return pickUpOrderStates

        default:
            return eatInOrderStates
    }
}


export default function OrderStatus(props: OrderStatusProps) {
    const orderStates = getOrderStates(props.orderDict ? props.orderDict.orderType : null);
    const activeOrderStateIdx = orderStates.indexOf(orderStates.find(stateDict => {
        return stateDict.id === props.orderDict?.orderState
    }) || orderStates[0]);

    if (props.orderDict) {
        if (props.orderDict.orderState === 'canceled') {
            return (
                <View
                    style={{
                        backgroundColor: 'rgb(150,150,150)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            color: 'rgb(50,40,40)',
                            textAlign: 'center',
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginRight: 5,
                            padding: 15
                        }}
                    >
                        Order Cancelled
                    </Text>
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: props.isMobile ? 'column' : 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        marginTop: props.isMobile ? 20 : 0
                    }}
                >
                    {orderStates.map((stateDict, idx) => {
                        return (
                            <OrderStateStep
                                stateDict={stateDict}
                                idx={idx}
                                activeOrderStateIdx={activeOrderStateIdx}
                                key={stateDict.name}
                                changeOrderStatus={props.changeOrderStatus}
                                orderId={props.orderDict ? props.orderDict._id : null}
                            />
                        )
                    })}
                </View>
            )
        }
    } else {
        return null
    }
}
