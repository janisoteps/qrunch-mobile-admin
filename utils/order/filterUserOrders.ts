import {QrunchUser} from "../../interfaces/qrunchUser";
import {Order} from "../../interfaces/order";

export interface FilterUserOrders {
    (
        userData: QrunchUser | null | undefined,
        ordersList: Order[]
    ): Order[]
}

const filterUserOrders: FilterUserOrders = (userData, ordersList) => {
    try {
        const isLocationFilterUsed = !!userData && 'appUserOrderLocations' in userData;
        const locationsList = (!!userData && isLocationFilterUsed && Array.isArray(userData.appUserOrderLocations))
            ? userData.appUserOrderLocations : [];
        const locationsIdsList = locationsList.map(locationRefDict => {
            return locationRefDict.locationId
        })

        return ordersList.filter((orderDict: Order) => {
            if (isLocationFilterUsed) {
                return locationsIdsList.includes(orderDict.restaurantLocation.locationId)
            } else {
                return true
            }
        })

    } catch (e) {
        console.log(`filterUserOrders ${e}`);

        return []
    }
};

export default filterUserOrders;
