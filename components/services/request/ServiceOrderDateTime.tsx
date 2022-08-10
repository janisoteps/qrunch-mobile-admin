import {ServiceOrder} from "../../../interfaces/service";
import {Text, View} from "react-native";
import {coloursConstants} from "../../../constants/colours";

interface ServiceOrderDateTimeProps {
    serviceOrder: ServiceOrder
}

export default function ServiceOrderDateTime({serviceOrder}: ServiceOrderDateTimeProps) {
    const orderDate = new Date(serviceOrder.orderDate);
    const orderDateString = orderDate.toLocaleDateString([], {month: "short", day: "numeric"});
    const orderTime = orderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

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
                    padding: 10,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color:  coloursConstants.cardBackgroundColorDark.hex,
                        fontSize: 15,
                        fontWeight: '500'
                    }}
                >
                    {orderDateString}
                </Text>
                <Text
                    style={{
                        color:  coloursConstants.cardBackgroundColorDark.hex,
                        fontSize: 20,
                        fontWeight: '500'
                    }}
                >
                    {orderTime}
                </Text>
            </View>
        </View>
    )
}
