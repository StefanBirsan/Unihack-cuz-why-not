import {
    View,
    StyleSheet,
    TextInput,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";

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
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 24}}>Login</Text>
            <KeyboardAvoidingView behavior="padding">
            <TextInput value={email} style={styles.input} placeholder="Emali" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? <ActivityIndicator size="large" color="#0000ff"/>
                : <>
                    <TouchableOpacity style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={singUp}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </>
            }
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',


    },

    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },

    keyboardContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#3d4737',
        borderRadius: 15,
        padding: 14,
        marginVertical: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    activityIndicator: {
        marginVertical: 16,
    },

});

export default LoginScreen;