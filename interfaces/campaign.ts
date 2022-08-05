import {NameTranslation} from "./item";

export interface CampaignMechanic {
    items?: string[],
    discount?: number,
    itemId?: string,
    itemName?: string
}

export interface Campaign {
    _id: any,
    restaurantId: string,
    creatorEmail: string,
    campaignName: string,
    nameTranslations: NameTranslation[],
    campaignType: string,
    isLoyalty: boolean,
    campaignMechanic: CampaignMechanic,
    isActive: boolean,
    locations: null | string,
    qrCodeUrl: null | string,
    campaignId: string,
    itemId?: string,
    itemName?: string
}
