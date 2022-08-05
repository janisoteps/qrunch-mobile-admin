import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  useAuthentication from '../utils/hooks/useAuthentication';
import { Button } from 'react-native-elements';
import {fbAuth} from "../config/firebase";
import { signOut } from 'firebase/auth';

export default function LogOutScreen() {
    const { user } = useAuthentication();

    return (
        <View style={styles.container}>
            <Text>Log out from {user?.email} account.</Text>

            <Button title="Sign Out" style={styles.button} onPress={() => signOut(fbAuth)} />
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
    }
});