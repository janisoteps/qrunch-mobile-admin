import {Image, Pressable, View, Text} from "react-native";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";
import React, {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {OrderStateStepBubbleProps} from "../../../interfaces/order";


export default function OrderStateStepBubble(props: OrderStateStepBubbleProps) {
    const { colors } = useTheme();
    const [showCheckMark, setShowCheckMark] = useState(false);
    const backgroundColor = props.isActive ? 'rgb(200,250,200)' : 'rgb(230,230,230)';

    useEffect(() => {
        let isSubscribed = true;

        if (showCheckMark) {
            setTimeout(() => {
                if (isSubscribed) {
                    setShowCheckMark(false);
                }
            }, 1500);
        }

        return function () {
            isSubscribed = false
        }
    }, [showCheckMark]);

    return (
        <Pressable
            style={{
                backgroundColor: showCheckMark ? 'white' : backgroundColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                shadowColor: '#171717',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                padding: 5,
                borderRadius: 10,
                margin: 5
            }}
            onPress={() => {
                if (props.orderId) {
                    props.changeOrderStatus(props.orderId, props.stateDict.id);
                }
                setShowCheckMark(true);
            }}
        >
            {showCheckMark ? (
                <Image
                    source={(AllImages as AllImagesXface)['success']}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            ):(
                <View
                    style={{
                        backgroundColor: showCheckMark ? 'white' : backgroundColor,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 5
                    }}
                >
                    <Image
                        source={(AllImages as AllImagesXface)[`${props.stateDict.img}`]}
                        style={props.iconImgStyle}
                    />
                    <Image
                        source={(AllImages as AllImagesXface)[`${props.stateDict.img}`]}
                        style={props.overlayIconImgStyle}
                    />
                </View>
            )}

            <View
                style={{
                    backgroundColor: showCheckMark ? 'white' : backgroundColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'center',
                        fontSize: 17
                    }}
                >
                    {props.stateDict.name}
                </Text>
            </View>

        </Pressable>
    )
}
