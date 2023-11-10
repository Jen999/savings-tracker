import React from 'react'
import { View, Text } from 'react-native'

import styles from './insightscard.style'

const InsightsCard = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item}</Text>
    </View>
  )
}

export default InsightsCard