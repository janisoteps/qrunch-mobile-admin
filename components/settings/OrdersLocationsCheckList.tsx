import {coloursConstants} from "../../constants/colours";
import {Text, View} from "react-native";
import React, {useContext} from "react";
import SettingsContext from "./settingsContext";
import OrdersLocationsRow from "./OrdersLocationsRow";
import {useTheme} from "@react-navigation/native";

interface OrdersLocationsCheckListProps {
}

export default function OrdersLocationsCheckList({}: OrdersLocationsCheckListProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    if (
        !!settingsContext.locations
        && Array.isArray(settingsContext.locations)
        && settingsContext.locations.length > 0
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
                    Orders Notifications enabled for Locations:
                </Text>

                {settingsContext.locations?.map(locationDict => {
                    return (
                        <OrdersLocationsRow
                            key={locationDict.locationId}
                            locationDict={locationDict}
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
                    No Locations set up
                </Text>
            </View>
        )
    }
}
