import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Alert, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import styles from './header.style';
import Chart from '../components/tracker/chart/Chart';
import StandardCard from '../components/common/cards/StandardCard';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import TransactionBox from '../components/tracker/transactions/transactionbox/TransactionBox';
import RemoveRelatedTransaction from '../components/tracker/transactions/RemoveRelatedTransaction';

import { COLORS, SIZES } from '../constants';

function Tracker({ navigation }) {
    const today = new Date();
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
    }, []);

    function calcTotal() {
        let totalSum = 0;
        for (const item of transaction) {
          let itemDate = new Date(item.date)
          if (itemDate.getMonth() === today.getMonth()) {
            totalSum += item.amount;
          }
        }
        return totalSum;
    }
    const totalAmount = calcTotal().toFixed(2);

    const renderItem = ({item}) => {
        return(
            <TransactionBox date={item.date} category={item.category} amount={item.amount} notes={item.notes} id={item.id}/>
        );
    }

    // Handle Clear all
    const handleClearAllPress = () => {
        Alert.alert(
          'Confirm Clear All Transactions',
          'Are you sure you want to clear all transactions?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => RemoveRelatedTransaction(),
            },
          ],
        );
      };

    // Handling if no transactions rendered
    const dataPresent = () => {
        if (transaction.length === 0) {
            return (
                <View style={styles.container}>
                    <Text
                        style={{
                        ...styles.subHeaders,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        }}>
                        No data recorded
                    </Text>
                </View>
            );
        }};

    console.log(transaction);

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
                    <Chart transaction={transaction}/>
                    <StandardCard item='Nov 2023: SGD ' total={totalAmount}/>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginRight: SIZES.medium, 
                        marginLeft: SIZES.medium,
                        marginBottom: SIZES.smallMargin,
                    }}>
                        <Text style={styles.subHeaders}>All Recorded Spendings</Text>
                        <Text 
                            style={{...styles.smallText, marginTop: 7}}
                            onPress={() => handleClearAllPress()}
                        >Clear all</Text>
                    </View>
                    {dataPresent()}
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