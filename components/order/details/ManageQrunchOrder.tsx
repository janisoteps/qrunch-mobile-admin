import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import OrderStatus from "./OrderStatus";
import RestaurantOrdersListRow from "../row/RestaurantOrdersListRow";
import MoreActions from "./MoreActions";
import ItemList from "../items/ItemList";
import OrderTotal from "./OrderTotal";
import React from "react";
import {
    ChangeOrderEta,
    ChangeOrderStatus,
    LoadOrderDict,
    Order,
    ReloadOrders,
    SetModalOrderData
} from "../../../interfaces/order";
import {MenuItem} from "../../../interfaces/item";
import {Campaign} from "../../../interfaces/campaign";
import {Option} from "../../../interfaces/option";

interface ManageQrunchOrderProps {
    orderDict: null | Order,
    setOrderDict: (orderDict: null | Order) => void,
    changeOrderStatus: ChangeOrderStatus,
    changeOrderEta: ChangeOrderEta,
    itemDataList: MenuItem[],
    setItemDataList: (itemList: MenuItem[]) => void,
    campaignDataDict: null | Campaign,
    orderOptionsData: Option[],
    setOrderOptionsData: (optionsData: Option[]) => void,
    reloadOrders: ReloadOrders,
    loadOrderDict: LoadOrderDict,
    setModalOrderData: SetModalOrderData,
    setModalMode: (newMode: 'qrunchOrder' | 'posOrder') => void,
    isMobile: boolean | undefined
}


export default function ManageQrunchOrder(props: ManageQrunchOrderProps) {
    return (
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
            <View style={styles.modalView}>
                <ScrollView
                    style={{
                        paddingTop: 0,
                        backgroundColor: 'rgba(255,255,255,0)',
                        padding: 0,
                        borderRadius: 10,
                        flexGrow: 0,
                    }}
                >
                    <OrderStatus
                        orderDict={props.orderDict}
                        changeOrderStatus={props.changeOrderStatus}
                        isMobile={props.isMobile}
                    />

                    <RestaurantOrdersListRow
                        orderDict={props.orderDict}
                        setModalOrderData={() => {}}
                        isMobile={props.isMobile}
                        isSingleOrderView={true}
                    />

                    <MoreActions
                        orderDict={props.orderDict}
                        changeOrderStatus={props.changeOrderStatus}
                        changeOrderEta={props.changeOrderEta}
                        itemDataList={props.itemDataList}
                        campaignDataDict={props.campaignDataDict}
                        orderOptionsData={props.orderOptionsData}
                        reloadOrders={props.reloadOrders}
                        loadOrderDict={props.loadOrderDict}
                        setModalMode={props.setModalMode}
                        isMobile={props.isMobile}
                    />

                    <ItemList
                        orderDict={props.orderDict}
                        itemDataList={props.itemDataList}
                        isMobile={props.isMobile}
                    />

                    <OrderTotal
                        orderDict={props.orderDict}
                    />
                </ScrollView>


                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                        props.setModalOrderData(null);
                        props.setOrderDict(null);
                        props.setItemDataList([]);
                        props.setOrderOptionsData([]);
                    }}
                >
                    <Text style={styles.textStyle}>Close</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 10,
        marginBottom: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 3,
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
        maxHeight: '85%',
        paddingBottom: 60,
        width: '100%'
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
