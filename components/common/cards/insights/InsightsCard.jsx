import React from 'react'
import { View, Text } from 'react-native'

import styles from './insightscard.style'

const InsightsCard = ({date, insight, prompt, id}) => {

  const warning = ['Oh no! ', 'Watch out! ', 'Uh-oh... '];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={warning.includes(prompt) ? styles.promptRed : styles.promptGreen}>{prompt}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={{...styles.text, }}>{insight}</Text>
      </View>
    </View>
  )
}

export default InsightsCard