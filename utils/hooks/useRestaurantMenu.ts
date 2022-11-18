import {RestaurantSettings} from "../../interfaces/appSettings";
import {Category, CatItem} from "../../interfaces/category";
import {MenuItem} from "../../interfaces/item";
import Constants from "expo-constants";
import {useEffect, useState} from "react";
import axios from "axios";

export interface UseRestaurantMenu {
    (restaurantData: RestaurantSettings | null | undefined): {
        categoryList: Category[],
        itemList: MenuItem[],
        catItemList: CatItem[],
        reloadData: () => void,
        reloadItems: () => void,
        refreshToken: string
    }
}

export interface GetCategoryData {
    (restaurantName: string): Promise<void>
}

export interface GetItemData {
    (restaurantId: string): Promise<void>
}


const useRestaurantMenu: UseRestaurantMenu = (restaurantData) => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [itemList, setItemList] = useState<MenuItem[]>([]);
    const [catItemList, setCatItemList] = useState<CatItem[]>([]);
    const [refreshToken, setRefreshToken] = useState<string>('');

    useEffect(() => {
        if (restaurantData && restaurantData._id && restaurantData.name) {
            getCategoryData(restaurantData.name);
            getItemData(restaurantData._id);
        }
    }, [restaurantData]);

    useEffect(() => {
        if (categoryList.length > 0 && itemList.length > 0) {
            const catItems = categoryList.map(catDict => {
                const items = catDict.items.map(itemRef => {
                    return itemList.find(itemDict => {
                        return itemDict._id === itemRef.itemId
                    });
                }).filter(itemDict => itemDict);

                return {
                    category: catDict,
                    items: items
                }
            });
            setCatItemList(catItems);
        }
    }, [categoryList.length, itemList.length, refreshToken]);

    const getCategoryData: GetCategoryData = async (restaurantName) => {
        const encodedName = encodeURIComponent(restaurantName);

        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/restaurant_menus?name=${encodedName}` : null;

        try {
            if (requestUrl) {
                const categoryDataRes = await axios.get(requestUrl);

                if (categoryDataRes.data && categoryDataRes.data.menuResults) {
                    const sortedMenuData = categoryDataRes.data.menuResults.filter((menu: null | Category) => {
                        return menu && !menu.isDeleted
                    }).sort(function(a: Category, b: Category) {
                        return a.sortNr - b.sortNr;
                    });
                    setCategoryList(sortedMenuData);
                    setRefreshToken(`${Math.random()}`);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getItemData: GetItemData = async (restaurantId) => {
        try {
            const requestUrl = (Constants.manifest && Constants.manifest.extra)
                ? `${Constants.manifest.extra.qrunchApi}/api/restaurant_items?id=${restaurantId}` : null;

            if (requestUrl) {
                const itemDataRes = await axios.get(requestUrl);

                if (itemDataRes.data && itemDataRes.data.itemResults) {
                    const sortedItems = itemDataRes.data.itemResults.sort(function(a: MenuItem, b: MenuItem) {
                        const sortNrA = a.sortNr ? a.sortNr : 0;
                        const sortNrB = b.sortNr ? b.sortNr : 0;
                        return sortNrA - sortNrB;
                    });
                    setItemList(sortedItems);
                    setRefreshToken(`${Math.random()}`);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const reloadData = () => {
        if (restaurantData && restaurantData._id && restaurantData.name) {
            getCategoryData(restaurantData.name);
            getItemData(restaurantData._id);
        }
    }

    const reloadItems = () => {
        if (restaurantData && restaurantData._id) {
            getItemData(restaurantData._id);
        }
    }

    return {
        categoryList,
        itemList,
        catItemList,
        reloadData,
        reloadItems,
        refreshToken
    }
}

export default useRestaurantMenu;
