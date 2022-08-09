import {Modal, StyleSheet, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import React from "react";
import SettingsContext from "../../settings/settingsContext";
import AuthContext from "../../auth/authContext";
import ManageQrunchOrder from "./ManageQrunchOrder";
import {
    ChangeOrderEta,
    ChangeOrderStatus,
    LoadOrderData,
    LoadOrderDict,
    Order, ReloadOrders,
    SetModalOrderData
} from "../../../interfaces/order";
import getOrderDict from "../../../utils/order/getOrderDict";
import getOrderData from "../../../utils/order/getOrderData";
import {MenuItem} from "../../../interfaces/item";
import {Campaign} from "../../../interfaces/campaign";
import {Option} from "../../../interfaces/option";

interface OrderDetailsModalProps {
    orderDict: Order | null,
    setModalOrderData: SetModalOrderData,
    changeOrderStatus: ChangeOrderStatus,
    changeOrderEta: ChangeOrderEta,
    reloadOrders: ReloadOrders
}


export default function OrderDetailsModal(props: OrderDetailsModalProps) {
    const authContext = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [itemDataList, setItemDataList] = useState<MenuItem[]>([]);
    const [campaignDataDict, setCampaignDataDict] = useState<null | Campaign>(null);
    const [orderOptionsData, setOrderOptionsData] = useState<Option[]>([]);
    const [orderDict, setOrderDict] = useState<null | Order>(null);
    const [stateIterator, setStateIterator] = useState<string>('');
    const [modalMode, setModalMode] = useState<'qrunchOrder' | 'posOrder'>('qrunchOrder');
    const [orderLoading, setOrderLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.orderDict) {
            setOrderDict(props.orderDict);
            loadOrderData(props.orderDict._id);
        }
    }, [props.orderDict]);

    useEffect(() => {
        if (orderDict) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }, [orderDict]);

    const loadOrderData: LoadOrderData = (orderId) => {
        setOrderLoading(true)
        getOrderData(orderId).then(data => {
            setOrderLoading(false)
            if (data) {
                setItemDataList(data.itemData);
                setCampaignDataDict(data.campaignData);
                setOrderOptionsData(data.optionsData);
            }
        });
    };

    const loadOrderDict: LoadOrderDict = (orderId) => {
        setOrderLoading(true);
        getOrderDict(orderId).then(data => {
            setOrderLoading(false);
            setOrderDict(data);
            setStateIterator(`${Math.random()}`);
        });
    }

    return (
        <View
            style={styles.centeredView}
        >
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    props.setModalOrderData(null);
                }}
            >
                {modalMode === 'qrunchOrder' && (
                    <ManageQrunchOrder
                        orderDict={orderDict}
                        setOrderDict={setOrderDict}
                        changeOrderStatus={props.changeOrderStatus}
                        changeOrderEta={props.changeOrderEta}
                        itemDataList={itemDataList}
                        setItemDataList={setItemDataList}
                        campaignDataDict={campaignDataDict}
                        orderOptionsData={orderOptionsData}
                        setOrderOptionsData={setOrderOptionsData}
                        reloadOrders={props.reloadOrders}
                        loadOrderDict={loadOrderDict}
                        setModalOrderData={props.setModalOrderData}
                        setModalMode={setModalMode}
                        isMobile={settingsContext.isMobile}
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
