import React from "react";
import { Stack, useRouter } from 'expo-router';

import { NavigationContainer } from "@react-navigation/native";
import { createBottom, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES } from "../constants";

// Pages
import Home from "../pages/Home";
import Tracker from "../pages/Tracker"
import AddTransactions from "../pages/AddTransactions";
import Insights from "../pages/Insights";
import Info from "../pages/Info";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

// Page names
const homeName = 'Home';
const trackerName = 'Tracker';
const addTransactionsName = 'AddTransactions';
const insightsName = 'Insights';
const infoName = 'Info';

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    return (
        <>
        
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerShown: false
                }}
            />
        </SafeAreaView>
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (rn === trackerName) {
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                        } else if (rn === addTransactionsName) {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        } else if (rn === insightsName) {
                            iconName = focused ? 'bulb' : 'bulb-outline';
                        } else if (rn === infoName) {
                            iconName = focused ? 'settings' : 'settings-outline';
                        } 
                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: COLORS.tertiary,
                    tabBarInactiveTintColor: COLORS.secondary,
                    tabBarStyle: {padding: SIZES.smallMargin, height: 60},
                    tabBarLabelStyle: { paddingBottom: SIZES.smallMargin },
                    // headerShown: false
                })}>
                
                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={trackerName} component={Tracker} />
                <Tab.Screen name={addTransactionsName} component={AddTransactions} />
                <Tab.Screen name={insightsName} component={Insights} />
                <Tab.Screen name={infoName} component={Info} />

            </Tab.Navigator>
        </NavigationContainer>
        </>
    )
}