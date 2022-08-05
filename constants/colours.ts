import {Provider as PaperProvider, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

export interface SingleColour {
    rgb: string,
    hex: string
}

export interface ColoursConstants {
    [index: string]: SingleColour
}

export const coloursConstants: ColoursConstants = {
    primaryColor: {
        hex: '#3f50b5',
        rgb: '63, 80, 181'
    },
    primaryPinkColor: {
        hex: '#f60159',
        rgb: '246, 1, 89'
    },
    primaryPurpleColor: {
        hex: '#8c90e5',
        rgb: '140, 144, 229'
    },
    successColor: {
        hex: '#73af4c',
        rgb: '115, 175, 76'
    },
    disabledColor: {
        hex: '#969696',
        rgb: '150, 150, 150'
    },
    cardBackgroundColorDark: {
        hex: '#3b393e',
        rgb: '59,57,62'
    },
    backgroundColorDark: {
        hex: '#252428',
        rgb: '37,36,40',
    },
    textColorDark: {
        hex: '#282524',
        rgb: '40,37,36',
    },
    cardBackgroundColorLight: {
        hex: '#FFFFFF',
        rgb: '255,255,255'
    },
    backgroundColorLight: {
        hex: '#f7f7f7',
        rgb: '242,242,242'
    },
    errorColor: {
        hex: '#ff2d55',
        rgb: '255,45,85'
    },
    posPurple: {
        hex: '#5014a9',
        rgb: '80,20,169'
    },
    onSurfaceColour: {
        hex: '#DEDEDEFF',
        rgb: '222, 222, 222'
    }
};

export const QrunchPaperTheme = {
    ...PaperDefaultTheme,
    roundness: 10,
    colors: {
        text: coloursConstants.textColorDark.hex,
        surface: coloursConstants.backgroundColorLight.hex,
        onSurface: coloursConstants.onSurfaceColour.hex,
        accent: '#f1c40f',
        error: coloursConstants.errorColor.hex,
        success: coloursConstants.successColor.hex,
        disabled: coloursConstants.disabledColor.hex,
        placeholder: 'rgb(50, 40, 40)',
        notification: coloursConstants.primaryColor.hex,
        backdrop: coloursConstants.backgroundColorLight.hex,
        primary: coloursConstants.primaryColor.hex,
        background: coloursConstants.backgroundColorLight.hex
    }
};
