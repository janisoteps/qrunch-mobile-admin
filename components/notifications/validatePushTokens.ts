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

    console.log('validatePushTokens  ------  existingUserToken')
    console.log(existingUserToken)

    console.log('validatePushTokens  ------  pushToken')
    console.log(pushToken)

    console.log('validatePushTokens  ------  userEmail')
    console.log(userEmail)

    console.log('validatePushTokens  ------  restaurantId')
    console.log(restaurantId)

    console.log(' = = = = = = = = = = = = = = = = = = = ');

    if (!existingUserToken) {
        console.log('STORING NEW TOKEN - existing not found')
        await storePushToken(authToken, pushToken, restaurantId);
    } else {
        if (existingUserToken?.userEmail !== userEmail) {
            console.log('STORING NEW TOKEN DIFF EMAIL')
            await storePushToken(authToken, pushToken, restaurantId);
        } else {
            if (existingUserToken?.expoPushToken !== pushToken) {
                console.log('STORING NEW TOKEN DIFF TOKEN')
                await storePushToken(authToken, pushToken, restaurantId);
            } else {
                console.log('NOT STORING')
            }
        }
    }
}

export default validatePushTokens;
