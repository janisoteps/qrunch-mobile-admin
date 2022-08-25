import {IconButton, useTheme} from "react-native-paper";
import React from "react";

interface ScrollUpButtonProps {
    upButtonHandler: () => void
}

export default function ScrollUpButton(props: ScrollUpButtonProps) {
    const {colors} = useTheme();

    return (
        <IconButton
            icon="chevron-up"
            color={'white'}
            size={30}
            onPress={() => {
                props.upButtonHandler();
            }}
            style={{
                position: 'absolute',
                top: 45,
                right: 0,
                backgroundColor: colors.primary
            }}
        />
    )
}
