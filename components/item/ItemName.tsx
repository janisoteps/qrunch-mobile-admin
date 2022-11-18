import {MenuItem} from "../../interfaces/item";
import {useTheme} from "react-native-paper";
import {View, Text} from "react-native";
import VariationsOptionsCounts from "./VariationsOptionsCounts";

interface ItemName{
    singleItemData: MenuItem,
    showPosInfo: boolean,
    isMobile: boolean
}

export default function ItemName({singleItemData, showPosInfo, isMobile}: ItemName) {
    const { colors } = useTheme();

    const itemNameDict = singleItemData.nameTranslations[0];
    let itemName = itemNameDict ? itemNameDict.name : 'No Name';
    const charLimit = isMobile ? 20 : 40;
    if (itemName.length > charLimit) {
        itemName = `${itemName.substring(0, charLimit)}...`;
    }
    const isPosConnected = singleItemData
        && singleItemData.itemPosData
        && singleItemData.itemPosData.itemId;

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
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginRight: 5
                }}
            >
                {isPosConnected && (
                    <View
                        style={{
                            backgroundColor: 'rgba(80,20,169,0.9)',
                            borderRadius: 5,
                            padding: 2,
                            paddingLeft: 4,
                            paddingRight: 4,
                            margin: 3,
                            alignContent: 'flex-end'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: '300',
                                color: 'rgb(255,255,255)',
                                flex: 1
                            }}
                        >
                            POS
                        </Text>
                    </View>
                )}

                <View
                    style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
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
                </View>

            </View>

            <VariationsOptionsCounts
                singleItemData={singleItemData}
                showPosInfo={showPosInfo}
            />
        </View>
    )
}
