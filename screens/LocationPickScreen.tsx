// import {RootTabScreenProps} from "../types";
import {useTheme} from "@react-navigation/native";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Layout from "../constants/layout";
import * as React from "react";
// import LocationPicker from "../components/restaurant/LocationPicker";
import {useContext, useState} from "react";
import SettingsContext from "../components/settings/settingsContext";
import NotifContext from "../components/notifications/notifContext";
import AuthContext from "../components/auth/authContext";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import {Button} from "react-native-paper";
import {RootTabScreenProps} from "../interfaces/general";
import LocationPicker from "../components/account/LocationPicker";


export default function LocationPickScreen({route, navigation}: RootTabScreenProps<'LocationPick'>) {
    const settingsContext = useContext(SettingsContext);
    const notifContext = useContext(NotifContext);
    const authContext = useContext(AuthContext);
    const {colors} = useTheme();
    const [errorMessage, setErrorMessage] = useState<null | string>(null);

    const openLocationSettings = async () => {
        if (settingsContext.restaurantData) {
            setErrorMessage(null);

            const qrunchBase = (Constants.manifest && Constants.manifest.extra)
                ? Constants.manifest.extra.qrunchWeb : 'https://www.qrunch.eu';
            const settingsUrl = `${qrunchBase}/admin/${settingsContext.restaurantData.name}/settings?locations=1`;

            await WebBrowser.openBrowserAsync(settingsUrl);

        } else {
            setErrorMessage('You need to select restaurant first');
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                alignSelf: 'stretch',
                backgroundColor: colors.background
            }}
        >
            {errorMessage && (
                <Text
                    style={{
                        color: 'red',
                        fontSize: 20
                    }}
                >
                    {errorMessage}
                </Text>
            )}

            <Button
                icon="cog"
                mode="contained"
                onPress={() => {
                    openLocationSettings()
                }}
                style={{
                    position: 'absolute',
                    left: 20,
                    top: 10,
                    backgroundColor: colors.primary,
                    zIndex: 10
                }}
            >
                Manage Locations
            </Button>

            <Button
                icon="refresh"
                mode="contained"
                onPress={() => {
                    if (settingsContext && settingsContext.reloadRestaurantData) {
                        settingsContext.reloadRestaurantData();
                    }
                }}
                style={{
                    position: 'absolute',
                    right: 20,
                    top: 10,
                    backgroundColor: colors.primary,
                    zIndex: 10
                }}
            >
                Refresh
            </Button>

            <ScrollView
                style={{
                    marginTop: Layout.headerHeight,
                    paddingTop: 100,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        color: colors.text,
                        textAlign: 'center'
                    }}
                >
                    Pick which location to use:
                </Text>

                <LocationPicker />

                <View
                    style={{
                        backgroundColor: colors.background,
                        alignItems: 'center',
                        padding: 0
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            const useLocId = settingsContext.selectedLocation
                                ? settingsContext.selectedLocation.locationId : 'all'
                            notifContext.reValidatePushToken(
                                settingsContext.userData,
                                authContext.authToken,
                                settingsContext.usedRestaurantId,
                                useLocId
                            );

                            navigation.navigate('Orders');
                        }}
                        style={{
                            backgroundColor: colors.text,
                            width: 200,
                            padding: 10,
                            margin: 0,
                            borderRadius: 10
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'white',
                                textAlign: 'center',
                                paddingTop: 0
                            }}
                        >
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
