import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Button } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { auth } from '../Firebase/firebase';
import styles from './header.style';



function Info({ navigation }) {
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
                <Button onPress={() => auth.signOut()} title='Log Out'/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Info;