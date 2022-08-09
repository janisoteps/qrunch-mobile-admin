import React from "react";
import {useTheme} from "@react-navigation/native";
import {OrderItem} from "../../../interfaces/item";
import {View, Text} from "react-native";
import titleCase from "../../../utils/general/titleCase";

interface ItemOptionsProps {
    orderItemDict: OrderItem
}

export default function ItemOptions(props: ItemOptionsProps) {
    const { colors } = useTheme();

    const Extras = () => {
        if (props.orderItemDict.options && props.orderItemDict.options.extras) {
            const extrasList = props.orderItemDict.options.extras.map((extra: string) => {
                return (
                    <View
                        style={{
                            backgroundColor: 'rgb(255,255,210)',
                        }}
                        key={extra}
                    >
                        <Text
                            style={{
                                color: colors.text,
                                textAlign: 'left',
                                fontSize: 12,
                                fontWeight: 'normal',
                                marginRight: 5
                            }}
                        >
                            {titleCase(extra)}
                        </Text>
                    </View>
                )
            })
            return (
                <View
                    style={{
                        borderRadius: 10,
                        backgroundColor: 'rgb(255,255,210)',
                        padding: 5,
                        margin: 3
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'left',
                            fontSize: 12,
                            fontWeight: 'normal',
                            marginRight: 5
                        }}
                    >
                        Extras:
                    </Text>
                    {extrasList}
                </View>
            )
        } else {
            return null
        }
    }

    const Options = () => {
        if (props.orderItemDict.options && typeof props.orderItemDict.options === 'object') {
            const optionsKeys = Object.keys(props.orderItemDict.options).filter(key => {
                return key !== 'extras'
            });
            if (optionsKeys.length > 0) {
                const optionsList = optionsKeys.map(optionKey => {
                    const optName = props.orderItemDict.options[optionKey].split('---')[1];
                    return (
                        <View
                            style={{
                                borderRadius: 10,
                                backgroundColor: 'rgb(210,255,210)',
                                padding: 5,
                                margin: 3
                                // border: '1px solid rgba(250,250,250,0.7)',
                            }}
                            key={optionKey}
                        >
                            <Text
                                style={{
                                    color: colors.text,
                                    textAlign: 'left',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    marginRight: 5
                                }}
                            >
                                {titleCase(optionKey)}: {optName}
                            </Text>
                        </View>
                    )
                })
                return (
                    <View
                        style={{
                            borderRadius: 5,
                            backgroundColor: 'white',
                        }}
                    >
                        {optionsList}
                    </View>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginRight: 5
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginRight: 5
                }}
            >
                <Options />

                {'extras' in props.orderItemDict.options && (
                    <Extras />
                )}
            </View>

        </View>
    )
}
