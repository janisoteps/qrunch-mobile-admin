export interface OrderState {
    id: string,
    name: string,
    img: string,
    imgSrc?: string
}

export const eatInOrderStates: OrderState[] = [
    {
        id: 'pending',
        name: 'pending',
        img: 'pending'
    },
    {
        id: 'preparing',
        name: 'preparing',
        img: 'cooking'
    },
    {
        id: 'ready',
        name: 'ready',
        img: 'meal'
    },
    {
        id: 'completed',
        name: 'completed',
        img: 'check'
    }
];

export const deliveryOrderStates: OrderState[] = [
    {
        id: 'pending',
        name: 'pending',
        img: 'pending'
    },
    {
        id: 'preparing',
        name: 'preparing',
        img: 'cooking'
    },
    {
        id: 'onTheWay',
        name: 'on the way',
        img: 'delivery'
    },
    {
        id: 'completed',
        name: 'completed',
        img: 'check'
    }
];

export const pickUpOrderStates: OrderState[] = [
    {
        id: 'pending',
        name: 'pending',
        img: 'pending'
    },
    {
        id: 'preparing',
        name: 'preparing',
        img: 'cooking'
    },
    {
        id: 'ready',
        name: 'ready',
        img: 'meal'
    },
    {
        id: 'completed',
        name: 'completed',
        img: 'check'
    }
];
