import {createContext} from "react";

interface NotifContext {
    reValidatePushToken: any
}

const notifDict: NotifContext = {
    reValidatePushToken: () => {}
};

const NotifContext = createContext(notifDict);

export default NotifContext;
