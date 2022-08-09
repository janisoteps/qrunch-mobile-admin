import {useTheme} from "@react-navigation/native";
import React from "react";
import {ServiceCategory} from "../../interfaces/service";
import {Text, View} from "react-native";
import {coloursConstants} from "../../constants/colours";
import ServicesCatsCheckRow from "./ServicesCatsCheckRow";

interface ServicesCatsCheckListProps {
    accountServiceCats: ServiceCategory[]
}

export default function ServicesCatsCheckList({accountServiceCats}: ServicesCatsCheckListProps) {
    const { colors } = useTheme();

    if (
        !!accountServiceCats
        && Array.isArray(accountServiceCats)
        && accountServiceCats.length > 0
    ) {
        return (
            <View
                style={{
                    backgroundColor: colors.background,
                    margin: 0,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: coloursConstants.textColorDark.hex,
                        fontSize: 17,
                        textAlign: 'center',
                        marginBottom: 20
                    }}
                >
                    Notifications enabled for Services categories:
                </Text>

                {accountServiceCats.map(serviceCategory => {
                    return (
                        <ServicesCatsCheckRow
                            key={serviceCategory._id}
                            serviceCategory={serviceCategory}
                            accountServiceCats={accountServiceCats}
                        />
                    )
                })}
            </View>
        )
    } else {
        return (
            <View
                style={{
                    backgroundColor: colors.background,
                    margin: 0,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: coloursConstants.textColorDark.hex,
                        fontSize: 20,
                        textAlign: 'center'
                    }}
                >
                    No available Services categories
                </Text>
            </View>
        )
    }
}
