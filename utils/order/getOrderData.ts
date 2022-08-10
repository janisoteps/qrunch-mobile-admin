import Constants from "expo-constants";
import axios from "axios";
import baseHeaders from "../../constants/requestHeaders";


export default async function getOrderData(orderId: string) {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/get_order?id=${orderId}` : null;

        if (requestUrl) {
            const orderDataRes = await axios.get(
                requestUrl,
                {
                    headers: baseHeaders
                }
            );

            if (orderDataRes && orderDataRes.data) {

                const campaignData = orderDataRes.data.orderResult.campaignId
                    ? await getOrderCampaign(orderDataRes.data.orderResult.campaignId) : null;

                return {
                    orderData: orderDataRes.data.orderResult,
                    itemData: orderDataRes.data.itemData,
                    optionsData: orderDataRes.data.optionsData,
                    campaignData: campaignData
                }

            } else {
                return null
            }

        } else {
            return null
        }
    } catch (e) {
        console.log(`getOrderData: ${e}`);

        return null
    }
}


async function getOrderCampaign(campaignId: string) {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/campaign?id=${campaignId}` : null;

        if (requestUrl) {
            const campaignDataRes = await axios.get(
                requestUrl,
                {
                    headers: baseHeaders
                }
            );

            return (campaignDataRes && campaignDataRes.data) ? campaignDataRes.data : null
        } else {
            return null
        }
    } catch (e) {
        console.log(`getOrderCampaign ${e}`);

        return null
    }
}
