import Constants from "expo-constants";
import axios from "axios";
import {PushTokenDict} from "../../interfaces/notifications";
import baseHeaders from "../../constants/requestHeaders";

export interface GetStoredUserToken {
    (authToken: string, restaurantId: string): Promise<PushTokenDict>
}

const getStoredUserToken: GetStoredUserToken = async (authToken, restaurantId) => {
    try {
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

            if (!!tokenRes && !!tokenRes.data && !!tokenRes.data.userTokenDoc) {
                return tokenRes.data.userTokenDoc
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (e) {
        console.log(`getStoredUserToken ${e}`)

        return null
    }
};

export default getStoredUserToken;
