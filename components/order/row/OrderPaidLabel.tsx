import React, {useContext, useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {Image, View, Text} from "react-native";
import {Order, ReloadOrders} from "../../../interfaces/order";
import SettingsContext from "../../settings/settingsContext";
import AuthContext from "../../auth/authContext";
import checkOrderPaymentStatus from "../../../utils/order/checkOrderPaymentStatus";

interface OrderPaidLabelProps {
    orderDict: Order,
    backgroundColor: string,
    reloadOrders: ReloadOrders
}

export default function OrderPaidLabel(props: OrderPaidLabelProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const authContext = useContext(AuthContext);
    const [paymentNowSuccessful, setPaymentNowSuccessful] = useState(props.orderDict.paymentCompleted && !props.orderDict.orderError);

    useEffect(() => {
        const authToken: string | null = typeof authContext.authToken === 'string' ? authContext.authToken : null;
        if (
            !!props.orderDict
            && !props.orderDict.paymentCompleted
            && !props.orderDict.orderError
            && !!authToken
        ) {
            const checkPaymentInterval = setInterval(() => {

                checkOrderPaymentStatus(props.orderDict, authToken).then(checkResult => {
                    if (checkResult.success && checkResult.statusChanged) {
                        setPaymentNowSuccessful(true);
                        props.reloadOrders();
                    }
                })
            }, 10000);

            return () => clearInterval(checkPaymentInterval);
        }
    }, [props.orderDict, authContext?.authToken]);

    if (props.orderDict.paymentMethod === 'card' || props.orderDict.paymentMethod === 'wallet') {
        const checkImgSrc = require('./../../../assets/images/check.png');
        const warningImgSrc = require('./../../../assets/images/warning.png');

        const UnpaidExplanation = () => {
            if (!props.orderDict.paymentCompleted && !props.orderDict.orderError && !paymentNowSuccessful) {
                return (
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.text
                        }}
                    >
                        Processing...
                    </Text>
                )
            } else {
                return (
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.text
                        }}
                    >
                        {props.orderDict.orderError}
                    </Text>
                )
            }
        }

        return (
            <View
                style={{
                    backgroundColor: props.backgroundColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 5
                }}
            >
                {(props.orderDict.paymentCompleted || paymentNowSuccessful) ? (
                    <View
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 5,
                            borderRadius: 10,
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={checkImgSrc}
                            style={{
                                width: 20,
                                height: 20,
                                marginBottom: 5
                            }}
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                color: 'green'
                            }}
                        >
                            PAID
                        </Text>
                    </View>
                ):(
                    <View
                        style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: 5,
                            borderRadius: 10,
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={warningImgSrc}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginBottom: 5
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'red'
                                }}
                            >
                                NOT PAID
                            </Text>
                        </View>
                        <UnpaidExplanation />
                    </View>
                )}
            </View>
        )
    } else {
        return null
    }
}
