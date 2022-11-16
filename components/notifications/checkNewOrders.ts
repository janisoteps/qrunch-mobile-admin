import {QrunchUser} from "../../interfaces/qrunchUser";
import {RestaurantSettings} from "../../interfaces/appSettings";
import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";
import {LocationOrderCount} from "../../interfaces/order";

export interface CheckNewOrders {
    (
        authToken: string,
        userData: QrunchUser,
        restaurantData: RestaurantSettings
    ): Promise<{
        success: boolean,
        error: string | null,
        counts: LocationOrderCount[],
    }>
}

function isLocationUsed (userData: QrunchUser, locationId: string) {
    let isLocUsedOrders: boolean = false;
    let isLocUsedServices: boolean = false;

    if (
        'appUserOrderLocations' in userData
        && Array.isArray(userData?.appUserOrderLocations)
    ) {
        const foundLocRef = userData.appUserOrderLocations.find(locationRef => {
            return locationRef.locationId === locationId
        });

        isLocUsedOrders = !!foundLocRef;
    } else {
        isLocUsedOrders =  true;
    }

    if ('appUserServiceLocations' in userData && Array.isArray(userData?.appUserServiceLocations)) {
        const foundLocRef = userData.appUserServiceLocations.find(locationRef => {
            return locationRef.locationId === locationId
        });

        isLocUsedServices = !!foundLocRef;
    } else {
        isLocUsedServices = true;
    }

    return isLocUsedOrders || isLocUsedServices;
}


const checkNewOrders: CheckNewOrders = async (authToken, userData, restaurantData) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_location_counts`
            : null;

        if (!!requestUrl) {
            const locationIds = (Array.isArray(restaurantData.locations)) ? restaurantData.locations.map(locationDict => {
                return locationDict.locationId
            }) : [];

            const countsResPromises = locationIds.map(async (locationId) => {
                if (isLocationUsed(userData, locationId)) {
                    const countsRes = await axios.post(
                        requestUrl,
                        {
                            restaurant_id: restaurantData._id,
                            location_id: locationId
                        },
                        {
                            headers: reqHeaders
                        }
                    );
                    if (countsRes.data.success) {
                        return countsRes.data.locationCounts
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            });

            const countsResponses = await Promise.all(countsResPromises);
            const filteredResponses = countsResponses.filter(locationCountsDict => {
                return !!locationCountsDict
            });

            return {
                success: true,
                error: null,
                counts: filteredResponses
            }
        } else {
            return {
                success: false,
                error: 'Invalid URL',
                counts: []
            }
        }
    } catch (error) {
        return {
            success: false,
            error: `${error}`,
            counts: []
        }
    }
};

export default checkNewOrders;
