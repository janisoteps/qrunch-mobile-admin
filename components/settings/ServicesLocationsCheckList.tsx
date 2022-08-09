import {useTheme} from "@react-navigation/native";
import React, {useContext} from "react";
import SettingsContext from "./settingsContext";
import {Text, View} from "react-native";
import {coloursConstants} from "../../constants/colours";
import ServicesLocationsRow from "./ServicesLocationsRow";


export default function ServicesLocationsCheckList() {
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
                    Services Notifications enabled for Locations:
                </Text>

                {settingsContext.locations?.map(locationDict => {
                    return (
                        <ServicesLocationsRow
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
