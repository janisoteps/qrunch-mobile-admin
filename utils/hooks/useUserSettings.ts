import {useEffect, useState} from "react";
import Constants from 'expo-constants';
import axios from "axios";
import {Dimensions} from "react-native";
import {GetUserData, GetUserRestaurants, QrunchUser} from "../../interfaces/qrunchUser";
import {RestaurantSettings} from "../../interfaces/appSettings";
import baseHeaders from "../../constants/requestHeaders";
import {UpdateDict} from "../../interfaces/general";
import updateUserOneSetting from "../user/updateUserOneSetting";

export interface ChangeUserSetting {
    (updateDict: UpdateDict): void
}

export interface UseUserSettings {
    (user: string | null): {
        userType: string | null,
        firstName: string | null,
        userData: QrunchUser | null,
        userRestaurants: {}[] | null,
        restaurantsLoading: boolean,
        reloadUserData: () => void,
        screenWidth: number,
        isMobile: boolean,
        changeUserSetting: ChangeUserSetting,
        userErrorMessage: string | null
    }
}


const useUserSettings: UseUserSettings = (authToken) => {
    const [userType, setUserType] = useState<string | null>(null);
    const [userData, setUserData] = useState<QrunchUser | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [restaurantIds, setRestaurantIds] = useState<string[] | null>(null);
    const [userRestaurants, setUserRestaurants] = useState<RestaurantSettings[] | null>(null);
    const [restaurantsLoading, setRestaurantsLoading] = useState<boolean>(true);
    const [screenWidth, setScreenWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [userErrorMessage, setUserErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!!authToken && authToken !== 'null') {
            getUserData(authToken);
        }
    }, [authToken]);

    useEffect(() => {
        if (!!restaurantIds && restaurantIds.length > 0) {
            getUserRestaurants(restaurantIds);
        }
    }, [!!restaurantIds]);

    useEffect(() => {
        setScreenWidth(Dimensions.get('window').width);
        setIsMobile(Dimensions.get('window').width < 550);
    }, []);

    const getUserData: GetUserData = async (token) => {
        const authHeader: string = `Bearer ${token}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;
        const axiosConfig = {
            headers: reqHeaders
        };

        try {
            const requestUrl = (Constants.manifest && Constants.manifest.extra)
                ? `${Constants.manifest.extra.qrunchApi}/api/app_auth_user_v2` : null;

            if (requestUrl) {
                const userRes = await axios.get(requestUrl, axiosConfig);

                if (!!userRes.data) {
                    setUserType(userRes.data.userData.type);
                    setUserData(userRes.data.userData);

                    if (userRes.data.userData.restaurants.length > 0) {
                        setRestaurantIds(userRes.data.userData.restaurants);
                    } else {
                        setRestaurantsLoading(false);
                    }

                    if (userRes.data.userData.profile && userRes.data.userData.profile.firstName) {
                        setFirstName(userRes.data.userData.profile.firstName);
                    }
                }
            }

        } catch (e) {
            console.log('getUserData ERROR')
        }
    }

    const getUserRestaurants: GetUserRestaurants = async (ids) => {
        try {
            const requestBaseUrl = (Constants.manifest && Constants.manifest.extra)
                ? `${Constants.manifest.extra.qrunchApi}/api/restaurant_id` : null;

            if (requestBaseUrl) {
                const restaurantListPromises = ids.map(async restaurantId => {
                    const requestUrl = `${requestBaseUrl}?id=${restaurantId}`;
                    const res = await axios.get(requestUrl, {headers: baseHeaders});

                    return await res.data
                });
                const restaurantList = await Promise.all(restaurantListPromises);

                setUserRestaurants(restaurantList);
                setRestaurantsLoading(false);
            }
        } catch (e) {
            console.log(`getUserRestaurants: ${e}`)
        }
    }

    function reloadUserData() {
        if (authToken) {
            getUserData(authToken);
        }
    }

    const changeUserSetting: ChangeUserSetting = (updateDict) => {
        if (!!authToken) {
            updateUserOneSetting(authToken, updateDict).then(updateResult => {
                if (updateResult.success) {
                    setUserErrorMessage(null);
                    reloadUserData();
                } else {
                    setUserErrorMessage(updateResult.error);
                }
            })
        }
    }

    return {
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
    }
}

export default useUserSettings;
