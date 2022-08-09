import {QrunchUser} from "./qrunchUser";
import {PosConfigDict} from "./pos";
import {ChangeUserSetting} from "../utils/hooks/useUserSettings";

export type LocationId = string;

export interface WorkDay {
    day: string,
    working: boolean
    closeTime?: string
    openTime?: string,
    secondaryHours?: {
        closeTime: string
        openTime: string,
    }
}

export interface AppSettings {
    usedRestaurantId?: string | null,
    setUsedRestaurant?: SetUsedRestaurant,
    userType?: string | null,
    firstName?: string | null,
    userData?: QrunchUser | null,
    userRestaurants?: RestaurantSettings[] | null,
    restaurantsLoading?: boolean,
    restaurantData?: RestaurantSettings | null,
    currencySymbol?: string,
    locations?: LocationDict[],
    selectedLocation?: LocationDict | null,
    changeSelectedLocation?: ChangeSelectedLocation,
    reloadRestaurantData?: ReloadRestaurantData | null,
    reloadUserData?: () => void,
    screenWidth?: number,
    isMobile?: boolean,
    activePosConfig?: PosConfigDict | null,
    changeUserSetting?: ChangeUserSetting,
    userErrorMessage?: string | null
}

export interface RestaurantSettings {
    [index: string]: any
}

export interface SetUsedRestaurant {
    (id: string): Promise<void>
}

export interface ReloadRestaurantData {
    (): Promise<void>
}

export interface LocationDict {
    locationId: LocationId,
    locationName?: string,
    extension?: string,
    phoneNumber?: string,
    street?: string,
    houseNumber?: string,
    addressMore?: string,
    city?: string,
    postCode?: string,
    country?: string,
    locationType: string,
    qrCodeUrl?: string
}

export interface ChangeSelectedLocation {
    (newLocId: string): void
}

export interface LocationRef {
    locationId: LocationId,
    locationName: string | null | undefined
}

export interface GetRestaurantData {
    (authToken: string): Promise<void>
}

