import Constants from "expo-constants";
import axios from "axios";
import baseHeaders from "../../constants/requestHeaders";


export default async function getOrderDict(orderId: string) {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/get_order_dict?id=${orderId}` : null;

        if (requestUrl) {
            const orderDataRes = await axios.get(
                requestUrl,
                {
                    headers: baseHeaders
                }
            );

            if (orderDataRes && orderDataRes.data) {
                return orderDataRes.data.orderResult
            } else {
                return null
            }
        } else {
            return null
        }
    } catch (e) {
        console.log(`getOrderDict ${e}`);

        return null
    }
}
