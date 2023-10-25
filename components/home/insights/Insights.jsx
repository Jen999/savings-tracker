import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './insights.style'
import InsightsCard from '../../common/cards/insights/InsightsCard'

const Insights = () => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>➤</Text>
        </TouchableOpacity>
      </View>

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