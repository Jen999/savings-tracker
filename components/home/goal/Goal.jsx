import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import * as Progress from 'react-native-progress';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "@expo/vector-icons/Ionicons";

import { db } from '../../../Firebase/firebase';
import { collection, onSnapshot } from "firebase/firestore";

import { COLORS, SIZES } from '../../../constants';
import styles from './goal.style'


const Goal = () => {
    const navigation = useNavigation();
    const [transaction, setTransaction] = useState([]);
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handling Goal Type and Amount
    useEffect(() => {
      setLoading(true);
      const goalQuery = collection(db, 'goal');
      onSnapshot(goalQuery, (snapshot) => {
          let goalList = [];
          snapshot.docs.map((doc) => goalList.push({...doc.data(), id: doc.id}))
          setGoal(goalList);
          setLoading(false);
      })
    }, [])

    let goalTotal;
    let goalType;
    if (goal.length > 0) {
      goalTotal = goal[0].amount;
      goalType = goal[0].type;
    } else {
      goalTotal = 0;
      goalType = 'No Goal Added'
    }

    // Handling Transaction Data
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

    let percentage = goalTotal ? Number(totalAmount/goalTotal) : 0;
    let display;
    const exceed = (totalAmount - goalTotal).toFixed(2);

    if (exceed <= 0) {
      display = `${(percentage*100).toFixed(2)}%`
    } else if (exceed > 0) {
      display = `You have exceeded your budget by SGD ${exceed}!`
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Goal</Text>
          <TouchableOpacity>
            <Ionicons name='pencil' style={styles.headerBtn} onPress={() => navigation.navigate('Edit Goal')}/>
          </TouchableOpacity>
        </View>
        <Progress.Bar 
          style={styles.progressBar}
          progress={percentage} 
          height={SIZES.medium}
          width={325} 
          color={COLORS.primary}
        />
        <Text style={(exceed > 0) ? styles.warning : styles.percentage}>{display}</Text>
        
        <View style={styles.header}>
            <Text style={styles.text}>{goalType}</Text>
            <Text style={styles.amount}>SGD {totalAmount} / {goalTotal.toFixed(2)}</Text>
        </View>
      </View>
    )
}

export default Goal