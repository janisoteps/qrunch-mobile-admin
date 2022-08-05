import {createContext} from "react";
import {AppSettings} from "../../interfaces/appSettings";
import currencies from "../../constants/currencies";

const settingsDict: AppSettings = {};

const SettingsContext = createContext(settingsDict);

export default SettingsContext;
