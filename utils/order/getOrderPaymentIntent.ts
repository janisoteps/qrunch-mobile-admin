import Constants from "expo-constants";
import axios from "axios";
import baseHeaders from "../../constants/requestHeaders";

export interface PaymentIntent {
    status: string
}

export interface GetOrderPaymentIntent {
    (
        restaurantId: string,
        paymentIntentId: string,
        authToken: string
    ): Promise<{
        success: boolean,
        error: null | string,
        paymentIntentData: PaymentIntent | null
    }>
}

const getOrderPaymentIntent: GetOrderPaymentIntent = async (
    restaurantId, paymentIntentId, authToken
) => {
    try {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_get_payment_intent` : null;

        if (requestUrl) {
            const paymentIntentRes = await axios.post(
                requestUrl,
                {
                    restaurant_id: restaurantId,
                    payment_intent_id: paymentIntentId,
                },
                {
                    headers: reqHeaders
                }
            );

            if (!paymentIntentRes.data.success) {

                return {
                    success: false,
                    error: paymentIntentRes.data.error,
                    paymentIntentData: null
                }
            } else {
                return {
                    success: paymentIntentRes.data.success,
                    error: paymentIntentRes.data.error,
                    paymentIntentData: paymentIntentRes.data.paymentIntent
                }
            }

        } else {
            return {
                success: false,
                error: `Missing API URL`,
                paymentIntentData: null
            }
        }

    } catch (e) {
        console.log(e);

        return {
            success: false,
            error: `${e}`,
            paymentIntentData: null
        }
    }
};

export default getOrderPaymentIntent;
