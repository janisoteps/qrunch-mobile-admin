import getStoredUserTokens from "./getStoredUserTokens";
import storePushToken from "./storePushToken";

export interface ValidatePushTokens {
    (
        authToken: string,
        userId: string,
        restaurantId: string,
        selectedLocation: string,
        pushToken: string
    ): Promise<void>
}

const validatePushTokens: ValidatePushTokens = async (
    authToken,
    userId,
    restaurantId,
    selectedLocation,
    pushToken
) => {
    const existingUserTokens = await getStoredUserTokens(userId, restaurantId);

    if (existingUserTokens && existingUserTokens.length > 0) {
        const existingDeviceToken = existingUserTokens.find(tokenDict => {
            return tokenDict.expoPushToken === pushToken
        });

        if (!existingDeviceToken || existingDeviceToken.locationId !== selectedLocation) {
            await storePushToken(authToken, pushToken, restaurantId, selectedLocation);
        }
    } else {
        await storePushToken(authToken, pushToken, restaurantId, selectedLocation);
    }
}

export default validatePushTokens;
