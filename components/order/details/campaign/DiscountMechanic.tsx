import React, {useContext} from "react";
import {useTheme} from "react-native-paper";
import {Order} from "../../../../interfaces/order";
import SettingsContext from "../../../settings/settingsContext";
import {View, Text} from "react-native";

interface DiscountMechanicProps {
    orderDict: Order | null
}

export default function DiscountMechanic(props: DiscountMechanicProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    if (
        props.orderDict
        && props.orderDict.campaignDetails
        && props.orderDict.campaignDetails.campaignMechanic
        && props.orderDict.campaignDetails.campaignMechanic.discount
    ) {
        return (
            <View
                style={{
                    position: 'relative',
                    backgroundColor: colors.background,
                    padding: 5,
                    borderRadius: 10
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        width: '100%',
                        textAlign: 'right',
                        fontSize: 15,
                        fontWeight: '400',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    Discount: {props.orderDict.campaignDetails.campaignMechanic.discount}%
                </Text>
                <Text
                    style={{
                        color: colors.text,
                        width: '100%',
                        textAlign: 'right',
                        fontSize: 15,
                        fontWeight: '400',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    Gross total: {settingsContext.currencySymbol}{(props.orderDict.netTotal / 100).toFixed(2)}
                </Text>
                <Text
                    style={{
                        color: colors.text,
                        width: '100%',
                        textAlign: 'right',
                        fontSize: 15,
                        fontWeight: '400',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    Discount: -{settingsContext.currencySymbol}
                    {((props.orderDict.netTotal - props.orderDict.orderTotal) / 100).toFixed(2)}
                </Text>
            </View>
        )
    } else {
        return null
    }
}
