import {ScrollView} from "react-native";
import {useTheme} from "react-native-paper";
import {MenuItem} from "../../interfaces/item";
import ItemRow from "../item/ItemRow";
import {ChangeItemVisibility} from "../../screens/MenuEditScreen";

interface MenuSearchResultsProps {
    filteredItems: MenuItem[],
    changeItemVisibility: ChangeItemVisibility
}

export default function MenuSearchResults({filteredItems, changeItemVisibility}: MenuSearchResultsProps) {
    const {colors} = useTheme();

    if (!!filteredItems && Array.isArray(filteredItems) && filteredItems.length > 0) {
        return (
            <ScrollView
                style={{
                    marginBottom: 50,
                    marginHorizontal: 20,
                    flex: 0,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0,
                    paddingTop: 0
                }}
            >
                {filteredItems.map(itemDict => {
                    return (
                        <ItemRow
                            key={`${itemDict?._id}${Math.random()}`}
                            itemData={itemDict}
                            shownVariation={null}
                            showPosInfo={false}
                            showVisibility={true}
                            changeItemVisibility={changeItemVisibility}
                            categoryId={itemDict.menuId}
                        />
                    )
                })}
            </ScrollView>
        )
    } else {
       return null
    }
}
