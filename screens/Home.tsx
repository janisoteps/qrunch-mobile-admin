import React, {useContext} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import  useAuthentication from '../utils/hooks/useAuthentication';
import AuthContext from "../components/auth/authContext";
import SettingsContext from "../components/settings/settingsContext";
import {coloursConstants} from "../constants/colours";
import {AllImagesXface} from "../assets/images";
import * as AllImages from "../assets/images";
import Layout from "../constants/layout";
import AccountPicker from "../components/account/AccountPicker";


export default function HomeScreen() {
    const { user } = useAuthentication();
    const authContext = useContext(AuthContext);
    const settingsContext = useContext(SettingsContext);

    const userName =  settingsContext.firstName
        ? settingsContext.firstName : settingsContext.userData ? settingsContext.userData.userName : null;

    return (
        <View style={styles.container}>
            <SafeAreaView
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: settingsContext.isMobile ? 20 : 120,
                    alignSelf: 'stretch',
                    backgroundColor: coloursConstants.backgroundColorLight.hex,
                }}
            >
                {!!authContext.authToken && (
                    <Image
                        source={(AllImages as AllImagesXface)['qrunchLogo']}
                        style={{
                            width: 300,
                            height: 300,
                            borderRadius: 50,
                            marginTop: 50,
                            marginBottom: 50
                        }}
                    />
                )}

                <Text
                    style={{
                        fontSize: 20
                    }}
                >
                    Welcome {user?.email}!
                </Text>

                <View style={styles.separator} />

                <ScrollView
                    style={{
                        marginTop: Layout.headerHeight,
                        marginHorizontal: 20,
                        flex: 1,
                        backgroundColor: coloursConstants.backgroundColorLight.hex,
                        alignSelf: 'stretch',
                        padding: 0,
                    }}
                >
                    <AccountPicker />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
