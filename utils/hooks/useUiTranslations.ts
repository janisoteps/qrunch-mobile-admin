import {UiTranslation} from "../../interfaces/general";
import {useEffect, useState} from "react";
import axios from "axios";
import Constants from "expo-constants";

export interface UseUiTranslations {
    (): {
        uiTranslations: UiTranslation[]
    }
}

const useUiTranslations: UseUiTranslations = () => {
    const [uiTranslations, setUiTranslations] = useState<UiTranslation[]>([]);

    useEffect(() => {
        getUiTranslations();
    }, []);

    async function getUiTranslations() {
        try {
            const requestUrl = (Constants.manifest && Constants.manifest.extra)
                ? `${Constants.manifest.extra.qrunchApi}/api/translations_type?type=ui` : null;

            if (!!requestUrl) {
                const translationsResponse = await axios.get( requestUrl );

                if (!!translationsResponse?.data) {
                    setUiTranslations(translationsResponse.data);
                }
            }
        } catch (e) {
            console.log(`getUiTranslations ${e}`)
        }
    }

    return {
        uiTranslations
    }
};

export default useUiTranslations;
