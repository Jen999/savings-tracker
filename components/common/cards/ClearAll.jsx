import React from 'react'
import { View, Text } from 'react-native'

import styles from './clearall.style'

const ClearAll = ({header, handlePress}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.subHeaders}>{header}</Text>
        <Text 
            style={styles.clearall}
            onPress={() => handlePress()}
        >Clear all</Text>
    </View>
  )
}

export default ClearAll