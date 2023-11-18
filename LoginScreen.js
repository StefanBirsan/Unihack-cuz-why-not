import {View, StyleSheet, TextInput, ActivityIndicator, Button} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
            setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch (error) {
            console.log(error);
            alert('Sign in failed!' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const singUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <TextInput value={email} style={styles.input} placeholder="Emali" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? <ActivityIndicator size="large" color="#0000ff"/>
                : <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create account" onPress={singUp} />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        margin: 5,
        color: '#fff',
    },

});

export default LoginScreen;