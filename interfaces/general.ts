import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootTabParamList = {
    Home: {
        checkToken: boolean | null,
    };
    TabTwo: undefined;
    Auth: { secret: string };
    LogOut: undefined;
    Orders: undefined;
    Settings: undefined;
    RelatePosItems: undefined;
    Onboarding: undefined;
    LocationPick: undefined;
    Services: undefined;
    MenuEdit: undefined
};

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Modal: undefined;
    NotFound: undefined;
    Auth: { secret: string };
    LogOut: undefined;
    Home: { checkToken: boolean | null };
    Orders: undefined;
    Settings: undefined;
    RelatePosItems: undefined;
    Onboarding: undefined;
    LocationPick: undefined;
    Services: undefined;
    MenuEdit: undefined;
};

export type ScreenTypesList = "Root" | "Modal" | "NotFound" | "Auth" | "LogOut" | "Home" | "Orders" | "Settings" | "RelatePosItems" | "Onboarding" | "LocationPick" | "Services" | "MenuEdit";

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export interface UpdateDict {
    key: string,
    newValue: any
}

export interface UiTranslation {
    _id: string,
    type: string,
    name: string,
    translations: {
        [index: string]: string
    }
}
