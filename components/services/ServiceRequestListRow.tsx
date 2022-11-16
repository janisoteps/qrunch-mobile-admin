import {TouchableOpacity, View} from "react-native";
import {RoomNumber} from "./request/RoomNumber";
import {ServiceOrder} from "../../interfaces/service";
import {ServiceItemName} from "./request/ServiceItemName";
import ServiceOrderDateTime from "./request/ServiceOrderDateTime";
import ServiceRequestedTime from "./request/ServiceRequestedTime";
import RequestState from "./request/RequestState";
import React, {useContext} from "react";
import SettingsContext from "../settings/settingsContext";
import NotifContext from "../notifications/notifContext";

interface ServiceRequestListRowProps {
    serviceOrder: ServiceOrder,
    setModalServiceRequestData: React.Dispatch<ServiceOrder | null>,
}


export default function ServiceRequestListRow(
    {serviceOrder, setModalServiceRequestData}: ServiceRequestListRowProps
) {
    const settingsContext = useContext(SettingsContext);
    const notifContext = useContext(NotifContext);

    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 20,
                margin: 15,
                shadowColor: '#171717',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 3,
                display: 'flex',
                flexDirection: settingsContext.isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
            }}
            onPress={() => {
                if (notifContext.setShowNewServiceReq) {
                    notifContext.setShowNewServiceReq(false);
                }
                setModalServiceRequestData(serviceOrder);
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <RoomNumber serviceOrder={serviceOrder} />

                <ServiceItemName serviceOrder={serviceOrder} />

                <ServiceOrderDateTime serviceOrder={serviceOrder} />
            </View>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: settingsContext.isMobile ? 10 : 0
                }}
            >
                <ServiceRequestedTime serviceOrder={serviceOrder} />

                <RequestState serviceOrder={serviceOrder} />
            </View>
        </TouchableOpacity>
    )
}
