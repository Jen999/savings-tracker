import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'

import DeleteTransaction from '../DeleteTransaction';

import styles from './transactionbox.style';

const TransactionBox = ({date, category, amount, notes, id}) => {

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate(date)}</Text>
      <View style={{flexDirection: 'row',}}>
        <View style={styles.transactionLeft}>
          <Text style={styles.text}>{category}</Text>
          <Text style={styles.note}>{notes}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text style={styles.amount}>SGD {amount.toFixed(2)}</Text>
          <DeleteTransaction id={id}/>
        </View>
      </View>
    </View>
  )
}

export default TransactionBox