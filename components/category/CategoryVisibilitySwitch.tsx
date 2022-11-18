import {ChangeCategoryVisibility} from "../../screens/MenuEditScreen";
import {Category} from "../../interfaces/category";
import {useTheme, Switch} from "react-native-paper";
import {useState} from "react";
import {View, Text} from "react-native";

interface CategoryVisibilitySwitch {
    categoryData: Category,
    showVisibility: boolean,
    changeCategoryVisibility: ChangeCategoryVisibility
}


export default function CategoryVisibilitySwitch(
    {categoryData, showVisibility, changeCategoryVisibility}: CategoryVisibilitySwitch
) {
    const {colors} = useTheme();
    const categoryVisible = 'published' in categoryData ? categoryData.published === true : true;
    const [categoryIsVisible, setCategoryIsVisible] = useState<boolean>(categoryVisible);

    const onToggleSwitch = () => {
        setCategoryIsVisible(!categoryIsVisible);
        changeCategoryVisibility(categoryData._id, !categoryIsVisible);
    }

    if (showVisibility) {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: 10
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        marginRight: 5,
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            textAlign: 'left',
                            fontSize: 15,
                            fontWeight: '500',
                            marginRight: 5,
                            marginBottom: 10
                        }}
                    >
                        Category {categoryIsVisible ? 'visible' : 'hidden'}
                    </Text>

                    <Switch
                        value={categoryIsVisible}
                        onValueChange={onToggleSwitch}
                        color={colors.primary}
                    />
                </View>
            </View>
        )
    } else {
        return null
    }
}
