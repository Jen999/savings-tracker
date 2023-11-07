import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

import styles from './header.style';

function EditGoal() {

    const Stack = createNativeStackNavigator();

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Edit Goal',
                    headerTitleStyle: styles.headerText,
                }}
            /> 
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditGoal;