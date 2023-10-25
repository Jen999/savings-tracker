import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from './goal.style'

const Goal = ({navigate}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Goal</Text>
          <Text style={styles.headerBtn}>➤</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ alignSelf: 'center' }}>Progressbar</Text>
      <View style={styles.header}>
          <Text>Coffee</Text>
          <Text>SGD 130.00</Text>
      </View>
      
    </View>
  )
}

export default Goal