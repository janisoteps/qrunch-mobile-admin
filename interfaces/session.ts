export interface StoreUserDataXface {
    (token: string, name: string, email: string): Promise<boolean>
}

export interface StoreSessionParameter {
    (paramKey: string, paramValue: string): Promise<boolean>
}

export interface GetUserToken {
    (): Promise<void>
}

export interface LogUserOut {
    (): Promise<boolean>
}
