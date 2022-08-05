import Constants from "expo-constants";
import axios from "axios";
import {PushTokenDict} from "../../interfaces/notifications";

export interface GetStoredUserTokens {
    (userId: string, restaurantId: string): Promise<PushTokenDict[]>
}

const getStoredUserTokens: GetStoredUserTokens = async (userId, restaurantId) => {
    const requestUrl = (Constants.manifest && Constants.manifest.extra)
        ? `${Constants.manifest.extra.qrunchApi}/api/app_user_tokens?user_id=${userId}&restaurant_id=${restaurantId}`
        : null;

    if (requestUrl) {
        const tokenRes = await axios.get( requestUrl );

        if (tokenRes && tokenRes.data && tokenRes.data.userTokens) {
            return tokenRes.data.userTokens
        } else {
            return []
        }
    } else {
        return []
    }
};

export default getStoredUserTokens;
