import {LocationDict} from "../../interfaces/appSettings";
import {useTheme} from "@react-navigation/native";
import {useContext} from "react";
import SettingsContext from "./settingsContext";
import {View} from "react-native";
import {CheckBox} from "react-native-elements";

interface ServicesLocationsRowProps {
    locationDict: LocationDict,
}


export default function ServicesLocationsRow({locationDict}: ServicesLocationsRowProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const locationName = !!locationDict?.locationName ? locationDict.locationName : locationDict.locationId;
    const appUserServiceLocations = (
        !!settingsContext?.userData
        && 'appUserServiceLocations' in settingsContext?.userData
        && Array.isArray(settingsContext?.userData?.appUserServiceLocations)
    ) ? settingsContext.userData.appUserServiceLocations : null;

    const foundServiceLocation = !!appUserServiceLocations ? appUserServiceLocations.find(locRefDict => {
        return locRefDict.locationId === locationDict.locationId
    }) : true;

    const allLocations = Array.isArray(settingsContext?.locations) ? settingsContext.locations.map(locDict => {
        return {
            locationId: locDict.locationId,
            locationName: locDict.locationName
        }
    }) : [];

    function handleSelectedLocationChange() {
        let updatedAppUserServiceLocations = [];
        const currentAppUserServiceLocations = !!appUserServiceLocations ? appUserServiceLocations : allLocations;

        if (!!foundServiceLocation) {
            updatedAppUserServiceLocations = currentAppUserServiceLocations.filter(locRefDict => {
                return locRefDict.locationId !== locationDict.locationId
            });
        } else {
            updatedAppUserServiceLocations = [...currentAppUserServiceLocations];
            updatedAppUserServiceLocations.push({
                locationId: locationDict.locationId,
                locationName: locationDict.locationName
            });
        }

        if (!!settingsContext?.changeUserSetting) {
            settingsContext.changeUserSetting({
                key: 'appUserServiceLocations',
                newValue: updatedAppUserServiceLocations
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
                    title={`${locationName} (${locationDict.locationId})`}
                    checked={!!foundServiceLocation}
                    onPress={() => {handleSelectedLocationChange()}}
                />
            </View>
        )
    }
}
