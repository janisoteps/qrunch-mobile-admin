import {OrderChatMessage, ServiceOrder} from "../../interfaces/service";
import sendServiceChatMessage from "../services/sendServiceChatMessage";
import {useEffect, useRef, useState} from "react";
import loadOneServiceOrder from "../services/loadOneServiceOrder";
import {io, Socket} from "socket.io-client";
import {ReloadServiceRequests} from "./useServiceRequests";

export interface SendMessage {
    (messageText: string): void
}

export interface UseServiceChatMessages {
    (
        serviceOrder: ServiceOrder,
        onConnected?: () => void,
        reloadServiceRequests?: ReloadServiceRequests
    ): {
        serviceOrderChatMessages: OrderChatMessage[],
        sendMessage: SendMessage,
        stateRefreshId: string
    }
}

export interface ChatMessageEvent {
    serviceOrderId: string
}

const useServiceChatMessages: UseServiceChatMessages = (
    serviceOrder, onConnected, reloadServiceRequests
) => {
    const ref = useRef<Socket>();
    const [serviceOrderChatMessages, setServiceOrderChatMessages] = useState<OrderChatMessage[]>([]);
    const [stateRefreshId, setStateRefreshId] = useState<string>('');

    useEffect((): any => {
        if (!!serviceOrder && !!serviceOrder?.restaurantId) {
            setServiceOrderChatMessages(serviceOrder.orderChat);

            const socket: Socket = io('https://websockets.qrunch.eu');

            socket.emit('join_restaurant', serviceOrder.restaurantId);
            socket.on('service_guest_chat', handleNewChatMessage);
            socket.on('disconnect', () => {});
            socket.on('connect', () => {
                if (onConnected) {
                    onConnected();
                }
            });
            socket.on('reconnect', () => {
                socket.emit('join_restaurant', serviceOrder.restaurantId);
            });

            ref.current = socket;

            return () => socket.disconnect()
        }
    }, [!!serviceOrder]);

    function handleNewChatMessage(chatMessageEvent: ChatMessageEvent) {
        if (chatMessageEvent.serviceOrderId === serviceOrder._id) {

            if (!!reloadServiceRequests) {
                reloadServiceRequests();
            }

            loadOneServiceOrder(serviceOrder._id).then(loadResult => {
                if (loadResult.success && !!loadResult?.serviceOrder?.orderChat) {
                    setServiceOrderChatMessages(loadResult?.serviceOrder?.orderChat);
                    setStateRefreshId(`${Math.random()}`);
                }
            });
        }
    }

    const sendMessage: SendMessage = (messageText) => {
        const newMessage: OrderChatMessage = {
            messageText: messageText,
            date: new Date(),
            messageAuthor: 'staff'
        };

        if (!!serviceOrder?._id) {
            sendServiceChatMessage(
                newMessage,
                serviceOrder._id,
                serviceOrder.restaurantId,
                serviceOrder.locationId
            ).then(sendResult => {
                if (sendResult.success && !!serviceOrder?._id) {
                    loadOneServiceOrder(serviceOrder._id).then(loadResult => {
                        if (loadResult.success && !!loadResult?.serviceOrder?.orderChat) {
                            setServiceOrderChatMessages(loadResult?.serviceOrder?.orderChat);
                            setStateRefreshId(`${Math.random()}`);
                        }
                    });
                }
            });
        }

    };

    return {
        serviceOrderChatMessages,
        sendMessage,
        stateRefreshId
    }
};

export default useServiceChatMessages;
