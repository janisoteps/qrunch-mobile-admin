import {useNavigation, useTheme} from "@react-navigation/native";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import SettingsContext from "../components/settings/settingsContext";
import {Button} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import {SafeAreaView, ScrollView, Text, View} from "react-native";
import Layout from "../constants/layout";
import useAuthentication from "../utils/hooks/useAuthentication";

interface SettingsScreenProps {}


export default function SettingsScreen(props: SettingsScreenProps) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const settingsContext = useContext(SettingsContext);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const { user } = useAuthentication();

    useEffect(() => {
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            // TODO Just leaving this here in case Ill need it later :)
            if (settingsContext && settingsContext.reloadRestaurantData) {
                settingsContext.reloadRestaurantData();
            }
        });
    }, [navigation]);

    const openGeneralSettings = async () => {
        if (settingsContext.restaurantData) {
            setErrorMessage(null);

            const qrunchBase = (Constants.manifest && Constants.manifest.extra)
                ? Constants.manifest.extra.qrunchWeb : 'https://www.qrunch.eu';
            const settingsUrl = `${qrunchBase}/admin/${settingsContext.restaurantData.name}/settings`;

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
            <ScrollView
                style={{
                    marginTop: Layout.headerHeight,
                    paddingTop: 40,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch'
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.background,
                        margin: 0,
                        marginBottom: 300,
                        alignItems: 'center'
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
                    <Text>Welcome {user?.email}!</Text>

                    <Button
                        icon="cog"
                        mode="contained"
                        onPress={() => {
                            openGeneralSettings()
                        }}
                        style={{
                            position: 'absolute',
                            left: 20,
                            top: 0,
                            backgroundColor: colors.primary,
                            zIndex: 10
                        }}
                    >
                        Open General Settings
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
