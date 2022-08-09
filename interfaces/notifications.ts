import {QrunchUser} from "./qrunchUser";

export interface ReValidatePushToken {
    (
        userData: QrunchUser | null,
        authToken: string | null,
        usedRestaurantId: string | null,
    ): void
}

export interface PushTokenDict {
    userEmail: string,
    restaurantId: string,
    expoPushToken: string
}

export interface ValidatePushTokens {
    (
        authToken: string,
        userId: string,
        restaurantId: string,
        pushToken: string
    ): Promise<void>
}

