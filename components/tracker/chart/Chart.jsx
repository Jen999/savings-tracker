import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './chart.style'

const Chart = () => {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Charthere</Text>
        </View>
    </View>
  )
}

export default Chart