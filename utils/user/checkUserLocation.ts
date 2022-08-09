import {QrunchUser} from "../../interfaces/qrunchUser";
import {LocationId} from "../../interfaces/appSettings";

export interface CheckUserLocation {
    (
        userData: QrunchUser | null | undefined,
        locationId: LocationId
    ): boolean
}

const checkUserLocation: CheckUserLocation = (userData, locationId) => {
    const isLocationFilterUsed = !!userData && 'appUserOrderLocations' in userData;
    const locationsList = (!!userData && isLocationFilterUsed  && Array.isArray(userData.appUserOrderLocations))
        ? userData.appUserOrderLocations : [];
    const locationsIdsList = locationsList.map(locationRefDict => {
        return locationRefDict.locationId
    });

    if (isLocationFilterUsed) {
        return locationsIdsList.includes(locationId)
    } else {
        return true
    }
};

export default checkUserLocation
