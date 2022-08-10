import {UpdateDict} from "../../interfaces/general";
import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";

export interface UpdateUserOneSetting {
    (
        authToken: string,
        updateDict: UpdateDict
    ): Promise<{
        success: boolean,
        error: string | null
    }>
}

const updateUserOneSetting: UpdateUserOneSetting = async (authToken, updateDict) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_update_user_one_property` : null;

        if (requestUrl) {
            const userUpdateRes = await axios.post(
                requestUrl,
                {
                    update_dict: updateDict
                },
                {
                    headers: reqHeaders
                }
            );

            if (!userUpdateRes.data.success) {
                console.log(userUpdateRes.data);

                return {
                    success: false,
                    error: !!userUpdateRes?.data?.error
                        ? `${userUpdateRes?.data?.error}` : `${userUpdateRes.status}`
                }
            } else {

                return {
                    success: true,
                    error: null
                }
            }
        } else {
            return {
                success: false,
                error: 'Invalid request URL'
            }
        }
    } catch (error) {
        console.log(`updateUserOneSetting ${error}`);

        return {
            success: false,
            error: `${error}`
        }
    }
};

export default updateUserOneSetting;
