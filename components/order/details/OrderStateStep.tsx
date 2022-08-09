import React from "react";
import OrderStateStepBubble from "./OrderStateStepBubble";
import OrderStateStepArrow from "./OrderStateStepArrow";
import {View} from "react-native";
import {ArrowImgStyle, OrderStateStepProps, StepIconImgStyle} from "../../../interfaces/order";


export default function OrderStateStep(props: OrderStateStepProps) {
    let iconImgStyle: StepIconImgStyle = {
        width: 40,
        height: 40,
        opacity: 1,
        position: 'relative'
    }
    let overlayIconImgStyle: StepIconImgStyle = {
        width: 40,
        height: 40,
        opacity: 0.3,
        position: 'absolute'
    }
    if (props.idx > props.activeOrderStateIdx) {
        overlayIconImgStyle['tintColor'] = 'gray';
        iconImgStyle.opacity = 0.2;
    }
    const isActive = props.idx <= props.activeOrderStateIdx;

    if (props.idx === 0) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <OrderStateStepBubble
                    stateDict={props.stateDict}
                    iconImgStyle={iconImgStyle}
                    overlayIconImgStyle={overlayIconImgStyle}
                    isActive={isActive}
                    changeOrderStatus={props.changeOrderStatus}
                    orderId={props.orderId}
                />
            </View>
        )
    } else {
        const arrowRightSrc = require('./../../../assets/images/arrow-right.png');
        let arrowImgStyle: ArrowImgStyle = {
            width: 16,
            height: 30,
        };
        if (props.idx > props.activeOrderStateIdx) {
            arrowImgStyle['tintColor'] = 'gray'
        }

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <OrderStateStepArrow
                    arrowRightSrc={arrowRightSrc}
                    arrowImgStyle={arrowImgStyle}
                />
                <OrderStateStepBubble
                    stateDict={props.stateDict}
                    iconImgStyle={iconImgStyle}
                    overlayIconImgStyle={overlayIconImgStyle}
                    isActive={isActive}
                    changeOrderStatus={props.changeOrderStatus}
                    orderId={props.orderId}
                />
            </View>
        )
    }
}
