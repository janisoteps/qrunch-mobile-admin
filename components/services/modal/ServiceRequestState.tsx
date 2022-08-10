import {ServiceOrder, ServiceOrderState} from "../../../interfaces/service";
import {useState} from "react";

interface ServiceRequestStateProps {
    serviceOrder: ServiceOrder
}

export default function ServiceRequestState(
    {serviceOrder}: ServiceRequestStateProps
) {
    const [orderState, setOrderState] = useState<ServiceOrderState>(serviceOrder.orderState);

    function handleStateChange(newState: ServiceOrderState) {
        setOrderState(newState);
    }

}
