import {LocationRef} from "./appSettings";
import {ServiceRef} from "./service";

export interface QrunchUser {
    _id: any,
    userName: string,
    userEmail: string,
    createdDate: number,
    type: string,
    restaurants: string[],
    profile?: UserProfile | null,
    userFireBaseData?: UserFireBaseData,
    appUserOrderLocations?: AppUserOrderLocations,
    appUserServiceLocations?: AppUserServiceLocations,
    appUserServiceCategories?: AppUserServiceCategories,
    userDisabled?: boolean
}

export type AppUserOrderLocations = LocationRef[];

export type AppUserServiceLocations = LocationRef[];

export type AppUserServiceCategories = ServiceRef[];

export interface UserFireBaseData {
    uid: string,
    createdDate: Date,
    isActive: boolean
}

export interface UserProfile {
    firstName: string | null,
    surname: string | null,
    countryCode: string | null,
    phoneNumber: string | null,
    country: string | null,
    city: string | null,
    street: string | null,
    houseNumber: string | null,
    addressMore: string | null,
    postCode: string | null
}

export interface GetUserData {
    (token: string): Promise<void>
}

export interface GetUserRestaurants {
    (ids: string[]): Promise<void>
}
