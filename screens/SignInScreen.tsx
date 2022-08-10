import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {fbAuth} from "../config/firebase";
import {coloursConstants} from "../constants/colours";


const SignInScreen = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(fbAuth, value.email, value.password);
        } catch (error) {
            console.log(`signIn: ${error}`)
            const parsedErrorMessage = `${error.message}`.includes('wrong-password')
                ? 'Error: Wrong password' : error.message;
            setValue({
                ...value,
                error: parsedErrorMessage,
            })
        }
    }

    return (
        <View style={styles.container}>
            {!!value.error && <View style={styles.error}><Text style={{color: 'white'}}>{value.error}</Text></View>}

            <View
                style={styles.controls}
            >
                <Input
                    placeholder='Email'
                    containerStyle={styles.control}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                    autoCompleteType={'email'}
                />

                <Input
                    placeholder='Password'
                    containerStyle={styles.control}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='key'
                        size={16}
                    />}
                    autoCompleteType={'password'}
                />

                <Button
                    title="Sign in"
                    buttonStyle={{
                        backgroundColor: coloursConstants.primaryColor.hex,
                        borderRadius: 20,
                    }}
                    onPress={signIn}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
    },

    controls: {
        height: 400
    },

    control: {
        marginTop: 10,
        width: 300
    },

    error: {
        marginTop: 10,
        padding: 20,
        borderRadius: 15,
        color: '#fff',
        backgroundColor: '#e62210',
    }
});

export default SignInScreen;
