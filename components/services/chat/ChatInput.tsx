import {ChatMessageAuthor} from "../../../interfaces/service";
import {SafeAreaView, TextInput, View, Text} from "react-native";
import React, {useState} from "react";
import {Button} from "react-native-elements";
import {coloursConstants} from "../../../constants/colours";

export interface SendChatInput {
    (
        messageText: string,
        chatMode: ChatMessageAuthor
    ): void
}

interface ChatInputProps {
    chatMode: ChatMessageAuthor,
    sendMessage: SendChatInput
}

export default function ChatInput({chatMode, sendMessage}: ChatInputProps) {
    const [inputText, onChangeText] = useState<string>('');

    function sendChatMessage() {
        sendMessage(inputText, chatMode);
        onChangeText('');
    }

    return (
        <SafeAreaView
            style={{
                width: '100%',
                marginTop: 10
            }}
        >
            <Text>
                Your message:
            </Text>
            <TextInput
                style={{
                    width: '100%',
                    height: 50,
                    padding: 10,
                    backgroundColor: coloursConstants.onSurfaceColour.hex,
                    borderRadius: 15
                }}
                multiline={true}
                numberOfLines={4}
                onChangeText={onChangeText}
                value={inputText}
            />
            <View
                style={{
                    width: '100%',
                    marginTop: 10
                }}
            >
                <Button
                    title="Send"
                    buttonStyle={{
                        backgroundColor: coloursConstants.successColor.hex,
                        borderRadius: 15,
                        width: '100%',
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        sendChatMessage();
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
