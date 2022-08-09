import React from "react";
import {useTheme} from "react-native-paper";
import {View, Text} from "react-native";
import {Order} from "../../../../interfaces/order";

interface FreeItemMechanicProps {
    orderDict: Order | null
}

export default function FreeItemMechanic(props: FreeItemMechanicProps) {
    const {colors} = useTheme();
    const itemName = (
        props.orderDict &&
        props.orderDict.campaignDetails &&
        props.orderDict.campaignDetails.itemName
    ) ? props.orderDict.campaignDetails.itemName : null;

    if (itemName) {
        return (
            <View
                style={{
                    position: 'relative',
                    backgroundColor: 'rgb(250,180,180)',
                    padding: 5,
                    borderRadius: 10
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'right',
                        fontSize: 17,
                        fontWeight: '500',
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    Free item: {itemName}
                </Text>
            </View>
        )
    } else {
        return null
    }
}
