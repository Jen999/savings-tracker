import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from "@expo/vector-icons/Ionicons";

import { collection, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import { COLORS, FONT, SIZES } from '../constants';
import styles from './header.style';


function LoginIn(props) {
    const [hidePass, setHidePass] = useState(true);
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
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={{marginTop: 50, backgroundColor: COLORS.white, height: '100%'}}>
                <Image 
                    source={require('../assets/images/SpendingTracker_white.png')} 
                    style={{
                        resizeMode: 'contain',
                        height: 100,
                        width: '70%',
                        alignSelf: 'center',
                        marginBottom: 20,
                    }}
                />
                <View style={inputboxStyle.container}>
                    <Text style={{...inputboxStyle.header, marginBottom: SIZES.medium}}>Welcome</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Email' 
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={{...inputboxStyle.container, justifyContent: 'center'}}>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Password' 
                        autoCapitalize='none'
                        secureTextEntry={hidePass ? true : false}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Ionicons name={hidePass ? 'eye' : 'eye-off'} 
                        style={{
                            color: COLORS.gray2,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            right: SIZES.xLarge,
                            fontSize: SIZES.large,
                        }} 
                        onPress={() => setHidePass(!hidePass)}
                    />
                </View>
                <View style={inputboxStyle.container}>
                    { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
                    ) : ( 
                        <View >
                            <TouchableOpacity style={loginStyles.container} onPress={signIn}>
                                <Text style={loginStyles.button}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={loginStyles.container} onPress={signUp}>
                                <Text style={loginStyles.button}>CREATE ACCOUNT</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const loginStyles = StyleSheet.create({
    container: {
        color: COLORS.primary, 
        alignSelf: 'center',
        alignItems: 'center',
        width: '70%',
        borderRadius: SIZES.small,
        marginTop: SIZES.large,
        padding: SIZES.small,
        backgroundColor: COLORS.secondary
    },
    button: {
        color: COLORS.white,
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmed,
        fontWeight: '700',
        borderRadius: SIZES.small
    }
})

export default LoginIn;