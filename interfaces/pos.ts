export interface PosAuth {
    username: string,
    password: string
}

export interface PosHeaders {
    Authorization: string,
    'Content-Type': string
}


export interface PosConfigDict {
    posType: string,
    endpoint: string,
    location: string,
    headers: PosHeaders,
    auth: PosAuth,
    extra?: ExtraPosData
}

export interface ExtraPosData {
    currencyId?: string;
    cashierCode?: string,
    stationCode?: string,
    managerId?: string,
    voidId?: string,
    deleteReason?: string,
    basePriceField?: string
}
