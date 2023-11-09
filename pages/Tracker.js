import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import styles from './header.style';
import Chart from '../components/tracker/chart/Chart';
import StandardCard from '../components/common/cards/StandardCard';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import DeleteTransaction from '../components/tracker/transactions/DeleteTransaction';
import TransactionBox from '../components/tracker/transactions/transactionbox/TransactionBox';

import { COLORS, SIZES } from '../constants';

function Tracker({ navigation }) {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const transactionQuery = collection(db, 'transaction');
        onSnapshot(transactionQuery, (snapshot) => {
            let transactionList = [];
            snapshot.docs.map((doc) => transactionList.push({...doc.data(), id: doc.id}))

            transactionList.sort((a, b) => {
                const dateA = a.date ? new Date(a.date) : null;
                const dateB = b.date ? new Date(b.date) : null;
          
                return dateB - dateA;
            });

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

    const renderItem = ({item}) => {
        return(
            <TransactionBox date={item.date} category={item.category} amount={item.amount} id={item.id}/>
        );
    }

    // console.log(transaction);

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Tracker',
                    headerTitleStyle: styles.headerText,
                }}
            />
            <FlatList
                nestedScrollEnabled={true}
                ListHeaderComponent={() => (
                <>
                    <Chart />
                    <StandardCard item='Nov 2023: SGD ' total={totalAmount}/>
                </>
                )}
                data={transaction} 
                renderItem={renderItem} 
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default Tracker;