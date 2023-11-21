import React, { useState } from 'react';
import { Text, View, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import styles from './header.style';
import { COLORS, SIZES, FONT } from '../constants';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../Firebase/firebase';


function ForgotPassword(navigation) {
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');

    // Handle submit reset password request
    async function resetPassword () {
        setLoading(true);
        setSuccess('');
        setEmailError('');

        try {
            if (email === '') {
                setEmailError('This is a required field.');
                return;
            }
            await sendPasswordResetEmail(auth, email).then(() => {
                console.log('Password reset link sent out successfully.')
                setSuccess('Password reset link has been sent to your email!');
            }).catch((error) => {
                console.log('Error resetting password', error);
                alert('Reset Password failed: ' + error.message)
            });
        } catch (error) {
            console.log(error);
            alert('Reset Password failed: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{...inputboxStyle.container, marginTop: SIZES.large}}>
            <Text style={inputboxStyle.header}>Enter your email address</Text>
            <Text style={styles.smallText}>Check your email for a link to reset your password.</Text>
            <TextInput 
                style={inputboxStyle.inputbox}
                placeholder='Email' 
                autoCapitalize='none'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
            <View style={{marginTop: 25}}>
            {success ? <Text style={{...styles.successMessage, alignSelf: 'center'}}>{success}</Text> : null}
            { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
            ) : (<>
                <TouchableOpacity style={loginStyles.container} onPress={resetPassword}>
                    <Text style={loginStyles.button}>RESET MY PASSWORD</Text>
                </TouchableOpacity>
            </>)}
            </View>
        </View>
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

export default ForgotPassword;