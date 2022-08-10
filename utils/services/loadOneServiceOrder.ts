import {ServiceOrder} from "../../interfaces/service";
import Constants from "expo-constants";
import axios from "axios";

export interface LoadOneServiceOrder {
    (serviceOrderId: string): Promise<{
        success: boolean,
        error: string | null,
        serviceOrder: null | ServiceOrder
    }>
}

const loadOneServiceOrder: LoadOneServiceOrder = async (serviceOrderId) => {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/service_order?order_id=${serviceOrderId}` : null;

        if (!!requestUrl) {
            const serviceOrderResponse = await axios.get( requestUrl );

            if (!!serviceOrderResponse.data) {
                return {
                    success: true,
                    error: null,
                    serviceOrder: serviceOrderResponse.data?.orderData
                }
            } else {
                return {
                    success: false,
                    error: `Error status: ${serviceOrderResponse.status}`,
                    serviceOrder: null
                }
            }
        } else {
            return {
                success: false,
                error: `Invalid URL`,
                serviceOrder: null
            }
        }
    } catch (e) {
        console.log(`loadOneServiceOrder ${e}`);

        return {
            success: false,
            error: `${e}`,
            serviceOrder: null
        }
    }
};

export default loadOneServiceOrder;
