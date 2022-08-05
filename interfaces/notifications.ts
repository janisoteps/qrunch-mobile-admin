import {QrunchUser} from "./qrunchUser";

export interface ReValidatePushToken {
    (
        userData: QrunchUser | null,
        authToken: string | null,
        usedRestaurantId: string | null,
        locationId: string | null
    ): void
}

export interface GetStoredUserTokens {
    (userId: string, restaurantId: string): Promise<PushTokenDict[]>
}

export interface PushTokenDict {
    userId: string,
    locationId: string,
    expoPushToken: string
}

export interface ValidatePushTokens {
    (
        authToken: string,
        userId: string,
        restaurantId: string,
        selectedLocation: string,
        pushToken: string
    ): Promise<void>
}

export interface StorePushToken {
    (authToken: string, pushToken: string, restaurantId: string, locationId: string): Promise<boolean>
}
