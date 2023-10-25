import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

import styles from './header.style';

import { COLORS, SIZES } from '../constants';
import Insights from '../components/home/insights/Insights';
import Goal from '../components/home/goal/Goal';
import Calendar from '../components/home/calendar/Calendar';

const Home = ({ navigation }) => {

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Home',
                    headerTitleStyle: styles.headerText,
                }}
            /> 
            <ScrollView>
                <View 
                    style={{ 
                        flex: 1,
                        alignItems: 'center', 
                        alignSelf: 'center',
                        backgroundColor: COLORS.secondary,
                        width: 80,
                        margin: SIZES.smallMargin,
                        padding: SIZES.smallMargin,
                        borderRadius: SIZES.smallMargin
                    }}>
                    <Text 
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.medium,
                            fontWeight: 600
                        }}>Day 12</Text>
                </View>
                <Goal />
                <Insights />
                <Calendar />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home