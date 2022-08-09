import {LoadNewOrder} from "../../interfaces/order";
import {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";

export interface UseQrunchSocketsProps {
    restaurantId: string | null | undefined,
    enabled: boolean,
    onConnected?: () => void,
    loadNewOrder: LoadNewOrder,
    reloadServiceOrders?: () => void
}

export default function useQrunchSockets(
    {restaurantId, enabled, onConnected, loadNewOrder, reloadServiceOrders}: UseQrunchSocketsProps
) {
    const ref = useRef<Socket>();
    const [newOrders, setNewOrders] = useState([]);

    useEffect((): any => {
        if (restaurantId) {
            if (!enabled) {
                return
            }
            const socket: Socket = io('https://websockets.qrunch.eu');

            socket.emit('join_restaurant', restaurantId);

            socket.on('new_order', reloadOrders);
            socket.on('payment_completed', reloadOrders);
            socket.on('payment_status_update', reloadOrders);
            socket.on('new_order_status', reloadOrders);

            socket.on('new_service_order', handleNewServiceOrderNotif);
            socket.on('service_guest_chat', handleNewServiceChatNotif);

            socket.on('disconnect', () => {
                console.log('sockets disconnected')
            });

            socket.on('connect', () => {
                if (onConnected) {
                    onConnected();
                }
            });

            socket.on('reconnect', () => {
                socket.emit('join_restaurant', restaurantId);
            });

            ref.current = socket;

            return () => socket.disconnect()
        }

    },[enabled, restaurantId]);

    const sendConfirm = (orderId: string, restId: string) => {
        ref.current!.emit('pos_confirm', {
            orderId: orderId,
            restId: restId
        });
    };

    const socketsUpdateEta = (orderId: string, newEta: Date | string) => {
        ref.current!.emit(
            'update_eta',
            {
                orderId: orderId,
                newEta: newEta
            }
        );
    };

    const socketsUpdateStatus = (orderId: string, newStatus: string) => {
        ref.current!.emit(
            'update_order',
            {
                orderId: orderId,
                newStatus: newStatus
            }
        );
    };

    function reloadOrders(orderEventDict: any) {
        loadNewOrder(orderEventDict);
    }

    function handleNewServiceOrderNotif() {
        if (!!reloadServiceOrders) {
            reloadServiceOrders()
        }
    }

    function handleNewServiceChatNotif() {
        if (!!reloadServiceOrders) {
            reloadServiceOrders()
        }
    }

    return {
        newOrders,
        setNewOrders,
        sendConfirm,
        socketsUpdateEta,
        socketsUpdateStatus
    }
}
