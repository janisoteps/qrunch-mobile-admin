import {LocationDict} from "../interfaces/appSettings";

interface LocationTypes {
    [index: string]: {
        typeId: string,
        typeName: string
    }
}

export const locationTypes: LocationTypes = {
    hotel: {
        typeId: 'hotel',
        typeName: 'Hotel'
    },
    restaurant: {
        typeId: 'restaurant',
        typeName: 'Restaurant'
    },
    bar: {
        typeId: 'bar',
        typeName: 'Bar'
    },
    all: {
        typeId: 'all',
        typeName: 'All'
    }
}

export const defaultLocation: LocationDict = {
    locationId: 'all',
    locationType: locationTypes.all.typeId
};
