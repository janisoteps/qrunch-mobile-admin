import {ServiceOrder, ServiceOrderState} from "../../../interfaces/service";
import React, {useContext, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {coloursConstants} from "../../../constants/colours";
import {serviceStates} from "../../../constants/services";
import {ArrowImgStyle} from "../../../interfaces/order";
import OrderStateStepArrow from "../../order/details/OrderStateStepArrow";
import SettingsContext from "../../settings/settingsContext";
import {ChangeServiceRequestStatus} from "../../../utils/hooks/useServiceRequests";

interface ServiceRequestStateProps {
    serviceOrder: ServiceOrder,
    changeServiceRequestStatus: ChangeServiceRequestStatus
}


export default function ServiceRequestState(
    {serviceOrder, changeServiceRequestStatus}: ServiceRequestStateProps
) {
    const settingsContext = useContext(SettingsContext);
    const [orderState, setOrderState] = useState<ServiceOrderState>(serviceOrder.orderState);

    function handleStateChange(newState: ServiceOrderState) {
        setOrderState(newState);
        if (!!serviceOrder?._id) {
            changeServiceRequestStatus(newState, serviceOrder._id, serviceOrder.locationId)
        }
    }

    const arrowRightSrc = require('./../../../assets/images/arrow-right.png');
    let arrowImgStyle: ArrowImgStyle = {
        width: settingsContext.isMobile ? 10 : 16,
        height: settingsContext.isMobile ? 20 : 30,
        tintColor: 'gray',
        marginRight: 10
    };
    const cellPadding = settingsContext.isMobile ? 10 : 20;

    return (
        <View
            style={{
                backgroundColor: 'rgba(255,255,255,0)',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 10,
                width: '100%'
            }}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 10
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: orderState === 'pending'
                            ? coloursConstants.errorColor.hex : coloursConstants.disabledColor.hex,
                        padding: cellPadding,
                        borderRadius: 20,
                    }}
                    onPress={() => {handleStateChange('pending')}}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500',
                        }}
                    >
                        {serviceStates.pending.name}
                    </Text>
                </TouchableOpacity>
            </View>

            <OrderStateStepArrow
                arrowRightSrc={arrowRightSrc}
                arrowImgStyle={arrowImgStyle}
            />

            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 10
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: orderState === 'accepted'
                            ? coloursConstants.primaryColor.hex : coloursConstants.disabledColor.hex,
                        padding: cellPadding,
                        borderRadius: 20,
                    }}
                    onPress={() => {handleStateChange('accepted')}}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500',
                        }}
                    >
                        {serviceStates.accepted.name}
                    </Text>
                </TouchableOpacity>
            </View>

            <OrderStateStepArrow
                arrowRightSrc={arrowRightSrc}
                arrowImgStyle={arrowImgStyle}
            />

            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: orderState === 'completed'
                            ? coloursConstants.successColor.hex : coloursConstants.disabledColor.hex,
                        padding: cellPadding,
                        borderRadius: 20,
                    }}
                    onPress={() => {handleStateChange('completed')}}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: '500',
                        }}
                    >
                        {serviceStates.completed.name}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
