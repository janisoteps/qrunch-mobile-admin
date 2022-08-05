// import {StorePushToken} from "./interfaces/notifications";
// import baseHeaders from "../../constants/baseHeaders";
import Constants from "expo-constants";
import axios from "axios";
import baseHeaders from "../../constants/requestHeaders";

export interface StorePushToken {
    (authToken: string, pushToken: string, restaurantId: string, locationId: string): Promise<boolean>
}

const storePushToken: StorePushToken = async (authToken, pushToken, restaurantId, locationId) => {
    const authHeader: string = `Bearer ${authToken}`;
    let reqHeaders = baseHeaders;
    reqHeaders['Authorization'] = authHeader;

    const requestUrl = (Constants.manifest && Constants.manifest.extra)
        ? `${Constants.manifest.extra.qrunchApi}/api/app_update_user_push_token_v2` : null;

    try {
        if (requestUrl) {
            const tokenUpdateRes = await axios.post(
                requestUrl,
                {
                    restaurant_id: restaurantId,
                    location_id: locationId,
                    push_token: pushToken
                },
                {
                    headers: reqHeaders
                }
            );

            if (!tokenUpdateRes.data.success) {
                console.log(tokenUpdateRes.data);
            }

            return tokenUpdateRes.data && tokenUpdateRes.data.success
        } else {
            return false
        }

    } catch (e) {
        console.log(e);

        return false
    }
};

export default storePushToken;
