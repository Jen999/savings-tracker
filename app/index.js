import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import * as Font from 'expo-font';

import Home from '../pages/Home';
import MainContainer from './mainContainer';
import { StatusBar } from 'react-native';

const App = () => {

    return (
        // <Home />
        <>
            {/* <StatusBar hidden/> */}
            <MainContainer />
            
        </>
        
    )
}


export default App;