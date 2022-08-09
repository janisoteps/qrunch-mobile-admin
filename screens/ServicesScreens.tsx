import {RootTabScreenProps} from "../interfaces/general";
import {SafeAreaView, ScrollView, Text} from "react-native";
import {useTheme} from "@react-navigation/native";
import Layout from "../constants/layout";
import * as React from "react";

export default function ServicesScreen({route, navigation}: RootTabScreenProps<'Services'>) {
    const {colors} = useTheme();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                alignSelf: 'stretch',
                backgroundColor: colors.background
            }}
        >
            <ScrollView
                style={{
                    marginTop: Layout.headerHeight,
                    paddingTop: 40,
                    marginHorizontal: 20,
                    flex: 1,
                    backgroundColor: colors.background,
                    alignSelf: 'stretch',
                    padding: 0
                }}
            >
                <Text
                    style={{
                        fontWeight: '500',
                        fontSize: 17,
                        margin: 20
                    }}
                >
                    Services
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}
