import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import { collection, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import { COLORS, FONT, SIZES } from '../constants';
import styles from './header.style';


function LoginIn() {
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Logging into existing account
    const signIn = async () => {
        setLoading(true);
        // Reset error messages
        setEmailError('');
        setPasswordError('');

        try {
            if (email === '') {
                setEmailError('This is a required field.');
                return;
            }
            if (password === '') {
                setPasswordError('This is a required field.');
                return;
            }
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign In failed: ' + error.message)
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
                    {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
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
                <View style={{width: '95%', alignSelf: 'center', padding: SIZES.smallMargin, marginTop: -10}}>
                    {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                </View>
                <View>
                    <Text 
                        style={{...styles.smallText, textDecorationLine: 'underline', margin: SIZES.smallmed}}
                        onPress={() => navigation.navigate('Reset Password')}
                    >Forgot Password?</Text>
                </View>
                <View style={inputboxStyle.container}>
                    { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
                    ) : ( 
                        <View>
                            <TouchableOpacity style={loginStyles.container} onPress={signIn}>
                                <Text style={loginStyles.button}>LOGIN</Text>
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: SIZES.xxxLarge}}>
                                <Text>Don't have an account? </Text>
                                <TouchableOpacity  onPress={() => navigation.navigate('Create Account')}>
                                    <Text style={{color: COLORS.tertiary, fontFamily: FONT.medium, fontWeight: '700'}}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
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