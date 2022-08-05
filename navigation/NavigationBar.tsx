import {Appbar, Menu} from 'react-native-paper';
import React, {useContext} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import SettingsContext from "../components/settings/settingsContext";
import {coloursConstants} from "../constants/colours";

interface CustomNavigationBarProps {
    navigation: any,
    back?: any,
    options?: any,
    route?: any
}


export default function NavigationBar(
    {navigation, back, options, route}: CustomNavigationBarProps
) {
    const settingsContext = useContext(SettingsContext);
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const routeTitle = (!!options && !!options.title)
        ? options.title : route.name;

    return (
        <Appbar.Header
            style={{
                backgroundColor: coloursConstants.cardBackgroundColorLight.hex
            }}
        >
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

            <Appbar.Content title={routeTitle} />

            <View
                style={{
                    marginTop: 5,
                    marginRight: 0,
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 5
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LocationPick');
                        }}
                        style={{
                            backgroundColor: coloursConstants.primaryColor.hex,
                            padding: 7,
                            paddingRight: 13,
                            paddingLeft: 13,
                            marginBottom: 8,
                            marginRight: 20,
                            borderRadius: 10,
                            marginTop: 0,
                            display: "flex",
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: 'white'
                            }}
                        >
                            Location: {settingsContext.selectedLocation?.locationId}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <Appbar.Action
                            icon="menu"
                            color={coloursConstants.cardBackgroundColorDark.hex}
                            onPress={openMenu}
                            style={{
                                marginRight: 20,
                                marginLeft: 20,
                                marginBottom: 10,
                                padding: 0
                            }}
                            size={30}
                        />
                    }>
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setTimeout(() => {
                                navigation.navigate('Home', {
                                    checkToken: false
                                });
                            },300);
                        }}
                        title="Home"
                        icon={'home'}
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setTimeout(() => {
                                navigation.navigate('Orders');
                            },300);
                        }}
                        title="Orders"
                        icon={'shopping'}
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setTimeout(() => {
                                navigation.navigate('MenuEdit');
                            },300);
                        }}
                        title="Menu"
                        icon={'book-open-outline'}
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setTimeout(() => {
                                navigation.navigate('Settings');
                            },300);
                        }}
                        title="Settings"
                        icon={'cog'}
                    />
                    <Menu.Item
                        onPress={() => {
                            closeMenu();
                            setTimeout(() => {
                                navigation.navigate('LogOut');
                            },300);
                        }}
                        title="Log out"
                        icon={'logout'}
                    />
                </Menu>
            </View>
        </Appbar.Header>
    )
}
