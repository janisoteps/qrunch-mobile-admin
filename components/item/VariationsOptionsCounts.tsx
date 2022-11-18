import {MenuItem} from "../../interfaces/item";
import {View, Text} from "react-native";
import {useTheme, Divider} from "react-native-paper";

interface VariationsOptionsCountsProps {
    singleItemData: MenuItem,
    showPosInfo: boolean
}


export default function VariationsOptionsCounts(
    {singleItemData, showPosInfo}: VariationsOptionsCountsProps
) {
    const { colors } = useTheme();

    let variationsCount = 0;
    if (singleItemData.variations && singleItemData.variations.length > 0) {
        variationsCount = singleItemData.variations.length;
    }
    let optionsCount = 0;
    if (singleItemData.itemOptions && singleItemData.itemOptions.length > 0) {
        optionsCount = singleItemData.itemOptions.length
    }

    if ((optionsCount > 0 || variationsCount > 0) && showPosInfo) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: 5
                }}
            >
                <Divider
                    style={{
                        margin: 3,
                        backgroundColor: 'rgb(180,180,180)'
                    }}
                />
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
                        {optionsCount} options,
                    </Text>

                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'left',
                            fontSize: 15,
                            fontWeight: '500',
                            marginRight: 5
                        }}
                    >
                        {variationsCount} variations
                    </Text>
                </View>
            </View>
        )
    } else {
        return null
    }
}
