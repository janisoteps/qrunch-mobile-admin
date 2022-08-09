import React from "react";
import {useTheme} from "@react-navigation/native";
import ItemOptions from "./ItemOptions";
import {MenuItem, OrderItem} from "../../../interfaces/item";
import {View, Text} from "react-native";

interface ItemNameVariationProps {
    singleItemData: MenuItem,
    orderItemDict: OrderItem
}


export default function ItemNameVariationOptions(props: ItemNameVariationProps) {
    const { colors } = useTheme();
    const itemNameDict = props.singleItemData.nameTranslations[0];
    let itemName = itemNameDict ? itemNameDict.name : 'No Name';
    if (itemName.length > 40) {
        itemName = `${itemName.substring(0,40)}...`;
    }
    const variationLabelDict = props.orderItemDict.variation ? props.orderItemDict.variation.nameTranslations[0] : null;
    let variationLabel = variationLabelDict ? variationLabelDict.name : null;
    if (variationLabel && variationLabel.length > 40) {
        variationLabel = `${variationLabel.substring(0,40)}...`;
    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 5
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginRight: 5
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'left',
                        fontSize: 15,
                        fontWeight: '500',
                        marginRight: 5
                    }}
                >
                    {itemName}
                </Text>
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: '500'
                    }}
                >
                    {variationLabel}
                </Text>
            </View>

            <ItemOptions orderItemDict={props.orderItemDict} />
        </View>
    )
}
