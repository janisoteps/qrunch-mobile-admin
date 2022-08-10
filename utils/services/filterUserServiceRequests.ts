import {ServiceOrder} from "../../interfaces/service";
import {QrunchUser} from "../../interfaces/qrunchUser";

export interface FilterUserServiceRequests {
    (
        serviceRequests: ServiceOrder[],
        userData: QrunchUser | null | undefined
    ): ServiceOrder[]
}

const filterUserServiceRequests: FilterUserServiceRequests = (serviceRequests, userData) => {
    try {
        if (!!userData) {
            const isUserServiceLocationsUsed = 'appUserServiceLocations' in userData;
            const isUserServiceCategoriesUsed = 'appUserServiceCategories' in userData;
            const appUserServiceLocationsIds = (
                isUserServiceLocationsUsed
                && Array.isArray(userData?.appUserServiceLocations)
            ) ? userData.appUserServiceLocations.map(locationRef => {
                return locationRef.locationId
            }) : [];
            const appUserServiceCategoriesIds = (
                isUserServiceCategoriesUsed
                && Array.isArray(userData.appUserServiceCategories)
            ) ? userData.appUserServiceCategories.map(serviceCatRef => {
                return serviceCatRef.serviceCategoryId
            }) : [];

            const locationsFilteredRequests = serviceRequests.filter(serviceRequest => {
                if (isUserServiceLocationsUsed) {
                    return appUserServiceLocationsIds.includes(serviceRequest?.locationId)
                } else {
                    return true
                }
            });

            return locationsFilteredRequests.filter(serviceRequest => {
                if (isUserServiceCategoriesUsed) {
                    return appUserServiceCategoriesIds.includes(serviceRequest?.serviceItem?.orderItemData?.categoryId)
                } else {
                    return true
                }
            })

        } else {
            return []
        }
    } catch (e) {
        console.log(`filterUserServiceRequests ${e}`);

        return []
    }
};

export default filterUserServiceRequests;
