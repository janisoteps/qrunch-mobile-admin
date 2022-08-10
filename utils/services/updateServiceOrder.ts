import {UpdateDict} from "../../interfaces/general";
import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";

export interface UpdateServiceOrder {
    (
        authToken: string,
        serviceOrderId: string,
        restaurantId: string,
        locationId: string,
        updateDict: UpdateDict,
        doSendSocket?: boolean
    ): Promise<{
        success: boolean,
        error: string | null
    }>
}


const updateServiceOrder: UpdateServiceOrder = async (
    authToken,
    serviceOrderId,
    restaurantId,
    locationId,
    updateDict,
    doSendSocket= true
) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_change_service_order_one_property` : null;

        if (requestUrl && !!restaurantId) {
            const updateServiceRequestRes = await axios.post(
                requestUrl,
                {
                    restaurant_id: restaurantId,
                    location_id: locationId,
                    service_order_id: serviceOrderId,
                    update_dict: updateDict,
                    do_send_socket: doSendSocket
                },
                {
                    headers: reqHeaders
                }
            );

            if (!!updateServiceRequestRes?.data?.success) {
                return {
                    success: true,
                    error: null
                }
            } else {
                return {
                    success: true,
                    error: `Status: ${updateServiceRequestRes.status}`
                }
            }
        } else {
            return {
                success: false,
                error: `Invalid URL`
            }
        }
    } catch (e) {
        console.log(`updateServiceOrder ${e}`);

        return {
            success: false,
            error: `${e}`
        }
    }
};

export default updateServiceOrder;
