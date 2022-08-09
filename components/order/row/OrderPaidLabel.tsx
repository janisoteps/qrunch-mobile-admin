import React from "react";
import {useTheme} from "@react-navigation/native";
import {Image, View, Text} from "react-native";
import {Order} from "../../../interfaces/order";

interface OrderPaidLabelProps {
    orderDict: Order,
    backgroundColor: string
}

export default function OrderPaidLabel(props: OrderPaidLabelProps) {
    const { colors } = useTheme();

    if (props.orderDict.paymentMethod === 'card' || props.orderDict.paymentMethod === 'wallet') {
        const checkImgSrc = require('./../../../assets/images/check.png');
        const warningImgSrc = require('./../../../assets/images/warning.png')

        const UnpaidExplanation = () => {
            if (!props.orderDict.paymentCompleted && !props.orderDict.orderError) {
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
                    <div
                        style={{
                            textAlign: 'center',
                            color: colors.text
                        }}
                    >
                        {props.orderDict.orderError}
                    </div>
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
                {props.orderDict.paymentCompleted ? (
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
