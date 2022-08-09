import Constants from "expo-constants";
import axios from "axios";
import {PushTokenDict} from "../../interfaces/notifications";
import baseHeaders from "../../constants/requestHeaders";

export interface GetStoredUserTokens {
    (authToken: string, restaurantId: string): Promise<PushTokenDict[]>
}

const getStoredUserTokens: GetStoredUserTokens = async (authToken, restaurantId) => {
    const authHeader: string = `Bearer ${authToken}`;
    let reqHeaders = baseHeaders;
    reqHeaders['Authorization'] = authHeader;

    const requestUrl = (Constants.manifest && Constants.manifest.extra)
        ? `${Constants.manifest.extra.qrunchApi}/api/app_user_notif_tokens_v2?restaurant_id=${restaurantId}`
        : null;

    if (requestUrl) {
        const tokenRes = await axios.get( requestUrl , {
            headers: reqHeaders
        });

        if (tokenRes && tokenRes.data && tokenRes.data.userTokens) {
            return tokenRes.data.userToken
        } else {
            return null
        }
    } else {
        return null
    }
};

export default getStoredUserTokens;
