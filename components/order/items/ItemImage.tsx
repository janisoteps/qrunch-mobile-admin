import {Image, View, Text} from "react-native";
import React from "react";
import {MenuItem} from "../../../interfaces/item";

interface ItemImageProps {
    singleItemData: MenuItem,
    imageDims?: {
        height: number,
        width: number
    }
}


export default function ItemImage(props: ItemImageProps) {
    const thumbUrl = props.singleItemData.menuImgUrl || props.singleItemData.headerImgUrl;

    const thumbElement = thumbUrl ?
        <Image
            source={{
                uri: thumbUrl
            }}
            style={{
                width: props.imageDims ? props.imageDims.width : 60,
                height: props.imageDims ? props.imageDims.height : 60,
                borderRadius: 10
            }}
        /> :
        <View
            style={{
                backgroundColor: 'rgb(200,200,200)',
                width: props.imageDims ? props.imageDims.width : 60,
                height: props.imageDims ? props.imageDims.height : 60,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: '500'
                }}
            >
                No Image
            </Text>
        </View>;

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 10,
                marginLeft: 5
            }}
        >
            {thumbElement}
        </View>
    )
}
