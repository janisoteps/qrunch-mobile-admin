import {View} from "react-native";
import {CheckBox} from "react-native-elements";
import {useTheme} from "@react-navigation/native";
import {LocationDict} from "../../interfaces/appSettings";
import {useContext} from "react";
import SettingsContext from "./settingsContext";

interface OrdersLocationsRowProps {
    locationDict: LocationDict,
}

export default function OrdersLocationsRow({locationDict}: OrdersLocationsRowProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const locationName = !!locationDict?.locationName ? locationDict.locationName : locationDict.locationId;
    const appUserOrderLocations = (
        !!settingsContext?.userData
        && 'appUserOrderLocations' in settingsContext?.userData
        && Array.isArray(settingsContext?.userData?.appUserOrderLocations)
    ) ? settingsContext.userData.appUserOrderLocations : null;

    const foundOrdersLocation = !!appUserOrderLocations ? appUserOrderLocations.find(locRefDict => {
        return locRefDict.locationId === locationDict.locationId
    }) : true;

    const allLocations = Array.isArray(settingsContext?.locations) ? settingsContext.locations.map(locDict => {
        return {
            locationId: locDict.locationId,
            locationName: locDict.locationName
        }
    }) : [];

    function handleSelectedLocationChange() {
        let updatedAppUserOrderLocations = [];
        const currentAppUserOrderLocations = !!appUserOrderLocations ? appUserOrderLocations : allLocations;

        if (!!foundOrdersLocation) {
            updatedAppUserOrderLocations = currentAppUserOrderLocations.filter(locRefDict => {
                return locRefDict.locationId !== locationDict.locationId
            });
        } else {
            updatedAppUserOrderLocations = [...currentAppUserOrderLocations];
            updatedAppUserOrderLocations.push({
                locationId: locationDict.locationId,
                locationName: locationDict.locationName
            });
        }

        if (!!settingsContext?.changeUserSetting) {
            settingsContext.changeUserSetting({
                key: 'appUserOrderLocations',
                newValue: updatedAppUserOrderLocations
            });
        }
    }

    if (locationName === 'all') {
        return null
    } else {
        return (
            <View style={{
                flexDirection: "row",
                marginTop: 10,
                backgroundColor: colors.background,
                minWidth: 200
            }}>
                <CheckBox
                    title={locationName}
                    checked={!!foundOrdersLocation}
                    onPress={() => {handleSelectedLocationChange()}}
                />
            </View>
        )
    }
}
