import {useTheme} from "@react-navigation/native";
import React, {useContext} from "react";
import SettingsContext from "../../settings/settingsContext";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";
import {Image, View, Text} from "react-native";
import {Order} from "../../../interfaces/order";
import weekDays from "../../../constants/weekDays";

interface MoreInformationProps {
    orderDict: Order,
    locationType: string,
    taboomNr: null | string,
    backgroundColor: string,
    isMobile: boolean | undefined,
    isSingleOrderView: boolean
}

export default function MoreInformation(props: MoreInformationProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const unitLabel = props.locationType === 'hotel' ? 'Room number' : 'Table number';

    const textStyle: {
        color: string
        textAlign: "center" | "auto" | "left" | "right" | "justify" | undefined,
        fontSize: number
    } = {
        color: colors.text,
        textAlign: 'center',
        fontSize: 13
    };

    let currentEta = 'Not set';
    if (props.orderDict.eta) {
        const etaDateTime = new Date(props.orderDict.eta);
        currentEta = `${etaDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    }

    return (
        <View
            style={{
                backgroundColor: props.backgroundColor,
                display: 'flex',
                flexDirection: props.isSingleOrderView ? 'column' : 'row',
                justifyContent: 'center'
            }}
        >
            <View
                style={{
                    backgroundColor: props.backgroundColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        backgroundColor: props.backgroundColor,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={textStyle}
                    >
                        {`${weekDays[new Date(props.orderDict.creationDate).getDay()]} `}
                    </Text>
                    <Text
                        style={{
                            paddingRight: 5,
                            ...textStyle
                        }}
                    >
                        {`${new Date(props.orderDict.creationDate).toLocaleString()}`}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: props.backgroundColor,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    {props.orderDict.completionDate && (
                        <Text
                            style={textStyle}
                        >
                            Asked Date: {props.orderDict.completionDate}
                        </Text>
                    )}
                    <Text
                        style={textStyle}
                    >
                        Asked Time: {props.orderDict.completionTime}
                    </Text>
                    <Text
                        style={textStyle}
                    >
                        ETA: {currentEta}
                    </Text>
                </View>

                <View style={{
                    marginVertical: 5,
                    height: 1,
                    width: '80%',
                }} />

                {props.taboomNr && (
                    <Text
                        style={textStyle}
                    >
                        {unitLabel}: {props.taboomNr}
                    </Text>
                )}
            </View>

            <View
                style={{
                    backgroundColor: props.backgroundColor,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        backgroundColor: props.backgroundColor,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <Text
                        style={textStyle}
                    >
                        Order type: {props.orderDict.orderType}
                    </Text>

                    <View style={{
                        marginVertical: 5,
                        height: 1,
                        width: '80%',
                    }} />

                    <Text
                        style={{
                            ...textStyle,
                            fontWeight: 'bold'
                        }}
                    >
                        Status: {props.orderDict.orderState}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: props.backgroundColor,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={(AllImages as AllImagesXface)['paymentIcon']}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                    <Text
                        style={{
                            ...textStyle,
                            fontWeight: 'bold'
                        }}
                    >
                        {` ${props.orderDict.paymentMethod === 'card' ? 'card online' : props.orderDict.paymentMethod}`}
                    </Text>
                </View>

                {(props.orderDict.deliveryFee > 0) && (
                    <View
                        style={{
                            backgroundColor: props.backgroundColor,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={textStyle}
                        >
                            Delivery Fee (included in total): {settingsContext.currencySymbol}{props.orderDict.deliveryFee}
                        </Text>
                    </View>
                )}

                {(props.orderDict.gratuityFee > 0) && (
                    <View
                        style={{
                            backgroundColor: props.backgroundColor,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={textStyle}
                        >
                            Gratuity (included in total): {settingsContext.currencySymbol}{props.orderDict.gratuityFee}
                        </Text>
                    </View>
                )}

                {(props.orderDict.serviceFee > 0) && (
                    <View
                        style={{
                            backgroundColor: props.backgroundColor,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={textStyle}
                        >
                            Service (included in total):
                        </Text>
                        <View
                            style={{
                                backgroundColor: props.backgroundColor,
                            }}
                        >
                            <Text
                                style={textStyle}
                            >
                                {settingsContext.currencySymbol}
                                {(props.orderDict.serviceFee / 100).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                )}

                {('comment' in props.orderDict && props.orderDict.comment.length > 0) && (
                    <View
                        style={{
                            backgroundColor: props.backgroundColor,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            maxWidth: 200
                        }}
                    >
                        <Text
                            style={{
                                color: 'red',
                                textAlign: 'center',
                                fontSize: 13
                            }}
                        >
                            Comment:
                        </Text>
                        <Text
                            style={{
                                color: 'red',
                                textAlign: 'center',
                                fontSize: 13
                            }}
                        >
                            {props.orderDict.comment}
                        </Text>
                    </View>
                )}
            </View>



        </View>
    )
}
