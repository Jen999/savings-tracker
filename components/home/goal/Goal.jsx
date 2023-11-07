import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from '../../../Firebase/firebase';
import { collection, onSnapshot } from "firebase/firestore";

import styles from './goal.style'

const Goal = () => {
  const navigation = useNavigation();

  const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const transactionQuery = collection(db, 'transaction');
        onSnapshot(transactionQuery, (snapshot) => {
            let transactionList = [];
            snapshot.docs.map((doc) => transactionList.push({...doc.data(), id: doc.id}))
            setTransaction(transactionList);
            setLoading(false);
        })
    }, [])

    function calcTotal() {
      let totalSum = 0;
      for (const item of transaction) {
        totalSum += item.amount;
      }
      return totalSum;
    }

    const totalAmount = calcTotal().toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goal</Text>
        <TouchableOpacity>
          <Ionicons name='pencil' style={styles.headerBtn} onPress={() => navigation.navigate('Edit Goal')}/>
        </TouchableOpacity>
      </View>
      <Text style={{ alignSelf: 'center' }}>Total Amount: SGD {totalAmount}</Text>
      <View style={styles.header}>
          <Text>Coffee</Text>
          <Text>SGD 130.00</Text>
      </View>
      
    </View>
  )
}

export default Goal