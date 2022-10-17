import {Appbar, Menu} from 'react-native-paper';
import React from "react";
import {View} from "react-native";
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
                                navigation.navigate('Services');
                            },300);
                        }}
                        title="Services"
                        icon={'room-service'}
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
