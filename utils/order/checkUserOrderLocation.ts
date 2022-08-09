import {QrunchUser} from "../../interfaces/qrunchUser";
import {Order} from "../../interfaces/order";

export interface CheckUserOrderLocation {
    (
        userData: QrunchUser,
        order: Order
    ): boolean
}

const checkUserOrderLocation: CheckUserOrderLocation = (userData, order) => {
    const isLocationFilterUsed = !!userData && 'appUserOrderLocations' in userData;
    const locationsList = (!!userData && isLocationFilterUsed  && Array.isArray(userData.appUserOrderLocations))
        ? userData.appUserOrderLocations : [];
    const locationsIdsList = locationsList.map(locationRefDict => {
        return locationRefDict.locationId
    });

    if (isLocationFilterUsed) {
        return locationsIdsList.includes(order?.restaurantLocation?.locationId)
    } else {
        return true
    }
};

export default checkUserOrderLocation
