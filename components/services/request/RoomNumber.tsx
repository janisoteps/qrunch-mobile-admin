import {ServiceOrder} from "../../../interfaces/service";
import {View, Text} from "react-native";
import {coloursConstants} from "../../../constants/colours";

interface RoomNumberProps {
    serviceOrder: ServiceOrder
}

export function RoomNumber({serviceOrder}:RoomNumberProps) {
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
                    backgroundColor: coloursConstants.cardBackgroundColorDark.hex,
                    borderRadius: 15,
                    padding: 10,
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color:  'white',
                        fontSize: 20,
                        fontWeight: '500'
                    }}
                >
                    {serviceOrder.roomNumber}
                </Text>
                <Text
                    style={{
                        color:  'white',
                        fontSize: 15,
                        fontWeight: '400'
                    }}
                >
                    room
                </Text>
            </View>
        </View>
    )
}
