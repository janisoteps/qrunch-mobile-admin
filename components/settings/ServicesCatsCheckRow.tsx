import {ServiceCategory} from "../../interfaces/service";
import {useTheme} from "@react-navigation/native";
import {useContext} from "react";
import SettingsContext from "./settingsContext";
import {View} from "react-native";
import {CheckBox} from "react-native-elements";

interface ServicesCatsCheckRowProps {
    serviceCategory: ServiceCategory,
    accountServiceCats: ServiceCategory[]
}

export default function ServicesCatsCheckRow({serviceCategory, accountServiceCats}: ServicesCatsCheckRowProps) {
    const { colors } = useTheme();
    const settingsContext = useContext(SettingsContext);
    const catName = serviceCategory?.nameTranslations[0]?.name;

    const appUserServiceCategories = (
        !!settingsContext?.userData
        && 'appUserServiceCategories' in settingsContext?.userData
        && Array.isArray(settingsContext?.userData?.appUserServiceCategories)
    ) ? settingsContext.userData.appUserServiceCategories : null;

    const foundServiceCategory = !!appUserServiceCategories ? appUserServiceCategories.find(catRefDict => {
        return catRefDict.serviceCategoryId === serviceCategory._id
    }) : true;

    const allCatRefs = accountServiceCats.map(serviceCatDict => {
        return {
            serviceCategoryId: serviceCatDict._id,
            categoryName: serviceCatDict.nameTranslations
        }
    });

    function handleSelectedCategoryChange() {
        let updatedAppUserServiceCategories = [];
        const currentAppUserServiceCategories = !!appUserServiceCategories
            ? appUserServiceCategories : allCatRefs;

        if (!!foundServiceCategory) {
            updatedAppUserServiceCategories = currentAppUserServiceCategories.filter(catRefDict => {
                return catRefDict.serviceCategoryId !== serviceCategory._id
            });
        } else {
            updatedAppUserServiceCategories = [...currentAppUserServiceCategories];
            updatedAppUserServiceCategories.push({
                serviceCategoryId: serviceCategory._id,
                categoryName: serviceCategory.nameTranslations
            });
        }

        if (!!settingsContext?.changeUserSetting) {
            settingsContext.changeUserSetting({
                key: 'appUserServiceCategories',
                newValue: updatedAppUserServiceCategories
            });
        }
    }

    return (
        <View style={{
            flexDirection: "row",
            marginTop: 10,
            backgroundColor: colors.background,
            minWidth: 200
        }}>
            <CheckBox
                title={catName}
                checked={!!foundServiceCategory}
                onPress={() => {handleSelectedCategoryChange()}}
            />
        </View>
    )
}
