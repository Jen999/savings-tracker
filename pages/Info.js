import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

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
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default Info;