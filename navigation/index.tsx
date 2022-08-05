import React from 'react';
import useAuthentication from '../utils/hooks/useAuthentication';
import UserStack from './UserStack';
import AuthStack from './AuthStack';
import {User} from "firebase/auth";
import {AppSettings} from "../interfaces/appSettings";
import {NavigationContainer} from "@react-navigation/native";

interface RootNavigationProps {
    authProps: {
        user: User | null,
        authToken: string | null
    },
    settings: AppSettings
}

export default function RootNavigation(
    {authProps, settings}: RootNavigationProps
) {
    const { user } = useAuthentication();

    if (!!user) {
        return (
            <NavigationContainer>
                <UserStack authProps={authProps} settings={settings} />
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        )
    }
}
