import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from './calendar.style';

import { COLORS, SIZES } from '../../../constants';

const Calendar = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image 
              source={require('../../../assets/icons/chevron-left.png')}
              style={styles.chev}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Oct 2023</Text>
          <TouchableOpacity>
            <Image 
              source={require('../../../assets/icons/chevron-right.png')}
              style={styles.chev}
            />
          </TouchableOpacity>
        </View>
      
      <Text style={{ alignSelf: 'center', height: 300 }}>Calendar</Text>
    </ View>
  )
}

export default Calendar