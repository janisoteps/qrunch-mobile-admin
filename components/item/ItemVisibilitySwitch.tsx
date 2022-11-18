import {MenuItem} from "../../interfaces/item";
import {ChangeItemVisibility} from "../../screens/MenuEditScreen";
import {useTheme, Switch} from "react-native-paper";
import {useRef, useState} from "react";
import {View, Text, ActivityIndicator} from "react-native";

interface ItemVisibilitySwitchProps {
    singleItemData: MenuItem,
    showVisibility: boolean,
    changeItemVisibility: ChangeItemVisibility | null,
    isMobile: boolean,
    isVisible: boolean
}


export default function ItemVisibilitySwitch(
    {singleItemData, showVisibility, changeItemVisibility, isMobile, isVisible}: ItemVisibilitySwitchProps
) {
    const {colors} = useTheme();
    const switchRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const onToggleSwitch = () => {
        if (changeItemVisibility) {
            changeItemVisibility(singleItemData._id, !isVisible);
            setTimeout(() => {
                if (switchRef.current) {
                    setLoading(true);
                }
            }, 100);
        }
    }

    if (showVisibility) {

        return (
            <View
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginRight: isMobile ? 0 : 10,
                    marginBottom: isMobile ? 10 : 0,
                    marginLeft: 10
                }}
                ref={switchRef}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        marginRight: isMobile ? 2 : 5,
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
                        Item {isVisible ? 'visible' : 'hidden'}
                    </Text>

                    {loading ? (
                        <ActivityIndicator />
                    ):(
                        <Switch
                            value={isVisible}
                            onValueChange={onToggleSwitch}
                            color={'rgb(100,200,100)'}
                        />
                    )}
                </View>
            </View>
        )
    } else {
        return null
    }
}
