import {Image, View} from "react-native";
import React from "react";
import {OrderStateStepArrowProps} from "../../../interfaces/order";

export default function OrderStateStepArrow(props: OrderStateStepArrowProps) {

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                // margin: 10
            }}
        >
            <Image
                source={props.arrowRightSrc}
                style={props.arrowImgStyle}
            />
        </View>
    )
}
