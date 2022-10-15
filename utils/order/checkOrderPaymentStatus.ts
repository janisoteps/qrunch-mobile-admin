import {Order} from "../../interfaces/order";
import getOrderPaymentIntent from "./getOrderPaymentIntent";
import updateOneOrderProperty from "./updateOneOrderProperty";

export interface CheckOrderPaymentStatus {
    (
        orderData: Order,
        authToken: string
    ): Promise<{
        success: boolean,
        error: string | null,
        statusChanged: boolean
    }>
}

const checkOrderPaymentStatus: CheckOrderPaymentStatus = async (orderData, authToken) => {
    try {
        if (!!orderData?.paymentIntentId && !orderData.paymentCompleted) {
            const orderPaymentIntentRes = await getOrderPaymentIntent(
                orderData.restaurantId, orderData.paymentIntentId, authToken
            );

            if (orderPaymentIntentRes.success && !!orderPaymentIntentRes?.paymentIntentData?.status) {
                if (orderPaymentIntentRes.paymentIntentData.status === 'succeeded') {
                    const orderUpdateRes = await updateOneOrderProperty(
                        authToken,
                        orderData.restaurantId,
                        orderData._id,
                        'paymentCompleted',
                        true
                    );

                    if (orderUpdateRes) {
                        return {
                            success: true,
                            error: null,
                            statusChanged: true
                        }
                    } else {
                        return {
                            success: false,
                            error: 'Order update failed',
                            statusChanged: false
                        }
                    }

                } else {
                    return {
                        success: false,
                        error: 'Order update failed',
                        statusChanged: false
                    }
                }
            } else {
                return {
                    success: false,
                    error: orderPaymentIntentRes.error,
                    statusChanged: false
                }
            }
        } else {
            return {
                success: true,
                error: null,
                statusChanged: false
            }
        }
    } catch (e) {
        console.log(`checkOrderPaymentStatus: ${e}`);

        return {
            success: false,
            error: `${e}`,
            statusChanged: false
        }
    }
};

export default checkOrderPaymentStatus;
