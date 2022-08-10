import Constants from "expo-constants";
import axios from "axios";
import baseHeaders from "../../constants/requestHeaders";

export interface UpdateOneOrderProperty {
    (
        authToken: string,
        restaurantId: string,
        orderId: string,
        settingKey: string,
        newValue: any
    ): Promise<boolean>
}


const updateOneOrderProperty: UpdateOneOrderProperty = async (
    authToken,
    restaurantId,
    orderId,
    settingKey,
    newValue
) => {
    const authHeader: string = `Bearer ${authToken}`;
    let reqHeaders = baseHeaders;
    reqHeaders['Authorization'] = authHeader;

    const requestUrl = (Constants.manifest && Constants.manifest.extra)
        ? `${Constants.manifest.extra.qrunchApi}/api/app_update_one_order_property_v2` : null;

    try {

        if (requestUrl) {
            const orderUpdateRes = await axios.post(
                requestUrl,
                {
                    restaurant_id: restaurantId,
                    order_id: orderId,
                    update_dict: {
                        key: settingKey,
                        value: newValue
                    }
                },
                {
                    headers: reqHeaders
                }
            );

            if (!orderUpdateRes.data.success) {
                console.log(orderUpdateRes.data);
            }

            return orderUpdateRes.data && orderUpdateRes.data.success
        } else {
            return false
        }

    } catch (e) {
        console.log(`updateOneOrderProperty: ${e}`);

        return false
    }
}

export default updateOneOrderProperty;
