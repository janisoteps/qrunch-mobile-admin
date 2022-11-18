import {CatItem} from "../../interfaces/category";
import {ChangeCategoryVisibility, ChangeItemVisibility} from "../../screens/MenuEditScreen";
import {useTheme} from "react-native-paper";
import {View} from "react-native";
import CategoryRow from "./CategoryRow";

interface CategoryListProps {
    catItemList: CatItem[],
    changeItemVisibility: ChangeItemVisibility,
    changeCategoryVisibility: ChangeCategoryVisibility
}

export default function CategoryList(props: CategoryListProps) {
    const {colors} = useTheme();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                margin: 0,
                marginTop: 80,
                marginBottom: 100
            }}
        >
            {props.catItemList.map(catItemDict =>
                <CategoryRow
                    catItem={catItemDict}
                    key={catItemDict.category._id}
                    changeItemVisibility={props.changeItemVisibility}
                    changeCategoryVisibility={props.changeCategoryVisibility}
                />
            )}
        </View>
    )
}
