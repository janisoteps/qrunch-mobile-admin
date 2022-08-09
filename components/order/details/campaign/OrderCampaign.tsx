import React from "react";
import {useTheme} from "react-native-paper";
import CampaignMechanic from "./CampaignMechanic";
import {Order} from "../../../../interfaces/order";
import {View, Text} from "react-native";

interface OrderCampaignProps {
    orderDict: Order | null
}


export default function OrderCampaign(props: OrderCampaignProps) {
    const { colors } = useTheme();

    if (props.orderDict && props.orderDict.campaignDetails) {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    alignItems: 'flex-end',
                    position: 'relative',
                    alignSelf: 'stretch',
                }}
            >
                <View
                    style={{
                        position: 'relative',
                        backgroundColor: colors.background,
                        padding: 2,
                        borderRadius: 12,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {props.orderDict.campaignDetails.campaignName && (
                        <Text
                            style={{
                                color: colors.text,
                                textAlign: 'right',
                                fontSize: 15,
                                fontWeight: '500',
                                alignSelf: 'flex-start',
                                alignItems: 'flex-end',
                                marginRight: 15
                            }}
                        >
                            Campaign: {props.orderDict.campaignDetails.campaignName}
                        </Text>
                    )}

                    <CampaignMechanic
                        orderDict={props.orderDict}
                    />
                </View>

            </View>
        )
    } else {
        return null
    }
}
