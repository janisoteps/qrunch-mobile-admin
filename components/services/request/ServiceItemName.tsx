import {ServiceOrder} from "../../../interfaces/service";
import {coloursConstants} from "../../../constants/colours";
import {Text, View} from "react-native";

interface ServiceItemNameProps {
    serviceOrder: ServiceOrder
}

export function ServiceItemName({serviceOrder}:ServiceItemNameProps) {
    const serviceItemName = serviceOrder?.serviceItem?.orderItemData?.nameTranslations[0]?.name;

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
                }}
            >
                <Text
                    style={{
                        color:  coloursConstants.cardBackgroundColorDark.hex,
                        fontSize: 20,
                        fontWeight: '500'
                    }}
                >
                    {serviceItemName}
                </Text>
            </View>
        </View>
    )
}
