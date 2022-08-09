import {useNavigation, useTheme} from "@react-navigation/native";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import SettingsContext from "../components/settings/settingsContext";
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import Layout from "../constants/layout";
import useAuthentication from "../utils/hooks/useAuthentication";
import {coloursConstants} from "../constants/colours";
import OrdersLocationsCheckList from "../components/settings/OrdersLocationsCheckList";
import ServicesLocationsCheckList from "../components/settings/ServicesLocationsCheckList";
import * as AllImages from "../assets/images";
import {AllImagesXface} from "../assets/images";
import {ServiceCategory} from "../interfaces/service";
import getAccountServices from "../utils/account/getAccountServices";
import ServicesCatsCheckList from "../components/settings/ServicesCatsCheckList";

interface SettingsScreenProps {}


export default function SettingsScreen(props: SettingsScreenProps) {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const settingsContext = useContext(SettingsContext);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const { user } = useAuthentication();
    const [accountServiceCats, setAccountServiceCats] = useState<ServiceCategory[]>([]);

    useEffect(() => {
        if (!!settingsContext?.restaurantData) {
            getAccountServices(settingsContext.restaurantData._id).then(servicesResponse => {
                if (servicesResponse.success && !!servicesResponse.serviceCats) {
                    setAccountServiceCats(servicesResponse.serviceCats);
                }
            })
        }
    }, [!!settingsContext?.restaurantData]);

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
                    <Image
                        source={(AllImages as AllImagesXface)['settingsIcon']}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 50,
                            marginTop: 20,
                            marginBottom: 20
                        }}
                    />

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
                    {!!settingsContext.userErrorMessage && (
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 20
                            }}
                        >
                            {settingsContext.userErrorMessage}
                        </Text>
                    )}
                    <Text
                        style={{
                            fontWeight: '500',
                            fontSize: 17,
                            margin: 20
                        }}
                    >
                        Settings for {user?.email}
                    </Text>

                    <View
                        style={{
                            borderBottomColor: coloursConstants.disabledColor.hex,
                            borderBottomWidth: 1,
                            width: '70%',
                            margin: 50
                        }}
                    />

                    <OrdersLocationsCheckList />

                    <View
                        style={{
                            borderBottomColor: coloursConstants.disabledColor.hex,
                            borderBottomWidth: 1,
                            width: '70%',
                            margin: 50
                        }}
                    />

                    <ServicesLocationsCheckList />

                    {!!settingsContext.userErrorMessage && (
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 20
                            }}
                        >
                            {settingsContext.userErrorMessage}
                        </Text>
                    )}

                    <View
                        style={{
                            borderBottomColor: coloursConstants.disabledColor.hex,
                            borderBottomWidth: 1,
                            width: '70%',
                            margin: 50
                        }}
                    />

                    <ServicesCatsCheckList
                        accountServiceCats={accountServiceCats}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
