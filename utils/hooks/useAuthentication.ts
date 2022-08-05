import {useEffect, useState} from 'react';
import {fbAuth} from "../../config/firebase";
import { onAuthStateChanged, User } from 'firebase/auth';

export interface UseAuthentication {
    (): {
        user: User | null,
        authToken: string | null
    }
}


const useAuthentication: UseAuthentication = () => {
    const [user, setUser] = useState<User | null>(null);
    const [authToken, setAuthToken] = useState<null | string>(null);

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(fbAuth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);

                getUserToken();
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return unsubscribeFromAuthStatusChanged;
    }, []);

    async function getUserToken() {
        if (!!fbAuth && !!fbAuth.currentUser) {
            const token = await fbAuth.currentUser.getIdToken();

            setAuthToken(token);
        }
    }

    return {
        user,
        authToken
    };
};

export default useAuthentication;
