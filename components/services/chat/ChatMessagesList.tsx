import {ChatMessageAuthor, OrderChatMessage} from "../../../interfaces/service";
import Layout from "../../../constants/layout";
import {ScrollView, View, Text} from "react-native";
import {useTheme} from "@react-navigation/native";
import ChatMessageRow from "./ChatMessageRow";
import {useRef} from "react";

interface ChatMessagesListProps {
    chatMode: ChatMessageAuthor,
    chatMessages: OrderChatMessage[],
    stateRefreshId: string,
    youLabel: string,
    guestLabel: string,
    staffLabel: string,
}


export default function ChatMessagesList(
    {chatMode, chatMessages, stateRefreshId, youLabel, guestLabel, staffLabel}: ChatMessagesListProps
) {
    const {colors} = useTheme();
    const scrollViewRef = useRef(null);
    const theyLabel = chatMode === 'guest' ? staffLabel : guestLabel;

    const sortedChatMessages = chatMessages.sort(
        function (messageA, messageB) {
            return new Date(messageA.date).getTime() - new Date(messageB.date).getTime()
        }
    );

    function scrollViewSizeChanged(height: number){
        // @ts-ignore
        scrollViewRef.current?.scrollTo({y: height, animated: true});
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#ecf0f1',
            }}
        >
            <View
                style={{
                    height: 280
                }}
            >
                <ScrollView
                    style={{
                        marginTop: Layout.headerHeight,
                        paddingTop: 10,
                        paddingBottom: 140,
                        marginHorizontal: 20,
                        flex: 1,
                        height: 300,
                        backgroundColor: colors.background,
                        alignSelf: 'stretch',
                    }}
                    ref={scrollViewRef}
                    onContentSizeChange={(width,height) => {scrollViewSizeChanged(height)}}
                >
                    {sortedChatMessages.map(chatMessage => {
                        return (
                            <ChatMessageRow
                                key={`${Math.random()}`}
                                chatMessage={chatMessage}
                                messageMode={chatMode}
                                youLabel={youLabel}
                                theyLabel={theyLabel}
                            />
                        )
                    })}

                    {(sortedChatMessages.length === 0) && (
                        <Text>
                            No messages yet
                        </Text>
                    )}

                    <View
                        style={{
                            height: 50
                        }}
                    >
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
