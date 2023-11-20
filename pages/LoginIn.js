import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

import { collection, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import styles from './header.style';


function LoginIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Logging into existing account
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign In failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    // Creating new account
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password).then(user => {
                setDoc(doc(db, 'users', user.user.uid), {
                    email: user.user.email,
                })
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign Up failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView>
            <View style={inputboxStyle.container}>
                <KeyboardAvoidingView behavior='padding'>
                    <Text>Log In</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='email' 
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='password' 
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    { loading ? (<ActivityIndicator size="large" color='black'/>
                    ) : ( 
                        <>
                        <Button title='Login' onPress={signIn} />
                        <Button title='Create Account' onPress={signUp} />
                        </>
                    )}
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

export default LoginIn;