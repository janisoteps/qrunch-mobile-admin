import getStoredUserToken from "./getStoredUserToken";
import storePushToken from "./storePushToken";

export interface ValidatePushTokens {
    (
        authToken: string,
        userEmail: string,
        restaurantId: string,
        pushToken: string
    ): Promise<void>
}

const validatePushTokens: ValidatePushTokens = async (
    authToken,
    userEmail,
    restaurantId,
    pushToken
) => {
    const existingUserToken = await getStoredUserToken(authToken, restaurantId);

    if (!existingUserToken) {
        await storePushToken(authToken, pushToken, restaurantId);
    } else {
        if (existingUserToken?.userEmail !== userEmail) {
            await storePushToken(authToken, pushToken, restaurantId);
        }
    }
}

export default validatePushTokens;
