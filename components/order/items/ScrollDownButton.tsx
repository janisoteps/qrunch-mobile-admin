import {IconButton, useTheme} from "react-native-paper";
import React from "react";

interface ScrollDownButtonProps {
    downButtonHandler: () => void
}

export default function ScrollDownButton(props: ScrollDownButtonProps) {
    const {colors} = useTheme();

    return (
        <IconButton
            icon="chevron-down"
            color={'white'}
            size={30}
            onPress={() => {
                props.downButtonHandler();
            }}
            style={{
                position: 'absolute',
                bottom: 5,
                left: 5,
                backgroundColor: colors.primary
            }}
        />
    )
}
