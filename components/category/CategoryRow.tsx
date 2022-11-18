import {ChangeCategoryVisibility, ChangeItemVisibility} from "../../screens/MenuEditScreen";
import {CatItem} from "../../interfaces/category";
import {View, Text} from "react-native";
import {useContext} from "react";
import {useTheme} from "react-native-paper";
import SettingsContext from "../settings/settingsContext";
import CategoryVisibilitySwitch from "./CategoryVisibilitySwitch";
import ItemRow from "../item/ItemRow";

interface CategoryRowProps {
    catItem: CatItem,
    changeItemVisibility: ChangeItemVisibility,
    changeCategoryVisibility: ChangeCategoryVisibility
}


export default function CategoryRow(
    {catItem, changeItemVisibility, changeCategoryVisibility}: CategoryRowProps
) {
    const {colors} = useTheme();
    const settingsContext = useContext(SettingsContext);
    const catName = (
        !!catItem?.category?.nameTranslations
        && Array.isArray(catItem.category.nameTranslations)
        && !!catItem?.category?.nameTranslations[0].name
    ) ? catItem.category.nameTranslations[0].name : '';

    return (
        <View
            style={{
                backgroundColor: 'white',
                display: 'flex',
                margin: settingsContext.isMobile ? 5 : 15,
                marginBottom: 15,
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
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        textAlign: 'left',
                        fontSize: 25,
                        fontWeight: '500',
                        margin: 15
                    }}
                >
                    {catName}
                </Text>

                <CategoryVisibilitySwitch
                    categoryData={catItem.category}
                    showVisibility={true}
                    changeCategoryVisibility={changeCategoryVisibility}
                />
            </View>

            {catItem.items.map(itemDict =>
                <ItemRow
                    key={`${itemDict?._id}${Math.random()}`}
                    itemData={itemDict}
                    shownVariation={null}
                    showPosInfo={false}
                    showVisibility={true}
                    changeItemVisibility={changeItemVisibility}
                    categoryId={catItem.category._id}
                />
            )}
        </View>
    )
}
