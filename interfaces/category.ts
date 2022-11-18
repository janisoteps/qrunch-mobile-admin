import {MenuItem, NameTranslation} from "./item";

export interface HourMinute {
    hour: number,
    minute: number
}

export interface ActiveHours {
    isUsed: boolean,
    startTime: HourMinute,
    endTime: HourMinute
}

export interface Category {
    _id: string,
    nameTranslations: NameTranslation[],
    restaurantName: string,
    restaurantId: string,
    headerImgUrl: string | null,
    logoImgUrl: string | null,
    createdDate: number,
    sortNr: number,
    isDeleted: boolean,
    deletedDate: null | number,
    items: ItemCatRef[],
    menus: SubCatRef[],
    parentMenuId: null | string,
    displayType: string,
    imageItemId: null | string,
    fullScreenHeader: boolean,
    superCatId: null | string,
    extId?: null | string,
    addToOrderAllowed: boolean,
    published: boolean
}

export interface ItemCatRef {
    itemName: string,
    itemId: any,
    sortNr: number
}

export interface SubCatRef {
    name: string,
    menuId: any,
    sortNr: number
}

export interface CatItem {
    category: Category,
    items: (MenuItem | undefined)[]
}

export interface UpdateCategoryVisibility {
    (authToken: string, categoryId: string, isVisible: boolean): Promise<boolean>
}
