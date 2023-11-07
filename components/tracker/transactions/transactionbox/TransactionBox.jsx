import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'

import DeleteTransaction from '../DeleteTransaction';

import styles from './transactionbox.style';

const TransactionBox = ({category, amount, id}) => {
  return (
    <View style={styles.container}>
        <View style={styles.transaction}>
            <Text style={styles.text}>{category}</Text>
            <Text style={styles.amount}>SGD {amount.toFixed(2)}</Text>
        </View>
        <DeleteTransaction id={id}/>
    </View>
  )
}

export default TransactionBox