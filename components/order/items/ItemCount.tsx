import React from "react";
import {useTheme} from "@react-navigation/native";
import {View, Text} from "react-native";

interface ItemCountProps {
    orderItemCount: number
}

export default function ItemCount(props: ItemCountProps) {
    const { colors } = useTheme();

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 5,
                marginLeft: 5
            }}
        >
            <Text
                style={{
                    color: (props.orderItemCount && props.orderItemCount > 1) ? 'red' : colors.text,
                    textAlign: 'center',
                    fontSize: (props.orderItemCount && props.orderItemCount > 1) ? 15 : 10,
                    fontWeight: (props.orderItemCount && props.orderItemCount > 1) ? 'bold' : 'normal'
                }}
            >
                {props.orderItemCount ? props.orderItemCount : 1} x
            </Text>
        </View>
    )
}
