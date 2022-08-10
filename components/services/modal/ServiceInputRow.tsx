import {ServiceOrderItemFieldInput, TimeFieldInput} from "../../../interfaces/service";
import getTimeInputValue from "../../../utils/services/getTimeInputValue";
import {Text, View} from "react-native";
import {coloursConstants} from "../../../constants/colours";
import * as React from "react";
import {useTheme} from "react-native-paper";

interface ServiceInputRowProps {
    serviceOrderItemFieldInput: ServiceOrderItemFieldInput
}


export default function ServiceInputRow({serviceOrderItemFieldInput}: ServiceInputRowProps) {
    const {colors} = useTheme();
    const fieldValue = serviceOrderItemFieldInput.fieldType === 'timeSelect'
        ? getTimeInputValue(serviceOrderItemFieldInput.fieldInput as TimeFieldInput)
        : serviceOrderItemFieldInput.fieldInput;

    return (
        <View
            style={{
                backgroundColor: coloursConstants.cardBackgroundColorLight.hex,
                borderRadius: 10,
                padding: 5,
                margin: 5
            }}
        >
            <View
                style={{
                    borderBottomColor: coloursConstants.disabledColor.hex,
                    borderBottomWidth: 1,
                    width: '100%',
                    margin: 5
                }}
            />

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 15,
                        fontWeight: '500',
                    }}
                >
                    {serviceOrderItemFieldInput.fieldId}:
                </Text>

                <Text
                    style={{
                        color: colors.text,
                        fontSize: 15,
                        fontWeight: '400',
                    }}
                >
                    {fieldValue}
                </Text>
            </View>
        </View>
    )
}
