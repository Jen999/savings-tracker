import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";

import MainContainer from './mainContainer';
import EditGoal from '../pages/EditGoal';
import LoginIn from '../pages/LoginIn';
import ForgotPassword from '../pages/ForgotPassword';
import styles from '../pages/header.style';
import { COLORS } from '../constants';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase';


const initialPage = 'LogIn';

const Stack = createNativeStackNavigator();

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log('user:', user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator 
                initialRouteName={initialPage}
                screenOptions={{headerShown: false}}>
                {user ? (<>
                <Stack.Screen 
                    name='MainContainer' 
                    component={MainContainer} 
                />
                <Stack.Screen 
                    name='Edit Goal' 
                    component={EditGoal} 
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: COLORS.secondary},
                        headerShadowVisible: true,
                        headerTitle: 'Edit Goal',
                        headerTitleStyle: styles.headerText,
                    }}
                />
                </>) : (<>
                <Stack.Screen 
                    name='LogIn'
                    component={LoginIn}
                />
                <Stack.Screen 
                    name='Reset Password'
                    component={ForgotPassword}
                    options={{
                        headerShown: true,
                        headerStyle: {backgroundColor: COLORS.secondary},
                        headerShadowVisible: true,
                        headerTitle: 'Reset Password',
                        headerTitleStyle: styles.headerText,
                    }}
                />
                </>)}
                
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;