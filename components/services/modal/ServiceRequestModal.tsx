import {StyleSheet, View, Modal, Image, ScrollView, Text, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import {ServiceOrder} from "../../../interfaces/service";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";
import {RoomNumber} from "../request/RoomNumber";
import ServiceRequestedTime from "../request/ServiceRequestedTime";
import ServiceRequestState from "./ServiceRequestState";
import {ServiceItemName} from "../request/ServiceItemName";
import ServiceOrderDateTime from "../request/ServiceOrderDateTime";
import ServiceInputs from "./ServiceInputs";
import {UiTranslation} from "../../../interfaces/general";
import ServiceAdminChat from "../chat/ServiceAdminChat";
import {ChangeServiceRequestStatus, ReloadServiceRequests} from "../../../utils/hooks/useServiceRequests";

interface ServiceRequestModalProps {
    modalServiceRequestData: ServiceOrder | null,
    setModalServiceRequestData: React.Dispatch<ServiceOrder | null>,
    saveSuccess: boolean,
    uiTranslations: UiTranslation[],
    reloadServiceRequests: ReloadServiceRequests,
    changeServiceRequestStatus: ChangeServiceRequestStatus
}


export default function ServiceRequestModal(
    {
        modalServiceRequestData,
        setModalServiceRequestData,
        saveSuccess,
        uiTranslations,
        reloadServiceRequests,
        changeServiceRequestStatus
    }: ServiceRequestModalProps
) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (!!modalServiceRequestData) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }, [!modalServiceRequestData]);

    return (
        <View
            style={styles.centeredView}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalServiceRequestData(null);
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 0,
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    }}
                >
                    {!!modalServiceRequestData && (
                        <View style={styles.modalView}>
                            <ScrollView
                                style={{
                                    paddingTop: 10,
                                    backgroundColor: 'rgba(255,255,255,0)',
                                    padding: 0,
                                    borderRadius: 10,
                                    flexGrow: 0,
                                    marginBottom: 10
                                }}
                            >
                                {saveSuccess && (
                                    <Image
                                        source={(AllImages as AllImagesXface)['success']}
                                        style={{
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                )}
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0)',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <RoomNumber serviceOrder={modalServiceRequestData} />
                                    <ServiceRequestedTime serviceOrder={modalServiceRequestData} />
                                </View>

                                <ServiceRequestState
                                    serviceOrder={modalServiceRequestData}
                                    changeServiceRequestStatus={changeServiceRequestStatus}
                                />

                                <ServiceOrderDateTime serviceOrder={modalServiceRequestData} />
                                <ServiceItemName serviceOrder={modalServiceRequestData} />

                                <ServiceInputs serviceOrder={modalServiceRequestData} />

                                <ServiceAdminChat
                                    serviceOrder={modalServiceRequestData}
                                    uiTranslations={uiTranslations}
                                    language={'english'}
                                    reloadServiceRequests={reloadServiceRequests}
                                />
                            </ScrollView>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalServiceRequestData(null);
                                }}
                            >
                                <Text style={styles.whiteButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        marginBottom: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.45,
        shadowRadius: 100,
        elevation: 5,
        alignSelf: 'center',
        maxHeight: '80%',
        paddingBottom: 60
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#1f1614",
        width: 200,
        marginTop: 20,
        position: "absolute",
        bottom: 10
    },
    whiteButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
