import {ItemVariationRef, MenuItem} from "../../interfaces/item";
import {ChangeItemVisibility} from "../../screens/MenuEditScreen";
import {View} from "react-native";
import {useContext} from "react";
import SettingsContext from "../settings/settingsContext";
import ItemImage from "./ItemImage";
import ItemName from "./ItemName";
import ItemPrice from "./ItemPrice";
import ItemVisibilitySwitch from "./ItemVisibilitySwitch";

interface ItemRowProps {
    itemData: MenuItem | null | undefined,
    shownVariation: ItemVariationRef | null,
    showPosInfo: boolean,
    showVisibility: boolean,
    changeItemVisibility: ChangeItemVisibility | null,
    categoryId: string
}

export default function ItemRow(
    {itemData, shownVariation, showPosInfo, showVisibility, changeItemVisibility, categoryId}: ItemRowProps
) {
    const settingsContext = useContext(SettingsContext);

    if (itemData) {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: settingsContext.isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    margin: 5,
                    padding: 5,
                    borderRadius: 10,
                    shadowColor: '#171717',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ItemImage
                        singleItemData={itemData}
                        imageDims={{
                            height: 80,
                            width: 80
                        }}
                    />

                    <ItemName
                        singleItemData={itemData}
                        showPosInfo={showPosInfo}
                        isMobile={!!settingsContext.isMobile}
                    />

                    <ItemPrice
                        singleItemData={itemData}
                        shownVariation={shownVariation}
                    />
                </View>

                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(255,255,255,0)'
                        }}
                    >
                        <ItemVisibilitySwitch
                            singleItemData={itemData}
                            showVisibility={showVisibility}
                            changeItemVisibility={changeItemVisibility}
                            isMobile={!!settingsContext.isMobile}
                            isVisible={'published' in itemData ? itemData.published === true : true}
                        />
                    </View>
                </View>
            </View>
        )
    } else {
        return null
    }
}
