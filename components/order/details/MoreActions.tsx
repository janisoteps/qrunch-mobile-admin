import React, {useState} from "react";
import CancelOrder from "./CancelOrder";
import OrderEtaPicker from "./OrderEtaPicker";
import {
    ChangeOrderEta,
    ChangeOrderStatus,
    LoadOrderDict,
    LoadPosOrderData,
    Order,
    ReloadOrders
} from "../../../interfaces/order";
import {MenuItem} from "../../../interfaces/item";
import {Campaign} from "../../../interfaces/campaign";
import {Option} from "../../../interfaces/option";
import {View} from "react-native";


interface MoreActionsProps {
    orderDict: Order | null,
    changeOrderStatus: ChangeOrderStatus,
    changeOrderEta: ChangeOrderEta,
    itemDataList: MenuItem[],
    campaignDataDict: null | Campaign,
    orderOptionsData: Option[],
    reloadOrders: ReloadOrders,
    loadOrderDict: LoadOrderDict,
    setModalMode: (newMode: 'qrunchOrder' | 'posOrder') => void,
    isMobile: boolean | undefined
}


export default function MoreActions(props: MoreActionsProps) {
    const [showLeadTimeSelector, setShowLeadTimeSelector] = useState<boolean>(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
    const [showSaveToPos, setShowSaveToPos] = useState<boolean>(false);

    const viewCancelConfirm = () => {
        setShowCancelConfirm(!showCancelConfirm);
    };
    const viewEtaPicker = () => {
        setShowLeadTimeSelector(!showLeadTimeSelector);
    }

    return (
        <View
            style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: props.isMobile ? 0 : 5,
                marginLeft: props.isMobile ? 0 : 5,
                width: '100%',
                alignItems: 'center'
            }}
        >
            <CancelOrder
                orderDict={props.orderDict}
                changeOrderStatus={props.changeOrderStatus}
                showCancelConfirm={showCancelConfirm}
                viewCancelConfirm={viewCancelConfirm}
                showOthers={showLeadTimeSelector || showSaveToPos}
                isMobile={props.isMobile}
            />

            <OrderEtaPicker
                orderDict={props.orderDict}
                showCancelConfirm={showCancelConfirm}
                showLeadTimeSelector={showLeadTimeSelector}
                showOthers={showSaveToPos || showCancelConfirm}
                viewEtaPicker={viewEtaPicker}
                changeOrderEta={props.changeOrderEta}
                isMobile={props.isMobile}
            />
        </View>
    )
}
