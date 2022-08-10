import baseHeaders from "../../constants/requestHeaders";
import Constants from "expo-constants";
import axios from "axios";
import {OrderChatMessage} from "../../interfaces/service";

export interface SendServiceChatMessage {
    (
        chatMessage: OrderChatMessage,
        serviceOrderId: string,
        restaurantId: string,
        locationId: string,
    ): Promise<{
        success: boolean,
        error: string | null
    }>
}


const sendServiceChatMessage: SendServiceChatMessage = async (
    chatMessage, serviceOrderId, restaurantId, locationId
) => {
    try {
        const requestUrl = (Constants.manifest && Constants.manifest.extra)
            ? `${Constants.manifest.extra.qrunchApi}/api/send_service_chat` : null;

        if (!!requestUrl) {
            const sendChatResponse = await axios.post(
                requestUrl,
                {
                    service_order_id: serviceOrderId,
                    restaurant_id: restaurantId,
                    location_id: locationId,
                    message_author: chatMessage.messageAuthor,
                    message_text: chatMessage.messageText
                },
                {
                    headers: baseHeaders
                }
            );

            if (!!sendChatResponse && sendChatResponse.status === 200) {
                return {
                    success: true,
                    error: null
                }
            } else {
                return {
                    success: false,
                    error: !!sendChatResponse?.status
                        ? `Error status: ${sendChatResponse?.status}` : 'Something went wrong'
                }
            }

        } else {
            return {
                success: false,
                error: `Invalid URL`
            }
        }
    } catch (error) {
        console.log(`sendServiceChatMessage ${error}`);

        return {
            success: false,
            error: `${error}`
        }
    }
};

export default sendServiceChatMessage;
