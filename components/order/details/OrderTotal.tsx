import React, {useContext} from "react";
import {useTheme} from "@react-navigation/native";
import SettingsContext from "../../settings/settingsContext";
import {Order} from "../../../interfaces/order";
import {View, Text} from "react-native";
import OrderCampaign from "./campaign/OrderCampaign";

interface OrderTotalProps {
    orderDict: Order | null
}


export default function OrderTotal(props: OrderTotalProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    if (props.orderDict) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    alignItems: 'flex-end',
                    position: 'relative',
                    alignSelf: 'stretch',
                    marginBottom: 30
                }}
            >
                <OrderCampaign
                    orderDict={props.orderDict}
                />

                <Text
                    style={{
                        color: colors.text,
                        width: '100%',
                        textAlign: 'right',
                        fontSize: 20,
                        fontWeight: '500',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    Order Total: {settingsContext.currencySymbol}{(props.orderDict.orderTotal / 100).toFixed(2)}
                </Text>
            </View>
        )
    } else {
        return null
    }
}
