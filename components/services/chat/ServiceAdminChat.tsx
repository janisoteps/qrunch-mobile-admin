import {ServiceOrder} from "../../../interfaces/service";
import {UiTranslation} from "../../../interfaces/general";
import useTranslation from "../../../utils/general/useTranslation";
import useServiceChatMessages from "../../../utils/hooks/useServiceChatMessages";
import {View} from "react-native";
import ServiceOrderChat from "./ServiceOrderChat";
import {ReloadServiceRequests} from "../../../utils/hooks/useServiceRequests";

interface ServiceAdminChatProps {
    serviceOrder: ServiceOrder,
    uiTranslations: UiTranslation[],
    language: string,
    reloadServiceRequests: ReloadServiceRequests
}


export default function ServiceAdminChat(
    {serviceOrder, uiTranslations, language, reloadServiceRequests}: ServiceAdminChatProps
) {
    const {
        serviceOrderChatMessages,
        sendMessage,
        stateRefreshId
    } = useServiceChatMessages(serviceOrder, reloadServiceRequests);

    const youLabel = useTranslation(uiTranslations, language, 'you');
    const guestLabel = useTranslation(uiTranslations, language, 'guest');
    const staffLabel = useTranslation(uiTranslations, language, 'staff');

    return (
        <View
            style={{
                paddingBottom: 150,
                width: '100%'
            }}
        >
            <ServiceOrderChat
                chatMessages={serviceOrderChatMessages}
                chatMode={'staff'}
                sendChatInput={sendMessage}
                stateRefreshId={stateRefreshId}
                youLabel={youLabel}
                guestLabel={guestLabel}
                staffLabel={staffLabel}
            />
        </View>
    )
}
