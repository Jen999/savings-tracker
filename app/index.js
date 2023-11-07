import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import { NavigationContainer } from "@react-navigation/native";

import MainContainer from './mainContainer';
import EditGoal from '../pages/EditGoal';



const mainPage = 'MainContainer';

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator 
                initialRouteName={mainPage}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name='MainContainer' component={MainContainer} />
                <Stack.Screen name='Edit Goal' component={EditGoal} options={{headerShown: true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;