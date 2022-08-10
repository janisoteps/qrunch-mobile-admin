import {ServiceOrder} from "../../../interfaces/service";
import {coloursConstants} from "../../../constants/colours";
import {View, Text} from "react-native";

interface RequestStateProps {
    serviceOrder: ServiceOrder
}

export default function RequestState({serviceOrder}: RequestStateProps) {
    const stateColour = serviceOrder.orderState === 'pending'
        ? coloursConstants.errorColor.hex : serviceOrder.orderState === 'completed'
            ? coloursConstants.successColor.hex : coloursConstants.primaryColor.hex;

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 10
            }}
        >
            <View
                style={{
                    backgroundColor: stateColour,
                    padding: 20,
                    borderRadius: 20,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: '500',
                    }}
                >
                    {serviceOrder.orderState}
                </Text>
            </View>
        </View>
    )
}
