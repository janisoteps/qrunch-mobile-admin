import {TouchableOpacity} from "react-native";
import {useTheme} from "@react-navigation/native";
import {RoomNumber} from "./request/RoomNumber";
import {ServiceOrder} from "../../interfaces/service";
import {ServiceItemName} from "./request/ServiceItemName";
import ServiceOrderDateTime from "./request/ServiceOrderDateTime";
import ServiceRequestedTime from "./request/ServiceRequestedTime";
import RequestState from "./request/RequestState";

interface ServiceRequestListRowProps {
    serviceOrder: ServiceOrder
}

export default function ServiceRequestListRow({serviceOrder}: ServiceRequestListRowProps) {

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
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <RoomNumber serviceOrder={serviceOrder} />

            <ServiceItemName serviceOrder={serviceOrder} />

            <ServiceOrderDateTime serviceOrder={serviceOrder} />

            <ServiceRequestedTime serviceOrder={serviceOrder} />

            <RequestState serviceOrder={serviceOrder} />
        </TouchableOpacity>
    )
}
