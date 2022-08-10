import {coloursConstants} from "../../../constants/colours";
import {View} from "react-native";
import ServiceInputRow from "./ServiceInputRow";
import {ServiceOrder} from "../../../interfaces/service";

interface ServiceInputsProps {
    serviceOrder: ServiceOrder
}

export default function ServiceInputs({serviceOrder}: ServiceInputsProps) {
    if (
        !!serviceOrder?.serviceItem?.fieldInputs
        && Array.isArray(serviceOrder?.serviceItem?.fieldInputs)
        && serviceOrder?.serviceItem?.fieldInputs.length > 0
    ) {
        return (
            <View
                style={{
                    backgroundColor: coloursConstants.cardBackgroundColorLight.hex,
                    borderRadius: 10,
                    padding: 15,
                    margin: 5
                }}
            >
                {serviceOrder.serviceItem.fieldInputs.map(fieldInput => {
                    return (
                        <ServiceInputRow
                            key={fieldInput.fieldId}
                            serviceOrderItemFieldInput={fieldInput}
                        />
                    )
                })}
            </View>
        )
    } else {
        return null
    }
}
