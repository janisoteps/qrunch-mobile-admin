import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationBar from "./NavigationBar";
import HomeScreen from '../screens/Home';
import LogOutScreen from "../screens/LogOutScreen";
import {User} from "firebase/auth";
import {AppSettings} from "../interfaces/appSettings";
import AuthContext from '../components/auth/authContext';
import SettingsContext from '../components/settings/settingsContext';
import useNotifications from "../utils/hooks/useNotifications";
import NotifContext from '../components/notifications/notifContext';
import OrdersScreen from "../screens/OrdersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ServicesScreen from "../screens/ServicesScreens";

interface UserStackProps {
    authProps: {
        user: User | null,
        authToken: string | null
    },
    settings: AppSettings
}

const Stack = createStackNavigator();


export default function UserStack({authProps, settings}: UserStackProps) {
    const navigation = useNavigation();

    const {
        initialRoute,
        reValidatePushToken
    } = useNotifications(
        navigation,
        authProps.authToken,
        settings.userData,
        settings.usedRestaurantId,
    );

    return (
        <AuthContext.Provider
            value={authProps}
        >
            <SettingsContext.Provider
                value={settings}
            >
                <NotifContext.Provider
                    value={{
                        reValidatePushToken
                    }}
                >
                    <Stack.Navigator
                        initialRouteName={initialRoute}
                        screenOptions={{
                            header: (props) => <NavigationBar {...props} />,
                        }}
                    >
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                        <Stack.Screen
                            name="LogOut"
                            component={LogOutScreen}
                            options={{headerShown: true, title: 'Log Out'}}
                        />
                        <Stack.Screen name="Orders" component={OrdersScreen} options={{headerShown: true}} />
                        <Stack.Screen
                            name="Services"
                            component={ServicesScreen}
                            options={{headerShown: true, title: 'Service Requests'}}
                        />
                        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}} />
                    </Stack.Navigator>
                </NotifContext.Provider>
            </SettingsContext.Provider>
        </AuthContext.Provider>
    );
}
