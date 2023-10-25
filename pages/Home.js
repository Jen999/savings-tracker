import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

import { COLORS, FONT, SIZES } from "../constants";
import { Insights, Goal } from '../components';

const Home = ({navigation}) => {
    const router = useRouter();

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Home',
                    headerTitleStyle: styles.headerText
                }}
            />
            <ScrollView>
                <View>
                    <Text>Day 12</Text>
                </View>
                <Goal />
                <Insights />
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
    },
    headerText: {
        color: COLORS.white,
        fontSize: SIZES.xLarge
    }
})


export default Home