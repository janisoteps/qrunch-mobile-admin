import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import * as AllImages from "../assets/images";
import {AllImagesXface} from "../assets/images";


const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 0,
                    alignSelf: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    height: '100%'
                }}
            >
                <View
                    style={{
                        marginTop: 30,
                        height: 600
                    }}
                >
                    <Image
                        source={(AllImages as AllImagesXface)['qrunchLogo']}
                        style={{
                            width: 200,
                            height: 200,
                            borderRadius: 30,
                            marginTop: 50,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: '500',
                            marginBottom: 50,
                            width: '100%',
                            alignSelf: 'center'
                        }}
                    >
                        Qrunch
                    </Text>

                    <View style={styles.buttons}>
                        <Button
                            title="Sign in"
                            buttonStyle={styles.button}
                            onPress={() => navigation.navigate('Sign In')}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttons: {
        flex: 1,
    },

    button: {
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'black'
    }
});

export default WelcomeScreen;
