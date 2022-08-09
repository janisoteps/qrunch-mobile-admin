import {ItemPosData, NameTranslation} from "./item";

export interface OptionVariant {
    [index: string]: string | number,
    price: number
}

export interface OptionDictInner {
    [index: string]: OptionVariant
}

export interface OptionNameTranslation {
    language: string,
    name: string
}

export interface OptionData {
    nameList: OptionNameTranslation[],
    optionsDict: OptionDictInner
}

export interface OptionVariationPosConfig {
    optionDictId: string,
    name: string,
    price: number,
    itemPosData: ItemPosData
}

export type OptionPosList = OptionVariationPosConfig[];

export interface OptionVariation {
    extRefId: string,
    itemPosData: ItemPosData,
    nameTranslations: NameTranslation[],
    priceCents: number,
    qrunchId: string
}

export interface Option {
    _id: any,
    optionsType: string,
    optionsDict?: OptionData,
    options: OptionVariation[],
    restaurantId: string,
    createdDate: number,
    isDeleted: boolean,
    deletedDate: number | null,
    idName: string,
    optionsPosList: OptionPosList
}

export interface PosOption {
    id: string,
    name: string,
    price: number,
    count: number,
    uuid?: string,
}
