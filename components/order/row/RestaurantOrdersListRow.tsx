import {Pressable, View} from "react-native";
import React, {useContext} from "react";
import SettingsContext from "../../settings/settingsContext";
import {Order, SetModalOrderData} from "../../../interfaces/order";
import {locationTypes} from "../../../constants/location";
import tableIdTypes from "../../../constants/tableIdTypes";
import {orderNumberTypes} from "../../../constants/orderNumberTypes";
import RestaurantLocation from "./RestaurantLocation";
import TaboomNumber from "./TaboomNumber";
import OrderTotal from "./OrderTotal";
import OrderPaidLabel from "./OrderPaidLabel";
import OrderNumber from "./OrderNumber";
import MoreInformation from "./MoreInformation";

export interface RestaurantOrdersListRowProps {
    orderDict: Order | null,
    setModalOrderData: SetModalOrderData,
    isMobile: boolean | undefined
}


export default function RestaurantOrdersListRow(props: RestaurantOrdersListRowProps) {
    const settingsContext = useContext(SettingsContext);

    if (props.orderDict) {
        const locationType = 'locationType' in props.orderDict
            ? props.orderDict.locationType : locationTypes.restaurant.typeId;

        let taboomNr = null;
        if (props.orderDict.taboomNr) {
            taboomNr = props.orderDict.taboomNr;
        } else {
            if (props.orderDict.tableIdType && props.orderDict.tableIdType === tableIdTypes.manual.name) {
                taboomNr = props.orderDict.tableId;
            } else if (props.orderDict.tableName) {
                taboomNr = props.orderDict.tableName;
            }
        }

        const orderNumberType: string = (settingsContext.restaurantData && settingsContext.restaurantData.orderNumberType)
            ? settingsContext.restaurantData.orderNumberType : orderNumberTypes.stringType.id;
        const orderIntegerLabel: string = props.orderDict.orderInteger
            ? `NR: ${props.orderDict.orderInteger}` : props.orderDict.orderNumber;
        const orderIdentifier: string = orderNumberType === orderNumberTypes.stringType.id
            ? props.orderDict.orderNumber : orderIntegerLabel;

        const orderState = props.orderDict.orderState;
        const backgroundColor = orderState === 'pending' ? 'rgb(255,153,153)'
            : orderState === 'preparing' || orderState === 'onTheWay' ? 'rgb(221,221,253)'
                : orderState === 'ready' || orderState === 'completed' ? 'rgb(255,255,255)' : 'rgb(179,165,165)';

        return (
            <Pressable
                key={props.orderDict._id}
                style={{
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: backgroundColor,
                    shadowColor: '#171717',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                }}
                onPress={() => {
                    props.setModalOrderData(props.orderDict);
                }}
            >
                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0)',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
                    <RestaurantLocation
                        restaurantLocation={props.orderDict.restaurantLocation}
                        backgroundColor={backgroundColor}
                    />

                    <TaboomNumber
                        taboomNr={taboomNr}
                        locationType={locationType}
                        backgroundColor={backgroundColor}
                    />

                    <OrderTotal
                        orderTotal={props.orderDict.orderTotal}
                        backgroundColor={backgroundColor}
                    />

                    <OrderPaidLabel
                        orderDict={props.orderDict}
                        backgroundColor={backgroundColor}
                    />

                    {!props.isMobile && (
                        <OrderNumber
                            orderNumber={orderIdentifier}
                            backgroundColor={backgroundColor}
                        />
                    )}

                    {!props.isMobile && (
                        <MoreInformation
                            orderDict={props.orderDict}
                            locationType={locationType}
                            taboomNr={taboomNr}
                            backgroundColor={backgroundColor}
                            isMobile={props.isMobile}
                        />
                    )}
                </View>

                {props.isMobile && (
                    <MoreInformation
                        orderDict={props.orderDict}
                        locationType={locationType}
                        taboomNr={taboomNr}
                        backgroundColor={backgroundColor}
                        isMobile={props.isMobile}
                    />
                )}

            </Pressable>
        )
    } else {
        return null
    }

}
