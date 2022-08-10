import {LocationDict} from "./appSettings";
import {OrderState} from "../constants/order";
import {OrderItem} from "./item";
import {Campaign} from "./campaign";

export interface Order {
    _id: any,
    sessionToken: string,
    creationDate: 'integer',
    dateTime: 'Date',
    restaurantId: string,
    restaurantName: string,
    restaurantLocation: LocationDict,
    locationType: string,
    tableId: string,
    taboomNr: string,
    tableIdType: string,
    tableName: string,
    order: OrderItem[],
    notification: {
        id: string,
        type: string,
        isNew: boolean
    },
    userId: string,
    orderType: string,
    orderState: string,
    comment: string,
    completionDate: string,
    completionTime: string,
    eta: Date,
    deliveryAddress: any,
    netTotal: number,
    orderTotal: number,
    gratuityFee: number,
    serviceFee: number,
    serviceFeeRate: {
        value: number,
        type: string
    },
    paymentMethod: string,
    identifier: string,
    paymentIntentId: string,
    paymentCompleted: boolean,
    orderNumber: string,
    orderInteger: number,
    orderSearchString: string,
    chargeId: string,
    orderError: string,
    isTestMode: boolean,
    deliveryFee: number,
    campaignDetails?: Campaign,
    // posOrderData: PosOrderData
}

export interface SetModalOrderData {
    (orderData: Order | null): void
}

export interface ChangeOrderStatus {
    (orderId: string, newStatus: string): Promise<void>
}

export interface ChangeOrderEta {
    (orderId: string, newEta: Date): Promise<void>
}

export interface OrderStateStepProps {
    stateDict: OrderState,
    idx: number,
    activeOrderStateIdx: number,
    changeOrderStatus: ChangeOrderStatus,
    orderId: string | null
}

export interface ArrowImgStyle {
    width: number,
    height: number,
    tintColor?: string,
    marginRight?: number
}

export interface StepIconImgStyle {
    width: number,
    height: number,
    opacity: number,
    position: "relative" | "absolute" | undefined,
    tintColor?: string
}

export interface OrderStateStepBubbleProps {
    stateDict: OrderState,
    iconImgStyle: StepIconImgStyle,
    overlayIconImgStyle: StepIconImgStyle,
    isActive: boolean,
    changeOrderStatus: ChangeOrderStatus,
    orderId: string | null
}

export interface OrderStateStepArrowProps {
    arrowRightSrc: any,
    arrowImgStyle: ArrowImgStyle
}

export interface LoadOrderData {
    (orderId: string): void
}

export interface LoadOrderDict {
    (orderId: string): void
}

export interface LoadPosOrderData {
    (posOrderId: string): void
}

export interface GetRestaurantOrders {
    (
        restaurantId: string,
        authToken: string,
        showHistory: boolean
    ): Promise<Order[]>
}

export interface LoadNewOrder {
    (orderEventDict: any): void
}

export interface ReloadOrders {
    (): void
}

export interface UpdateOrderStateOpts {
    orderId: string,
    newStatus: string
}

export interface UpdateOrderState {
    (opts: UpdateOrderStateOpts): Promise<boolean>
}

export interface UpdateOrderProperty {
    (
        orderId: string,
        settingKey: string,
        newValue: any
    ): Promise<Order | null>
}

export interface UpdateOrderList {
    (newOrderList: Order[]): void
}

export interface ToggleOrderHistory {
    (newValue: boolean): void
}
