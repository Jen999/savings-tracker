import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './goal.style'

const Goal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goal</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>➤</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Goal