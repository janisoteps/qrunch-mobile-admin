import {useEffect, useState} from 'react';
import {fbAuth} from "../../config/firebase";
import { onAuthStateChanged, User } from 'firebase/auth';

// const auth = getAuth();

export interface UseAuthentication {
    (): {
        user: User | null
    }
}

const useAuthentication: UseAuthentication = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(fbAuth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user
    };
};

export default useAuthentication;
