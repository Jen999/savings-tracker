import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

import styles from './calendar.style';

import { COLORS, FONT, SIZES } from '../../../constants';

const CustomCalendar = () => {
  return (
    <View style={styles.container}>
      <Calendar 
        theme={{
          monthTextColor: COLORS.primary,
          todayTextColor: COLORS.tertiary,
          textMonthFontSize: SIZES.large,
          textMonthFontFamily: FONT.medium,
          todayBackgroundColor: COLORS.primary
        }}
        renderArrow={
          (direction) => direction === 'left' ? <Image 
          source={require('../../../assets/icons/chevron-left.png')}
          style={styles.chev} /> : <Image 
          source={require('../../../assets/icons/chevron-right.png')}
          style={styles.chev} />}
        enableSwipeMonths={true}
        
      />
    </ View>
  )
}

export default CustomCalendar