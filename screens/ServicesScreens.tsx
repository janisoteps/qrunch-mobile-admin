import {RootTabScreenProps} from "../interfaces/general";
import {SafeAreaView, ScrollView, Text} from "react-native";
import {useTheme} from "@react-navigation/native";
import Layout from "../constants/layout";
import * as React from "react";
import {useContext, useState} from "react";
import AuthContext from "../components/auth/authContext";
import SettingsContext from "../components/settings/settingsContext";
import useServiceRequests from "../utils/hooks/useServiceRequests";
import useQrunchSockets from "../utils/hooks/useQrunchSockets";
import ServiceRequestsList from "../components/services/ServiceRequestsList";
import {ServiceOrder} from "../interfaces/service";
import ServiceRequestModal from "../components/services/modal/ServiceRequestModal";
import useUiTranslations from "../utils/hooks/useUiTranslations";


export default function ServicesScreen({route, navigation}: RootTabScreenProps<'Services'>) {
    const {colors} = useTheme();
    const authContext = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext);

    const {
        uiTranslations
    } = useUiTranslations();

    const {
        serviceRequests,
        loadServiceRequests,
        reloadServiceRequests,
        changeServiceRequestStatus,
        saveSuccess
    } = useServiceRequests(authContext.authToken, settingsContext.restaurantData, settingsContext.userData);

    const {
        newOrders,
        setNewOrders,
        sendConfirm,
        socketsUpdateEta,
        socketsUpdateStatus
    } = useQrunchSockets({
        restaurantId: settingsContext.usedRestaurantId,
        enabled: true,
        onConnected: () => {},
        reloadServiceRequests
    });

    const [modalServiceRequestData, setModalServiceRequestData] = useState<null | ServiceOrder>(null);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                alignSelf: 'stretch',
                backgroundColor: colors.background
            }}
        >
            <ScrollView
                style={{
                    marginTop: Layout.headerHeight,
                    paddingTop: 40,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0
                }}
            >
                <ServiceRequestsList
                    serviceRequests={serviceRequests}
                    setModalServiceRequestData={setModalServiceRequestData}
                />

                <ServiceRequestModal
                    modalServiceRequestData={modalServiceRequestData}
                    setModalServiceRequestData={setModalServiceRequestData}
                    saveSuccess={saveSuccess}
                    uiTranslations={uiTranslations}
                    reloadServiceRequests={reloadServiceRequests}
                    changeServiceRequestStatus={changeServiceRequestStatus}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
