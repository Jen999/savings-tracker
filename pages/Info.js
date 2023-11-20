import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

import { NavigationProp } from '@react-navigation/native';
import { auth } from '../Firebase/firebase';
import styles from './header.style';
import { COLORS, FONT, SIZES } from '../constants';

function Info({ navigation }) {
    const user = auth.currentUser;
    console.log(user.uid)
    const [darkmode, setDarkmode] = useState(false);

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Settings',
                    headerTitleStyle: styles.headerText,
                }}
            /> 
            <ScrollView>
                <Text style={settingStyles.header}>General</Text>
                <View style={settingStyles.container}>
                    <View style={settingStyles.inner}>
                        <Ionicons name='person-sharp' style={{...settingStyles.icon, fontSize: SIZES.large}}/>
                        <Text style={settingStyles.text}>Account Info</Text>
                    </View>
                    <Ionicons name='chevron-forward' style={{...settingStyles.icon, fontSize: SIZES.xLarge}}/>
                </View>
                <View style={settingStyles.container}>
                    <View style={settingStyles.inner}>
                        <Ionicons name='moon' style={{...settingStyles.icon, fontSize: SIZES.large}}/>
                        <Text style={settingStyles.text}>Dark Mode</Text>
                    </View>
                    <Ionicons 
                        name='toggle'
                        style={darkmode ? {...settingStyles.icon, fontSize: SIZES.xLarge, color: COLORS.tertiary} 
                            : {...settingStyles.icon, fontSize: SIZES.xLarge, transform: [{rotateY: '180deg'}]}}
                        onPress={() => setDarkmode(!darkmode)}
                    />
                </View>
                <Text style={settingStyles.header}>Support</Text>
                <View style={settingStyles.container}>
                    <View style={settingStyles.inner}>
                        <Ionicons name='help-circle-outline' style={{
                        color: COLORS.primary, 
                        marginLeft: SIZES.xSmall,
                        marginRight: SIZES.xSmall, 
                        fontSize: SIZES.xLarge }}/>
                        <Text style={settingStyles.text}>Contact Us</Text>
                    </View>
                    <Ionicons name='chevron-forward' style={{...settingStyles.icon, fontSize: SIZES.xLarge}}/>
                </View>
                <TouchableOpacity style={settingStyles.buttonContainer} onPress={() => auth.signOut()}>
                    <Text style={settingStyles.button}>LOG OUT</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const settingStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderWidth: 0.2,
        borderColor: COLORS.primary,
        paddingTop: SIZES.small,
        paddingBottom: SIZES.small,
    },
    inner: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        color: COLORS.primary, 
        marginLeft: SIZES.small,
        marginRight: SIZES.small
    },
    header: {
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        margin: SIZES.smallMargin,
        marginTop: SIZES.large,
    },
    text: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.primary,
    },
    buttonContainer: {
        color: COLORS.primary, 
        alignSelf: 'center',
        alignItems: 'center',
        width: '70%',
        borderRadius: SIZES.small,
        marginTop: SIZES.xxxLarge,
        padding: SIZES.small,
        backgroundColor: COLORS.secondary,
    },
    button: {
        color: COLORS.white,
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmed,
        fontWeight: '700',
        borderRadius: SIZES.small,
    }
})

export default Info;