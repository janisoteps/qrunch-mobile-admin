import {ChatMessageAuthor, OrderChatMessage} from "../../../interfaces/service";
import {View, Text} from "react-native";
import {coloursConstants} from "../../../constants/colours";

interface ChatMessageRowProps {
    chatMessage: OrderChatMessage,
    messageMode: ChatMessageAuthor,
    youLabel: string,
    theyLabel: string
}

export default function ChatMessageRow(
    {chatMessage, messageMode, youLabel, theyLabel}: ChatMessageRowProps
) {
    const ownMessage = chatMessage.messageAuthor === messageMode;
    const authorLabel = ownMessage ? youLabel : theyLabel;

    return (
        <View
            style={{
                width: '100%',
            }}
        >
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    // justifyContent: ownMessage ? 'flex-end' : 'flex-start',
                    alignItems: ownMessage ? 'flex-end' : 'flex-start',
                }}
            >
                <View
                    style={{
                        backgroundColor: coloursConstants.backgroundColorDark.hex,
                        padding: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        borderRadius: 10,
                        margin: 5,
                        alignSelf: ownMessage ? 'flex-end' : 'flex-start'
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15
                        }}
                    >
                        {authorLabel}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: ownMessage ? 'flex-end' : 'flex-start',
                }}
            >
                <View
                    style={{
                        backgroundColor: coloursConstants.primaryColor.hex,
                        padding: 10,
                        borderTopLeftRadius: ownMessage ? 15 : 0,
                        borderTopRightRadius: ownMessage ? 0 : 15,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        maxWidth: '90%',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15
                        }}
                    >
                        {!!chatMessage.messageText ? chatMessage.messageText : '...'}
                    </Text>
                </View>
            </View>
        </View>
    )
}
