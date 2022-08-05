import {useEffect, useState} from "react";
import getLocalStorageValue from "../storage/getLocalStorageValue";
import setLocalStorageValue from "../storage/setLocalStorageValue";
import localStorageKeys from "../../constants/localStorageKeys";
import {GetUserToken, LogUserOut, StoreUserDataXface} from "../../interfaces/session";

export interface UseLocalSession {
    (): {
        userToken: string | null,
        userName: string | null,
        userEmail: string | null,
        lastValidated: string | null,
        getUserToken: GetUserToken,
        storeUserData: StoreUserDataXface,
        logUserOut: LogUserOut,
    }
}


const useLocalSession: UseLocalSession = () => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [lastValidated, setLastValidated] = useState<string | null>(null);

    useEffect(() => {
        getUserToken();
    },[]);

    async function getUserToken() {
        const userTokenValue = await getLocalStorageValue(localStorageKeys.userToken.keyName);
        const userTokenDate = await getLocalStorageValue(localStorageKeys.tokenDate.keyName);
        if (userTokenValue) {
            setUserToken(userTokenValue);
        }
        if (userTokenDate) {
            setLastValidated(userTokenDate);
        }
    }

    const storeUserData: StoreUserDataXface = async (token, name, email) => {
        if(token.length > 0) {

            try {
                const tokenUpdateResult = await setLocalStorageValue(localStorageKeys.userToken.keyName, token);
                const nameUpdateResult = await setLocalStorageValue(localStorageKeys.userName.keyName, name);
                const emailUpdateResult = await setLocalStorageValue(localStorageKeys.userEmail.keyName, email);

                if (tokenUpdateResult && nameUpdateResult && emailUpdateResult) {
                    setUserToken(token);
                    setUserName(name);
                    setUserEmail(email);

                    const dateNowString = `${new Date()}`;

                    const dateUpdateResult = await setLocalStorageValue(localStorageKeys.tokenDate.keyName, dateNowString);

                    if (dateUpdateResult) {
                        setLastValidated(dateNowString);

                        return true
                    } else {
                        return false
                    }
                } else {

                    return false
                }
            } catch (e) {
                console.log(e)

                return false
            }

        } else {
            return false
        }
    }

    const logUserOut: LogUserOut = async () => {
        const storeRes = await setLocalStorageValue(localStorageKeys.userToken.keyName, 'null');
        if (storeRes) {
            setUserToken('null');

            return true
        } else {
            return false
        }
    }

    return {
        userToken,
        userName,
        userEmail,
        lastValidated,
        getUserToken,
        storeUserData,
        logUserOut
    }
}

export default useLocalSession;
