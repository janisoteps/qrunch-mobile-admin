import {StyleSheet, View, Modal, Image} from "react-native";
import React, {useContext, useState} from "react";
import SettingsContext from "../../settings/settingsContext";
import {ServiceOrder} from "../../../interfaces/service";
import * as AllImages from "../../../assets/images";
import {AllImagesXface} from "../../../assets/images";

interface ServiceRequestModalProps {
    modalServiceRequestData: ServiceOrder | null,
    setModalServiceRequestData: React.Dispatch<ServiceOrder | null>,
    saveSuccess: boolean
}

export default function ServiceRequestModal(
    {modalServiceRequestData, setModalServiceRequestData, saveSuccess}: ServiceRequestModalProps
) {
    const settingsContext = useContext(SettingsContext);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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
                {saveSuccess && (
                    <Image
                        source={(AllImages as AllImagesXface)['success']}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                )}


            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
});
