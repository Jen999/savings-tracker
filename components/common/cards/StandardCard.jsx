import React from 'react'
import { View, Text } from 'react-native'

import styles from './standardcard.style'

const StandardCard = ({item, total}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{item}{total}</Text>
    </View>
  )
}

export default StandardCard