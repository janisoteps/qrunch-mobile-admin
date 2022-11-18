import {MenuItem} from "../../interfaces/item";
import {View, Text, Image} from "react-native";

interface ItemImageProps {
    singleItemData: MenuItem,
    imageDims?: {
        height: number,
        width: number
    }
}

export default function ItemImage(
    {singleItemData, imageDims}: ItemImageProps
) {
    const thumbUrl = singleItemData.menuImgUrl || singleItemData.headerImgUrl;

    const thumbElement = thumbUrl ?
        <Image
            source={{
                uri: thumbUrl
            }}
            style={{
                width: imageDims ? imageDims.width : 60,
                height: imageDims ? imageDims.height : 60,
                borderRadius: 10
            }}
        /> :
        <View
            style={{
                backgroundColor: 'rgb(200,200,200)',
                width: imageDims ? imageDims.width : 60,
                height: imageDims ? imageDims.height : 60,
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
