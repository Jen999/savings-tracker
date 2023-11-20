import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Alert, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import styles from './header.style';
import Chart from '../components/tracker/chart/Chart';
import StandardCard from '../components/common/cards/StandardCard';

import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import TransactionBox from '../components/tracker/transactions/transactionbox/TransactionBox';
import RemoveRelatedTransaction from '../components/tracker/transactions/RemoveRelatedTransaction';

import { COLORS, SIZES } from '../constants';
import ClearAll from '../components/common/cards/ClearAll';

function Tracker({ navigation }) {
    const user = auth.currentUser;
    console.log(user.uid)
    const today = new Date();
    const sgTimeString = today.toLocaleString('en-UK', { timeZone: 'Asia/Singapore' });
    const [sgDate, sgTime] = sgTimeString.split(',');
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    function convertDate(date) {
        const [day, month, year] = date.split('/');
        const dateString = [year, month, day].join('-');
        return dateString;
    };
    const sgString = convertDate(sgDate);
    const sgToday = new Date(sgString);

    useEffect(() => {
        setLoading(true);
        const transactionQuery = collection(db, `users/${user.uid}/transaction`);
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
          if (itemDate.getMonth() === sgToday.getMonth()) {
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

    // Handle Clear all transactions
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
                    <ClearAll header='All Recorded Spendings' handlePress={handleClearAllPress}/>
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