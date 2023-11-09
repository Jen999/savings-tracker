import React from 'react'
import { View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native';

import styles from './insights.style'
import InsightsCard from '../../common/cards/insights/InsightsCard'

const Insights = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Insights')}>
            <Image 
            source={require('../../../assets/icons/chevron-right.png')}
            style={{
              height: 25,
              width: 20,
            }} />
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