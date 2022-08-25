import React, {useContext} from "react";
import {useTheme} from "@react-navigation/native";
import SettingsContext from "../../settings/settingsContext";
import {View, Text} from "react-native";

interface OrderTotalProps {
    orderTotal: number,
    backgroundColor: string
}

export default function OrderTotal(props: OrderTotalProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

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
                    fontSize: 17,
                    fontWeight: '600'
                }}
            >
                Order total: {settingsContext.currencySymbol}{(props.orderTotal / 100).toFixed(2)}
            </Text>
        </View>
    )
}
