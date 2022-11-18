import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";

export interface UpdateItemVisibility {
    (authToken: string, itemId: string, isVisible: boolean): Promise<boolean>
}


const updateItemVisibility: UpdateItemVisibility = async (authToken, itemId, isVisible) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_update_item_visibility_v2` : null;

        if (requestUrl) {
            const itemUpdateRes = await axios.post(
                requestUrl,
                {
                    item_id: itemId,
                    item_visible: isVisible
                },
                {
                    headers: reqHeaders
                }
            );

            return !!(itemUpdateRes.data && itemUpdateRes.data.success)
        } else {
            return false
        }
    } catch (e) {
        console.log(e);

        return false
    }
};

export default updateItemVisibility;
