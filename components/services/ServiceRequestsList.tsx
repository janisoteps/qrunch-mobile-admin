import {ServiceOrder} from "../../interfaces/service";
import {View} from "react-native";
import {useTheme} from "@react-navigation/native";
import ServiceRequestListRow from "./ServiceRequestListRow";
import React from "react";

interface ServiceRequestsListProps {
    serviceRequests: ServiceOrder[],
    setModalServiceRequestData: React.Dispatch<ServiceOrder | null>,
}


export default function ServiceRequestsList(
    {serviceRequests, setModalServiceRequestData}: ServiceRequestsListProps
) {
    const { colors } = useTheme();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                margin: 0,
                marginTop: 20,
                marginBottom: 100
            }}
        >
            {serviceRequests.map(serviceRequest => {
                return (
                    <ServiceRequestListRow
                        key={serviceRequest._id}
                        serviceOrder={serviceRequest}
                        setModalServiceRequestData={setModalServiceRequestData}
                    />
                )
            })}
        </View>
    )
}
