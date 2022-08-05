import React, {useContext} from "react";
import SettingsContext from "../settings/settingsContext";
import {useTheme} from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';
import {coloursConstants} from "../../constants/colours";
import {Text, View} from 'react-native';

export default function LocationPicker() {
    const settingsContext = useContext(SettingsContext);
    const { colors } = useTheme();

    const locationsList = (
        !!settingsContext?.locations
        && Array.isArray(settingsContext.locations)
        && settingsContext.locations.length > 0
    ) ? settingsContext.locations.map(locDict => {
        return (
            <Picker.Item
                label={locDict.locationId}
                value={locDict.locationId}
                key={locDict.locationId}
                style={{
                    fontSize: 20,
                }}
            />
        )
    }) : <Text
        style={{
            color: colors.text,
            fontSize: 20,
            textAlign: 'center'
        }}
    >
        No Locations set up
    </Text>

    return (
        <View
            style={{
                backgroundColor: coloursConstants.backgroundColorLight.hex,
                margin: 0,
                alignItems: 'center'
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    width: 300,
                    margin: 20,
                    borderRadius: 20
                }}
            >
                <Picker
                    selectedValue={settingsContext.selectedLocation?.locationId}
                    onValueChange={(itemValue: string, itemIndex: number) => {
                        if (!!settingsContext?.changeSelectedLocation) {
                            settingsContext.changeSelectedLocation(itemValue)
                        }
                    }}
                    style={{
                        width: 300,
                        margin: 20
                    }}
                >
                    {locationsList}
                </Picker>
            </View>

        </View>
    )
}
