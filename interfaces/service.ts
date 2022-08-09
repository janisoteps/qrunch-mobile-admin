import {DescriptionTranslation, NameTranslation} from "./item";
import {ActiveHours} from "./category";
import {LocationId, WorkDay} from "./appSettings";

export type ServiceThumbType = 'image' | 'icon';

export interface ServiceCategoryBase {
    nameTranslations: NameTranslation[],
    nameCapitalized: boolean,
    imgType: ServiceThumbType,
    imgUrl: string | null,
    iconSlug: string | null,
}

export interface ServiceCategory extends ServiceCategoryBase {
    _id: string,
    restaurantId: string,
    createdDate: Date,
    sortNr: number,
    isDeleted: boolean,
    deletedDate: null | Date,
    published: boolean,
    activeHours?: ActiveHours
}

export interface ServiceRef {
    serviceCategoryId: string,
    categoryName: NameTranslation[]
}

export type ServiceFieldType = 'timeSelect' | 'textInput' | 'quantitySelect' | 'chatLink';

export interface ServiceUserInputField {
    fieldType: ServiceFieldType,
    fieldId: string,
    nameTranslations: NameTranslation[],
    secondaryTranslations?: NameTranslation[]
}

export interface ServiceVariation {
    variationId: string,
    nameTranslations: NameTranslation[],
    priceCents: number,
}

export interface ServiceExtraOption {
    optionId: string,
    priceCents: number,
    nameTranslations: NameTranslation[],
}

export interface ServiceExtra {
    extraId: string,
    selectionType: 'single-select' | 'multi-select',
    nameTranslations: NameTranslation[],
    extraOptions: ServiceExtraOption[]
}

export type ServiceHoursType = 'locationHours' | 'customHours';

export interface ServiceHours {
    serviceHoursUsed: boolean,
    serviceHoursType: ServiceHoursType,
    locationHoursId: LocationId | null,
    customHours: WorkDay[] | null
}

export interface ServiceItemImageRef {
    imageId: string,
    imageUrl: string
}

export interface ServiceItemBase {
    viewOnly: boolean,
    nameTranslations: NameTranslation[],
    nameCapitalized: boolean,
    imgType: ServiceThumbType,
    imgUrl: string | null,
    iconSlug: string | null,
    priceCents: number,
    descriptionTranslations: DescriptionTranslation[],
    hasVariations: boolean,
    serviceVariations: ServiceVariation[],
    serviceExtras: ServiceExtra[],
    inputFields: ServiceUserInputField[]
}

export interface ServiceItem extends ServiceItemBase {
    _id: string,
    restaurantId: string,
    categoryId: string,
    createdDate: Date,
    sortNr: number,
    isDeleted: boolean,
    deletedDate: null | Date,
    published: boolean,
    serviceHours?: ServiceHours | null,
    additionalImages?: ServiceItemImageRef[]
}
