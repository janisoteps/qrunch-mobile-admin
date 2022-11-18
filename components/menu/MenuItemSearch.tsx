import {MenuItem} from "../../interfaces/item";
import {View} from "react-native";
import {useTheme} from "react-native-paper";
import {useEffect, useState} from "react";
import MenuSearchInputBox from "./MenuSearchInputBox";
import {ChangeItemVisibility} from "../../screens/MenuEditScreen";
import MenuSearchResults from "./MenuSearchResults";

interface MenuItemSearchProps {
    itemList: MenuItem[],
    changeItemVisibility: ChangeItemVisibility,
    refreshToken: string
}

export interface DoItemFiltering {
    (searchString: string): void
}

export default function MenuItemSearch({itemList, changeItemVisibility, refreshToken}: MenuItemSearchProps) {
    const {colors} = useTheme();
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [lastFilterString, setLastFilterString] = useState<string>('');

    useEffect(() => {
        if(!!refreshToken) {
            doItemFiltering(lastFilterString);
        }
    }, [refreshToken]);

    const doItemFiltering: DoItemFiltering = (searchString) => {
        setLastFilterString(searchString);

        if (!!searchString) {
            const filteredList = itemList.filter(itemDict => {
                if (itemDict.itemName.toLowerCase().includes(searchString.toLowerCase())) {
                    return true
                } else {
                    let foundInNameTranslations = false;
                    itemDict.nameTranslations.forEach(translateDict => {
                        if (
                            translateDict.name
                            && translateDict.name.toLowerCase().includes(searchString.toLowerCase())
                        ) {
                            foundInNameTranslations = true;
                        }
                    });
                    return foundInNameTranslations
                }
            });

            setFilteredItems(filteredList);
        } else {
            setFilteredItems([]);
        }
    };

    return (
        <View
            style={{
                backgroundColor: colors.background,
                margin: 0,
                marginTop: 80,
                marginBottom: 0,
                alignSelf: 'stretch',
                flex: 0,
            }}
        >
            <MenuSearchInputBox doItemFiltering={doItemFiltering} />

            <MenuSearchResults filteredItems={filteredItems} changeItemVisibility={changeItemVisibility} />
        </View>
    )
}
