import {useTheme, Button} from "react-native-paper";
import {useState} from "react";

interface ReloadMenuButtonProps {
    reloadData: () => void,
    top?: number,
    bottom?: number,
    right?: number,
    left?: number
}

export interface StyleDict {
    backgroundColor: string,
    position: string,
    top?: number,
    bottom?: number,
    left?: number,
    right?: number,
    zIndex: number
}

export default function ReloadMenuButton(
    {reloadData, top = 30, bottom, right, left}: ReloadMenuButtonProps
) {
    const {colors} = useTheme();
    const [loading, setLoading] = useState<boolean>(false);

    let styleDict: StyleDict = {
        backgroundColor: colors.primary,
        position: 'absolute',
        top: top ? top : 30,
        zIndex: 10
    };

    if (right) {
        styleDict.right = right;
    }
    if (left) {
        styleDict.left = left;
    }
    if (top) {
        styleDict.top = top;
    }
    if (bottom) {
        styleDict.bottom = bottom;
    }

    // @ts-ignore
    return (
        <Button
            icon={'refresh'}
            mode="contained"
            onPress={() => {
                setLoading(true);
                reloadData();
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            }}
            loading={loading}
            //@ts-ignore
            style={styleDict}
        >
            Refresh
        </Button>
    )
}
