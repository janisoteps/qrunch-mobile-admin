import {ChatMessageAuthor, OrderChatMessage} from "../../../interfaces/service";
import {View} from "react-native";
import ChatMessagesList from "./ChatMessagesList";
import ChatInput from "./ChatInput";

export interface SendChatInput {
    (
        messageText: string,
        chatMode: ChatMessageAuthor
    ): void
}

interface ServiceOrderChatProps {
    chatMessages: OrderChatMessage[],
    chatMode: ChatMessageAuthor,
    sendChatInput: SendChatInput,
    stateRefreshId: string,
    youLabel: string,
    guestLabel: string,
    staffLabel: string,
}

export default function ServiceOrderChat(
    {chatMessages, chatMode, sendChatInput, stateRefreshId, youLabel, guestLabel, staffLabel}: ServiceOrderChatProps
) {

    return (
        <View
            style={{
                width: '100%',
                maxWidth: 600,
                marginTop: 30
            }}
        >
            <ChatMessagesList
                chatMode={chatMode}
                chatMessages={chatMessages}
                stateRefreshId={stateRefreshId}
                youLabel={youLabel}
                guestLabel={guestLabel}
                staffLabel={staffLabel}
            />

            <ChatInput
                chatMode={chatMode}
                sendMessage={sendChatInput}
            />
        </View>
    )
}
