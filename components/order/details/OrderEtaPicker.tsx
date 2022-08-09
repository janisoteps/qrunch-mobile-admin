import React from "react";
import OrderLeadTimesList from "./OrderLeadTimesList";
import {Pressable, Text} from "react-native";
import {ChangeOrderEta, Order} from "../../../interfaces/order";

interface OrderEtaPickerProps {
    orderDict: Order | null,
    showCancelConfirm: boolean,
    showLeadTimeSelector: boolean,
    showOthers: boolean,
    viewEtaPicker: () => void,
    changeOrderEta: ChangeOrderEta,
    isMobile: boolean | undefined
}


export default function OrderEtaPicker(props: OrderEtaPickerProps) {

    if (props.orderDict && !props.showOthers) {
        let currentEta = 'Not set';
        if (props.orderDict.eta) {
            const etaDateTime = new Date(props.orderDict.eta);
            currentEta = `${etaDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }

        if (props.showLeadTimeSelector) {
            return (
                <OrderLeadTimesList
                    orderDict={props.orderDict}
                    changeOrderEta={props.changeOrderEta}
                    viewEtaPicker={props.viewEtaPicker}
                    isMobile={props.isMobile}
                />
            )
        } else {
            return (
                <Pressable
                    style={{
                        backgroundColor: 'rgb(50,40,40)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: 10,
                        marginLeft: 5,
                        flex: props.isMobile ? 0.3 : 0.2,
                        borderRadius: 15,
                        alignItems: 'center',
                        minWidth: 20,
                        minHeight: props.isMobile ? 0 : 65
                    }}
                    onPress={() => {
                        props.viewEtaPicker();
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: props.isMobile ? 12 : 15,
                            fontWeight: 'bold',
                            marginRight: 5,
                            padding: 15
                        }}
                    >
                        ETA: {currentEta}
                    </Text>
                </Pressable>
            )
        }
    } else {
        return null
    }
}
