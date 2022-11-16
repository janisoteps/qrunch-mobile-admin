import React, {createContext} from "react";

interface NotifContext {
    reValidatePushToken: any,
    lastOrderId?: string,
    lastServiceReqId?: string,
    newOrdersChecked?: boolean,
    showNewOrder?: boolean,
    setShowNewOrder?: React.Dispatch<boolean>,
    showNewServiceReq?: boolean,
    setShowNewServiceReq?: React.Dispatch<boolean>
}

const notifDict: NotifContext = {
    reValidatePushToken: () => {}
};

const NotifContext = createContext(notifDict);

export default NotifContext;
