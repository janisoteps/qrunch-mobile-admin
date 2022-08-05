import {User} from "firebase/auth";

export interface AuthProps {
    authToken?: string | null,
    user?: User | null
}
