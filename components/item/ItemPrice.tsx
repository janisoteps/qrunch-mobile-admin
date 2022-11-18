import {ItemVariationRef, MenuItem} from "../../interfaces/item";
import {useTheme} from "react-native-paper";
import {useContext} from "react";
import SettingsContext from "../settings/settingsContext";
import {View, Text} from "react-native";

interface ItemPrice{
    singleItemData: MenuItem,
    shownVariation: ItemVariationRef | null
}


export default function ItemPrice({singleItemData, shownVariation}: ItemPrice) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);

    let itemBasePrice: string | null = singleItemData.price
        ? singleItemData.price.toFixed(2) : null;

    if (!itemBasePrice && singleItemData.variations && singleItemData.variations.length > 0) {
        if (singleItemData.variations.length === 1) {
            itemBasePrice = singleItemData.variations[0].price.toFixed(2);
        } else {
            const fromPrice = singleItemData.variations[0].price;
            const toPrice = singleItemData.variations[singleItemData.variations.length - 1].price;
            itemBasePrice = `${fromPrice.toFixed(2)} - ${toPrice.toFixed(2)}`;
        }
    }

    if (shownVariation) {
        itemBasePrice = shownVariation.price.toFixed(2);
    }

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
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {shownVariation && (
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'right',
                            fontSize: 15,
                            fontWeight: '500'
                        }}
                    >
                        Variation: {shownVariation.name}
                    </Text>
                )}

                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'right',
                        fontSize: 15,
                        fontWeight: '500'
                    }}
                >
                    {settingsContext.currencySymbol}{itemBasePrice}
                </Text>
            </View>
        </View>
    )
}
