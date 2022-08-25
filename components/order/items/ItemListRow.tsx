import React from "react";
import ItemCount from "./ItemCount";
import ItemNameVariationOptions from "./ItemNameVariationOptions";
import PriceTotals from "./PriceTotals";
import {MenuItem, OrderItem} from "../../../interfaces/item";
import {View} from "react-native";
import ItemImage from "./ItemImage";


interface ItemListRowProps {
    orderItemDict: OrderItem,
    itemDataList: MenuItem[] | null,
    isMobile: boolean | undefined
}


export default function ItemListRow(props: ItemListRowProps) {

    if (!props.itemDataList) {
        return null
    } else {
        const singleItemData = props.itemDataList.filter(itemDict => {return itemDict}).find(itemDict => {
            return itemDict._id === props.orderItemDict.itemId
        });

        if (singleItemData) {

            return (
                <View
                    style={{
                        backgroundColor: 'white',
                        margin: 5,
                        marginLeft: 2,
                        padding: 5,
                        borderRadius: 10,
                        shadowColor: '#171717',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        width: '95%'
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,0)',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: props.isMobile ? 5 : 0
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <ItemCount
                                orderItemCount={props.orderItemDict.count}
                            />

                            <ItemImage
                                singleItemData={singleItemData}
                            />
                        </View>

                        <ItemNameVariationOptions
                            singleItemData={singleItemData}
                            orderItemDict={props.orderItemDict}
                        />
                        {!props.isMobile && (
                            <PriceTotals
                                singleItemData={singleItemData}
                                orderItemDict={props.orderItemDict}
                            />
                        )}
                    </View>

                    {props.isMobile && (
                        <PriceTotals
                            singleItemData={singleItemData}
                            orderItemDict={props.orderItemDict}
                        />
                    )}
                </View>
            )
        } else {
            return null
        }

    }
}
