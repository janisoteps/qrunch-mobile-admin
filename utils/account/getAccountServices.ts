import {ServiceCategory, ServiceItem} from "../../interfaces/service";
import Constants from "expo-constants";
import axios from "axios";

export interface GetAccountServices {
    (
        accountId: string
    ): Promise<{
        success: boolean,
        error: null | string,
        serviceCats: ServiceCategory[] | null,
        serviceItems: ServiceItem[] | null
    }>
}

const getAccountServices: GetAccountServices = async (accountId) => {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/restaurant_services?id=${accountId}`
            : null;

        if (requestUrl) {
            const servicesRes = await axios.get( requestUrl );

            if (servicesRes && !!servicesRes.data && !!servicesRes.data.serviceCats) {
                return {
                    success: true,
                    error: null,
                    serviceCats: servicesRes.data.serviceCats,
                    serviceItems: servicesRes.data.serviceItems
                }
            } else {
                return {
                    success: false,
                    error: `${servicesRes.status}`,
                    serviceCats: null,
                    serviceItems: null
                }
            }
        } else {
            return {
                success: false,
                error: 'Invalid request URL',
                serviceCats: null,
                serviceItems: null
            }
        }
    } catch (e) {
        console.log(`getAccountServices ${e}`);

        return {
            success: false,
            error: `${e}`,
            serviceCats: null,
            serviceItems: null
        }
    }
};

export default getAccountServices;
