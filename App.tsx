import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import './config/firebase';
import RootNavigation from "./navigation";
import {Provider as PaperProvider} from 'react-native-paper';
import {QrunchPaperTheme} from "./constants/colours";
import useAuthentication from "./utils/hooks/useAuthentication";
import useUserSettings from "./utils/hooks/useUserSettings";
import useAccountSettings from "./utils/hooks/useAccountSettings";


export default function App() {
    const {user, authToken} = useAuthentication();

    const {
        userType,
        firstName,
        userData,
        userRestaurants,
        restaurantsLoading,
        reloadUserData,
        screenWidth,
        isMobile,
        changeUserSetting,
        userErrorMessage
    } = useUserSettings(authToken);

    const {
        usedRestaurantId,
        setUsedRestaurant,
        restaurantData,
        currencySymbol,
        locations,
        selectedLocation,
        activePosConfig,
        changeSelectedLocation,
        reloadRestaurantData
    } = useAccountSettings(authToken);

    return (
        <PaperProvider theme={QrunchPaperTheme}>
            <ThemeProvider>
                <RootNavigation
                    authProps={{
                        authToken,
                        user
                    }}
                    settings={{
                        usedRestaurantId,
                        setUsedRestaurant,
                        userType,
                        firstName,
                        userData,
                        userRestaurants,
                        restaurantsLoading,
                        restaurantData,
                        currencySymbol,
                        locations,
                        selectedLocation,
                        activePosConfig,
                        changeSelectedLocation,
                        reloadRestaurantData,
                        reloadUserData,
                        screenWidth,
                        isMobile,
                        changeUserSetting,
                        userErrorMessage
                    }}
                />
            </ThemeProvider>
        </PaperProvider>
    );
}
