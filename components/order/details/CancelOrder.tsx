import React, {useEffect, useState} from "react";
import {Image, Pressable, Text, View} from "react-native";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";
import {ChangeOrderStatus, Order} from "../../../interfaces/order";

interface CancelOrderProps {
    orderDict: Order | null,
    changeOrderStatus: ChangeOrderStatus,
    showCancelConfirm: boolean,
    viewCancelConfirm: () => void,
    showOthers: boolean,
    isMobile: boolean | undefined
}


export default function CancelOrder(props: CancelOrderProps) {
    const [viewFlex, setViewFlex] = useState<number>(0.2);
    const [showCheckMark, setShowCheckMark] = useState<boolean>(false);
    const [orderState, setOrderState] = useState<string>(props.orderDict ? props.orderDict.orderState : 'pending');

    useEffect(() => {
        if (props.orderDict) {
            if (props.orderDict.orderState !== 'canceled') {
                setOrderState((props.orderDict.orderState));
            } else {
                setTimeout(() => {
                    if (props.orderDict) {
                        setOrderState((props.orderDict.orderState));
                    }
                }, 1000);
            }
        }
    }, [props.orderDict?.orderState]);

    useEffect(() => {
        if (props.showCancelConfirm) {
            setViewFlex(0.6);
        } else {
            setViewFlex(props.isMobile ? 0.3 : 0.2);
        }
    }, [props.showCancelConfirm]);

    if (props.orderDict && !props.showOthers) {
        if (orderState === 'canceled') {
            return (
                <Pressable
                    style={{
                        backgroundColor: showCheckMark ? 'white' : 'rgb(240,210,100)',
                        margin: 10,
                        marginLeft: 5,
                        position: 'relative',
                        flex: viewFlex,
                        borderRadius: 15,
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        setShowCheckMark(true);
                        if (props.orderDict) {
                            props.changeOrderStatus(props.orderDict._id, 'pending');
                        }
                        setTimeout(() => {
                            setShowCheckMark(false);
                        }, 1500);
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
                        <Text
                            style={{
                                color: 'rgb(50,40,40)',
                                textAlign: 'center',
                                fontSize: props.isMobile ? 12 : 15,
                                fontWeight: 'bold',
                                marginRight: 5,
                                padding: 15
                            }}
                        >
                            Undo Order Cancelled
                        </Text>
                    )}
                </Pressable>
            )
        } else {
            return (
                <Pressable
                    style={{
                        backgroundColor: props.showCancelConfirm ? 'white' : 'rgb(240,100,100)',
                        margin: 10,
                        marginLeft: 5,
                        position: 'relative',
                        flex: viewFlex,
                        borderRadius: 15,
                        alignItems: 'center',
                        minWidth: 20
                    }}
                    onPress={() => {
                        props.viewCancelConfirm();
                    }}
                >
                    <Text
                        style={{
                            color: props.showCancelConfirm ? 'rgb(50,40,40)' : 'white' ,
                            textAlign: 'center',
                            fontSize: props.isMobile ? 12 : 15,
                            fontWeight: 'bold',
                            marginRight: 5,
                            padding: 15
                        }}
                    >
                        {props.showCancelConfirm ? 'Confirm order cancel' : 'Cancel Order'}
                    </Text>

                    {props.showCancelConfirm && (
                        <View
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginRight: 10,
                                marginLeft: 5,
                                width: '100%',
                                alignItems: 'center'
                            }}
                        >
                            <Pressable
                                style={{
                                    backgroundColor: 'rgb(50,40,40)',
                                    margin: 10,
                                    marginLeft: 5,
                                    position: 'relative',
                                    flex: props.isMobile ? 0.5 : 0.3,
                                    borderRadius: 15,
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    props.viewCancelConfirm();
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: props.isMobile ? 12 : 15,
                                        fontWeight: 'bold',
                                        marginRight: 5,
                                        padding: 15
                                    }}
                                >
                                    NO
                                </Text>
                            </Pressable>

                            <Pressable
                                style={{
                                    backgroundColor: showCheckMark ? 'white' : 'rgb(240,100,100)',
                                    margin: 10,
                                    marginLeft: 5,
                                    position: 'relative',
                                    flex: props.isMobile ? 0.5 : 0.3,
                                    borderRadius: 15,
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    setShowCheckMark(true);
                                    if (props.orderDict) {
                                        props.changeOrderStatus(props.orderDict._id, 'canceled').then(() => {
                                            setTimeout(() => {
                                                setShowCheckMark(false);
                                                props.viewCancelConfirm();
                                            }, 1000);
                                        });
                                    }
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
                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontSize: props.isMobile ? 12 : 15,
                                            fontWeight: 'bold',
                                            marginRight: 5,
                                            padding: 15
                                        }}
                                    >
                                        YES
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            )
        }
    } else {
        return null
    }
}
