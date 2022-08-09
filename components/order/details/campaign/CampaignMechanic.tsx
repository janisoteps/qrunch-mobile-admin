import React from "react";
import {Order} from "../../../../interfaces/order";
import DiscountMechanic from "./DiscountMechanic";
import FreeItemMechanic from "./FreeItemMechanic";

interface CampaignMechanicProps {
    orderDict: Order | null
}


export default function CampaignMechanic(props: CampaignMechanicProps) {
    if (props.orderDict) {
        if (
            props.orderDict
            && props.orderDict.campaignDetails
            && props.orderDict.campaignDetails.campaignMechanic
            && props.orderDict.campaignDetails.campaignMechanic.discount
        ) {

            return <DiscountMechanic orderDict={props.orderDict} />
        } else if (
            props.orderDict
            && props.orderDict.campaignDetails
            && props.orderDict.campaignDetails.itemId
        ) {

            return <FreeItemMechanic orderDict={props.orderDict} />
        } else {

            return null
        }
    } else {

        return null
    }
}
