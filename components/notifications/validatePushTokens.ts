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
        // STORING NEW TOKEN - existing not found
        await storePushToken(authToken, pushToken, restaurantId);
    } else {
        if (existingUserToken?.userEmail !== userEmail) {
            // STORING NEW TOKEN DIFF EMAIL
            await storePushToken(authToken, pushToken, restaurantId);
        } else {
            if (existingUserToken?.expoPushToken !== pushToken) {
                // STORING NEW TOKEN DIFF TOKEN
                await storePushToken(authToken, pushToken, restaurantId);
            }
            //'NOT STORING
        }
    }
}

export default validatePushTokens;
