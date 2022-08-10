import {Text, View} from "react-native";
import {ServiceOrder, TimeFieldInput} from "../../../interfaces/service";
import {coloursConstants} from "../../../constants/colours";

interface ServiceRequestedTimeProps {
    serviceOrder: ServiceOrder
}

export default function ServiceRequestedTime({serviceOrder}: ServiceRequestedTimeProps) {
    const timeInputField = serviceOrder?.serviceItem.fieldInputs.find(fieldInput => {
        return fieldInput.fieldType === 'timeSelect'
    });
    const isAsap = !!timeInputField ? (timeInputField.fieldInput as TimeFieldInput).isAsap : true;
    const requiredTime = isAsap ? null : (timeInputField?.fieldInput as TimeFieldInput).selectedTime;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 10
            }}
        >
            <View
                style={{
                    backgroundColor: isAsap ? coloursConstants.successColor.hex : coloursConstants.errorColor.hex,
                    padding: 20,
                    alignItems: 'center',
                    borderRadius: 20
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: '500',
                    }}
                >
                    {isAsap ? 'ASAP' : requiredTime}
                </Text>
            </View>
        </View>
    )
}
