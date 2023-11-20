import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

import styles from './calendar.style';
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, FONT, SIZES } from '../../../constants';

const CustomCalendar = React.memo(({ handleDayPressed, markedDates }) => {

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
          renderArrow={ (direction) => 
            direction === 'left' ? (
              <Ionicons name='chevron-back' style={styles.chev} />
            ) : (
             <Ionicons name='chevron-forward' style={styles.chev} />
            )
          }
          enableSwipeMonths={false}
          onDayPress={(day) => handleDayPressed(day.dateString)}
          markedDates={markedDates}
        />
      </ View>
    )
});

export default CustomCalendar