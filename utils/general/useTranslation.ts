import {UiTranslation} from "../../interfaces/general";

export interface UseTranslation {
    (
        uiTranslations: UiTranslation[],
        language: string,
        term: string
    ): string
}

const useTranslation: UseTranslation = (uiTranslations, language, term) => {
    const labelDict = uiTranslations ? uiTranslations.find(translationDict => {
        return translationDict.name === term
    }) : null;
    if (!labelDict) {
        return ''
    } else {
        if (language in labelDict.translations) {
            return labelDict.translations[language]
        } else {
            return labelDict.translations['english']
        }
    }
};

export default useTranslation;
