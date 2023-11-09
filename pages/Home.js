import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

import styles from './header.style';

import { COLORS, SIZES } from '../constants';
import Insights from '../components/home/insights/Insights';
import Goal from '../components/home/goal/Goal';
import CustomCalendar from '../components/home/calendar/Calendar';
import StandardCard from '../components/common/cards/StandardCard';

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
                <StandardCard item='Day 12'/>
                <Goal />
                <Insights />
                <CustomCalendar />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home