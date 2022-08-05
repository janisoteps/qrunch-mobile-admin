export interface ItemBase {
    _id: any,
    itemName: string,
    nameTranslations: NameTranslation[],
}

export interface OrderItem extends ItemBase {
    itemId: string,
    variation: ItemVariationRef,
    options: {
        [index: string]: any
    },
    optionsDetails: {[index: string]: {
            price: number,
            optsId: string,
            _id: string
        }},
    basePrice: number,
    optionsPrice: number,
    itemDate: number,
    count: number
}

export interface MenuItem extends ItemBase {
    menuId: string,
    itemNameTranslations: NameTranslation[],
    menuImgUrl: string | null,
    headerImgUrl: string | null,
    secondaryImgUrl: string | null,
    price: number,
    priceCents: number,
    description: DescriptionTranslation[],
    ingredients: IngredientsTranslation[],
    allergies: string[],
    icons: string[],
    suggestedItems: string[],
    createdDate: number,
    isDeleted: boolean,
    deletedDate: null | number,
    itemOptions: ItemOptionRef[],
    itemTags: string[],
    restaurantId: string,
    sortNr: number,
    notForDelivery: boolean,
    hasVariations: boolean,
    variations: ItemVariationRef[],
    itemPosData: ItemPosData,
    variationsPosList: VariationsPosList,
    published?: boolean
}

export interface NameTranslation {
    name: string,
    lang: string
}

export interface DescriptionTranslation {
    description: string,
    lang: string
}

export interface IngredientsTranslation {
    ingredients: string,
    lang: string
}

export type ItemOptionRef = string | ItemOptionVariationRef;

export interface ItemOptionVariationRef {
    optionsId: string,
    variationId: null | string
}

export interface ItemVariationBase {
    name: string,
    nameTranslations: NameTranslation[]
}

export interface ItemVariationCollection extends ItemVariationBase {
    restaurantId: string,
    createdDate: number,
    isDeleted: boolean,
    deletedDate: number,
}

export interface ItemVariationRef extends ItemVariationBase {
    _id: string,
    price: number
}

export interface ItemPosData {
    uuid: string,
    itemId?: string,
    id?: string,
    posType: string,
    itemCat: string,
    itemName: string,
    searchString: string
}

export interface VariationPosData {
    _id: string,
    name: string,
    price: number,
    itemPosData: ItemPosData
}

export type VariationsPosList = VariationPosData[]

export interface UpdateItemVisibility {
    (authToken: string, itemId: string, isVisible: boolean): Promise<boolean>
}
