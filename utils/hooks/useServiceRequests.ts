import {LocationId, RestaurantSettings} from "../../interfaces/appSettings";
import {QrunchUser} from "../../interfaces/qrunchUser";
import {ServiceOrder, ServiceOrderState} from "../../interfaces/service";
import {useEffect, useState} from "react";
import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";
import filterUserServiceRequests from "../services/filterUserServiceRequests";
import updateServiceOrder from "../services/updateServiceOrder";

export interface ReloadServiceRequests {
    (
        openOrdersOnly?: boolean,
        limit?: number
    ): void
}

export interface LoadServiceRequests {
    (
        openOrdersOnly?: boolean,
        limit?: number
    ): void
}

export interface ChangeServiceRequestStatus {
    (
        newStatus: ServiceOrderState,
        serviceOrderId: string,
        locationId: LocationId
    ): void
}

export interface UseServiceRequests {
    (
        authToken: string | null | undefined,
        restaurantData: RestaurantSettings | null | undefined,
        userData: QrunchUser | null | undefined,
    ): {
        serviceRequests: ServiceOrder[],
        loadServiceRequests: LoadServiceRequests,
        reloadServiceRequests: ReloadServiceRequests,
        changeServiceRequestStatus: ChangeServiceRequestStatus,
        saveSuccess: boolean
    }
}


const useServiceRequests: UseServiceRequests = (
    authToken, restaurantData, userData
) => {
    const [serviceRequests, setServiceRequests] = useState<ServiceOrder[]>([]);
    const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (!!authToken && !!restaurantData && !!userData) {
            loadServiceRequests();
        }
    }, [authToken, !!restaurantData, !!userData])

    const reloadServiceRequests: ReloadServiceRequests = (openOrdersOnly= true, limit= 100) => {
        loadServiceRequests(openOrdersOnly, limit);
    };

    const loadServiceRequests: LoadServiceRequests = async (openOrdersOnly= true, limit= 100) => {
        const authHeader: string = `Bearer ${authToken}`;
        let reqHeaders = baseHeaders;
        reqHeaders['Authorization'] = authHeader;

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/app_get_service_orders` : null;

        if (requestUrl && !!restaurantData?._id) {
            try {
                const serviceOrdersRes = await axios.post(
                    requestUrl,
                    {
                        restaurant_id: restaurantData._id,
                        limit: limit,
                        open_orders_only: openOrdersOnly
                    },
                    {
                        headers: reqHeaders
                    }
                );

                if (!!serviceOrdersRes?.data?.serviceOrders) {
                    const filteredRequests = filterUserServiceRequests(serviceOrdersRes.data.serviceOrders, userData);

                    setServiceRequests(filteredRequests);
                }
            } catch (e) {
                console.log(`loadServiceRequests ${e}`);
            }
        }
    };

    const changeServiceRequestStatus: ChangeServiceRequestStatus = (
        newStatus, serviceOrderId, locationId
    ) => {
        if (!!authToken && !!restaurantData?._id) {
            updateServiceOrder(
                authToken,
                serviceOrderId,
                restaurantData._id,
                locationId,
                {
                    key: 'orderState',
                    newValue: newStatus
                }
            ).then(updateResult => {
                if (updateResult.success) {
                    setSaveSuccess(true);
                    reloadServiceRequests();

                    setTimeout(() => {
                        setSaveSuccess(false);
                    }, 2000)
                }
            })
        }
    };

    return {
        serviceRequests,
        loadServiceRequests,
        reloadServiceRequests,
        changeServiceRequestStatus,
        saveSuccess
    }
};

export default useServiceRequests;
