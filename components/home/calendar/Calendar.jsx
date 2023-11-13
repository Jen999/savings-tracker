import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

import styles from './calendar.style';
import { COLORS, FONT, SIZES } from '../../../constants';

const CustomCalendar = React.memo(({ dayPressed, markedDates }) => {

    console.log('markedDates: ',markedDates);
    return (
      <View style={styles.container}>
        <Calendar 
          theme={{
            monthTextColor: COLORS.primary,
            todayTextColor: COLORS.tertiary,
            todayBackgroundColor: COLORS.secondary,
            textMonthFontSize: SIZES.large,
            textMonthFontFamily: FONT.medium,
          }}
          renderArrow={
            (direction) => direction === 'left' ? <Image 
            source={require('../../../assets/icons/chevron-left.png')}
            style={styles.chev} /> : <Image 
            source={require('../../../assets/icons/chevron-right.png')}
            style={styles.chev} />}
          enableSwipeMonths={false}
          onDayPress={(day) => dayPressed(day)}
          markedDates={markedDates}
        />
      </ View>
    )
});

export default CustomCalendar