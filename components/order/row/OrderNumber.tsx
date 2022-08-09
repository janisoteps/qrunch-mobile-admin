import {useTheme} from "@react-navigation/native";
import React from "react";
import {View, Text} from "react-native";

interface OrderNumberProps {
    orderNumber: null | string,
    backgroundColor: string
}

export default function OrderNumber(props: OrderNumberProps) {
    const { colors } = useTheme();

    if (props.orderNumber) {
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
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'center',
                        fontSize: 17
                    }}
                >
                   {props.orderNumber}
                </Text>
            </View>
        )
    } else {
        return null
    }
}
