import {useEffect, useState} from "react";
import Constants from "expo-constants";
import axios from "axios";
import getLocalStorageValue from "../../utils/storage/getLocalStorageValue";
import setLocalStorageValue from "../../utils/storage/setLocalStorageValue";
import {
    ChangeSelectedLocation, GetRestaurantData,
    LocationDict,
    ReloadRestaurantData,
    SetUsedRestaurant
} from "../../interfaces/appSettings";
import localStorageKeys from "../../constants/localStorageKeys";
import baseHeaders from "../../constants/requestHeaders";
import currencies from "../../constants/currencies";
import {RestaurantSettings} from "../../interfaces/appSettings";
import {PosConfigDict} from "../../interfaces/pos";
import {defaultLocation} from "../../constants/location";

export interface UseAccountSettings {
    (
        authToken: string | null
    ): {
        usedRestaurantId: string | null,
        setUsedRestaurant: SetUsedRestaurant,
        restaurantData: RestaurantSettings | null,
        currencySymbol: string,
        locations: LocationDict[],
        selectedLocation: LocationDict | null,
        activePosConfig: PosConfigDict | null,
        changeSelectedLocation: ChangeSelectedLocation,
        reloadRestaurantData: ReloadRestaurantData
    }
}


const useAccountSettings: UseAccountSettings = (authToken) => {
    const [restaurantData, setRestaurantData] = useState<{[index: string]: any} | null>(null);
    const [currencySymbol, setCurrencySymbol] = useState<string>(currencies[0].symbol);
    const [locations, setLocations] = useState<LocationDict[]>([defaultLocation]);
    const [selectedLocation, setSelectedLocation] = useState<LocationDict | null>(defaultLocation);
    const [usedRestaurantId, setUsedRestaurantId] = useState<string | null>(null);
    const [activePosConfig, setActivePosConfig] = useState<null | PosConfigDict>(null);

    useEffect(() => {
        if (!!authToken && !!usedRestaurantId) {
            getRestaurantData(authToken);
        }
    }, [!!authToken, !!usedRestaurantId]);

    useEffect(() => {
        if (restaurantData) {
            if (restaurantData.currency) {
                const foundCurrency = currencies.find(currDict => {
                    return restaurantData.currency === currDict.name
                });

                setCurrencySymbol(foundCurrency ? foundCurrency.symbol : currencies[0].symbol);
            }
        }
    }, [restaurantData]);

    useEffect(() => {
        if (usedRestaurantId && usedRestaurantId !== 'null') {
            getLocalStorageValue(localStorageKeys.restaurantId.keyName).then(restId => {
                if (restId !== usedRestaurantId) {
                    setLocalStorageValue(localStorageKeys.restaurantId.keyName, usedRestaurantId)
                }
            })
        } else {
            getRestaurantId();
        }
    }, [usedRestaurantId]);

    useEffect(() => {
        getLocalStorageValue(localStorageKeys.selectedLocation.keyName).then(locJson => {
            if (locJson) {
                try {
                    const parsedLocationDict = JSON.parse(locJson);
                    setSelectedLocation(parsedLocationDict);
                } catch (e) {
                    console.log(`getLocalStorageValue ${e}`);
                }
            }
        })
    }, []);

    async function getRestaurantId() {
        const restId = await getLocalStorageValue(localStorageKeys.restaurantId.keyName);
        if (restId) {
            setUsedRestaurantId(restId);
        }
    }

    const getRestaurantData: GetRestaurantData = async (token, restaurantId = usedRestaurantId) => {
        const authHeader: string = `Bearer ${token}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_get_restaurant_data_v2` : null;

        try {
            if (!!requestUrl && !!restaurantId) {
                const restDataRes = await axios.post(
                    requestUrl,
                    {
                        restaurant_id: restaurantId
                    },
                    {
                        headers: reqHeaders
                    }
                );

                if (restDataRes.data.success) {
                    setRestaurantData(restDataRes.data.restaurantResult);

                    if (
                        restDataRes.data.restaurantResult.locations
                        && restDataRes.data.restaurantResult.locations.length > 0
                    ) {
                        let newLocations = [defaultLocation].concat(restDataRes.data.restaurantResult.locations);
                        setLocations(newLocations);
                    } else {
                        setLocations([defaultLocation]);
                    }
                }
            }

        } catch (e) {
            console.log(`getRestaurantData ${e}`);
        }
    }

    const changeSelectedLocation: ChangeSelectedLocation = (newLocId) => {
        if (newLocId) {
            const newLocDict = locations.find(locDict => {
                return locDict.locationId === newLocId
            });

            if (newLocDict) {
                setSelectedLocation(newLocDict);
                setLocalStorageValue(localStorageKeys.selectedLocation.keyName, JSON.stringify(newLocDict));
            } else {
                setSelectedLocation(defaultLocation);
                setLocalStorageValue(localStorageKeys.selectedLocation.keyName, JSON.stringify(defaultLocation));
            }
        }
    }

    const setUsedRestaurant: SetUsedRestaurant = async (id) => {
        if (id) {
            setUsedRestaurantId(id);
            if (!!authToken) {
                await getRestaurantData(authToken, id);
            }
        }
    }

    const reloadRestaurantData: ReloadRestaurantData = async () => {
        if (!!authToken) {
            await getRestaurantData(authToken);
        }
    }

    return {
        usedRestaurantId,
        setUsedRestaurant,
        restaurantData,
        currencySymbol,
        locations,
        selectedLocation,
        activePosConfig,
        changeSelectedLocation,
        reloadRestaurantData
    }
}

export default useAccountSettings;
