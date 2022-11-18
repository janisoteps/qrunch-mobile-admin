import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";

export interface UpdateCategoryVisibility {
    (authToken: string, categoryId: string, isVisible: boolean): Promise<boolean>
}

const updateCategoryVisibility: UpdateCategoryVisibility = async (authToken, categoryId, isVisible) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_update_category_visibility_v2` : null;

        if (requestUrl) {
            const categoryUpdateRes = await axios.post(
                requestUrl,
                {
                    category_id: categoryId,
                    is_visible: isVisible
                },
                {
                    headers: reqHeaders
                }
            );

            return !!(categoryUpdateRes.data && categoryUpdateRes.data.success)
        } else {
            return false
        }
    } catch (e) {
        console.log(e);

        return false
    }
};

export default updateCategoryVisibility;
