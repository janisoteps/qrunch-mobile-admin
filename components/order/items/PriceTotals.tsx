import React, {useContext} from "react";
import SettingsContext from "../../settings/settingsContext";
import {useTheme} from "@react-navigation/native";
import {MenuItem, OrderItem} from "../../../interfaces/item";
import {View, Text} from "react-native";

interface PriceTotalsProps {
    singleItemData: MenuItem,
    orderItemDict: OrderItem
}


export default function PriceTotals(props: PriceTotalsProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    const basePrice = props.orderItemDict.basePrice ? props.orderItemDict.basePrice : 0;

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 5
            }}
        >
            {props.orderItemDict.optionsPrice ? (
                <View
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'right',
                            fontSize: 15,
                            fontWeight: 'normal'
                        }}
                    >
                        Base price: {settingsContext.currencySymbol}{basePrice.toFixed(2)}
                    </Text>
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'right',
                            fontSize: 15,
                            fontWeight: 'normal'
                        }}
                    >
                        Options price: {settingsContext.currencySymbol}{props.orderItemDict.optionsPrice.toFixed(2)}
                    </Text>
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'right',
                            fontSize: 15,
                            fontWeight: '500'
                        }}
                    >
                        {props.orderItemDict.count > 1 ? 'Each: ' : 'Total: '} {settingsContext.currencySymbol}{(basePrice + props.orderItemDict.optionsPrice).toFixed(2)}
                    </Text>
                </View>
            ):(
                <View
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'right',
                            fontSize: 15,
                            fontWeight: '500'
                        }}
                    >
                        {props.orderItemDict.count > 1 ? 'Each: ' : 'Total: '} {settingsContext.currencySymbol}{basePrice.toFixed(2)}
                    </Text>
                </View>
            )}
        </View>
    )
}


