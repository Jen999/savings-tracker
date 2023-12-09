import React, { useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";

import { collection, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import { COLORS, FONT, SIZES } from '../constants';
import styles from './header.style';

function CreateAccount(props) {
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [hideConfirmPass, setHideConfirmPass] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [success, setSuccess] = useState('');
    

    // Creating new account
    const signUp = async () => {
        setLoading(true);
        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setSuccess('');

        try {
            if (email === '') {
                setEmailError('This is a required field.');
                alert('Enter a valid email address and password above before clicking on "Create Account".');
                return;
            }
            if (password === '') {
                setPasswordError('This is a required field.');
                alert('Enter a valid email address and password above before clicking on "Create Account".');
                return;
            }
            if (password !== confirmPassword) {
                setConfirmPasswordError('Password Mismatch.');
                alert('Please ensure Password and Confirm Password matches.');
                return;
            }
            const response = await createUserWithEmailAndPassword(auth, email, password).then(user => {
                setDoc(doc(db, 'users', user.user.uid), {
                    email: user.user.email,
                })
            });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign Up failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={{backgroundColor: COLORS.white, height: '100%'}}>
                <View style={{...inputboxStyle.container, marginTop: 0}}>
                    <Text style={inputboxStyle.header}>Email</Text>
                    <Text style={styles.smallText}>Please enter a{' '}
                        <Text style={{...styles.smallText, textDecorationLine: 'underline', fontWeight: '700', color: COLORS.secondary}}>valid</Text>
                        {' email address to ensure a seamless verification and authentication process.'}
                    </Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Email' 
                        autoCapitalize='none'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Password</Text>
                    <View style={{justifyContent: 'center'}}>
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
                </View>
                <View style={{width: '95%', alignSelf: 'center', padding: SIZES.smallMargin, marginTop: -10}}>
                    {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Confirm Password</Text>
                    <View style={{justifyContent: 'center'}}>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Confirm Password' 
                        autoCapitalize='none'
                        secureTextEntry={hideConfirmPass ? true : false}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <Ionicons name={hideConfirmPass ? 'eye' : 'eye-off'} 
                        style={{
                            color: COLORS.gray2,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            right: SIZES.xLarge,
                            fontSize: SIZES.large,
                        }} 
                        onPress={() => setHideConfirmPass(!hideConfirmPass)}
                    />
                    </View>
                </View>
                <View style={{width: '95%', alignSelf: 'center', padding: SIZES.smallMargin, marginTop: -10}}>
                    {confirmPasswordError ? <Text style={styles.errorMessage}>{confirmPasswordError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
                    ) : ( 
                        <View>
                            <TouchableOpacity style={loginStyles.container} onPress={signUp}>
                                <Text style={loginStyles.button}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {success ? <Text style={{...styles.successMessage, alignSelf: 'center'}}>{success}</Text> : null}
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

export default CreateAccount;