import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './insights.style'
import InsightsCard from '../../common/cards/insights/InsightsCard'

const Insights = () => {

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Insights</Text>
          <Text style={styles.headerBtn}>➤</Text>
        </View>
      </TouchableOpacity>
      <View>
        <InsightsCard 
          item="You have already spent 10% more than last month on Coffee!"
        />
        <InsightsCard 
          item="You have only spent 10% of your Shopping budget!"
        />
      </View>
    </View>
  )
}

export default Insights