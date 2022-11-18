import {RootTabScreenProps} from "../interfaces/general";
import {useTheme} from "react-native-paper";
import {useContext, useState} from "react";
import AuthContext from "../components/auth/authContext";
import SettingsContext from "../components/settings/settingsContext";
import useRestaurantMenu from "../utils/hooks/useRestaurantMenu";
import {SafeAreaView, ScrollView} from "react-native";
import ReloadMenuButton from "../components/menu/ReloadMenuButton";
import CategoryList from "../components/category/CategoryList";
import updateItemVisibility from "../utils/item/updateItemVisibility";
import updateCategoryVisibility from "../utils/category/updateCategoryVisibility";
import MenuItemSearch from "../components/menu/MenuItemSearch";

export interface ChangeItemVisibility {
    (itemId: string, isVisible: boolean): void
}
export interface ChangeCategoryVisibility {
    (categoryId: string, isVisible: boolean): void
}

export default function MenuEditScreen({route, navigation}: RootTabScreenProps<'MenuEdit'>) {
    const {colors} = useTheme();
    const authContext = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext);

    const {
        itemList,
        catItemList,
        reloadData,
        reloadItems,
        refreshToken
    } = useRestaurantMenu(settingsContext.restaurantData);

    const changeItemVisibility: ChangeItemVisibility = (itemId, isVisible) => {
        if (authContext && authContext.authToken) {
            updateItemVisibility(authContext.authToken, itemId, isVisible).then(result => {
                if (result) {
                    reloadItems();
                }
            })
        }
    }

    const changeCategoryVisibility: ChangeCategoryVisibility = (categoryId, isVisible) => {
        if (authContext && authContext.authToken) {
            updateCategoryVisibility(authContext.authToken, categoryId, isVisible).then(result => {
                if (result) {
                    reloadData();
                }
            })
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                alignSelf: 'stretch',
                backgroundColor: colors.background
            }}
        >
            <ReloadMenuButton
                reloadData={reloadData}
                right={30}
            />

            <MenuItemSearch itemList={itemList} changeItemVisibility={changeItemVisibility} refreshToken={refreshToken} />

            <ScrollView
                style={{
                    marginTop: 0,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0,
                    paddingTop: 0,
                    borderRadius: 50
                }}
            >
                <CategoryList
                    catItemList={catItemList}
                    changeItemVisibility={changeItemVisibility}
                    changeCategoryVisibility={changeCategoryVisibility}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
