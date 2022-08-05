import {createContext} from "react";
import {AuthProps} from "../../interfaces/auth";

const authDict: AuthProps = {};

const AuthContext = createContext(authDict);

export default AuthContext;
