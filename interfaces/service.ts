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

export interface TimeFieldInput {
    isAsap: boolean,
    selectedTime: string | null
}

export type ServiceOrderItemFieldInputValue = string | number | boolean | TimeFieldInput;

export interface ServiceOrderItemFieldInput {
    fieldId: string,
    fieldType: ServiceFieldType,
    fieldInput: ServiceOrderItemFieldInputValue
}

export interface ServiceOrderItem {
    itemId: string,
    priceCents: number,
    fieldInputs: ServiceOrderItemFieldInput[],
    orderItemData: ServiceItem
}

export type ServiceOrderState = 'pending' | 'accepted' | 'completed' | 'canceled';

export type PaymentMethod = 'addToRoomBill' | 'cardReader' | 'cash' | 'online';

export type PaymentStatus = 'pending' | 'complete' | 'rejected';

export interface PaymentData {
    paymentStatus: PaymentStatus,
    paymentError: null | string,
    paymentIntentId?: string
}

export type ChatMessageAuthor = 'staff' | 'guest';

export interface OrderChatMessage {
    messageText: string,
    date: Date,
    messageAuthor: ChatMessageAuthor
}

export interface ServiceOrder {
    _id?: string,
    orderId: string,
    orderNumber: number,
    orderDate: Date,
    orderDateTime: number,
    completionDate: null | Date,
    orderState: ServiceOrderState,
    serviceItem: ServiceOrderItem,
    restaurantId: string,
    locationId: string,
    guestToken: string,
    roomNumber: string,
    paymentMethod: PaymentMethod,
    paymentData: PaymentData,
    orderChat: OrderChatMessage[]
}
