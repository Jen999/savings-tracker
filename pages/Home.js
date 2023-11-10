import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, FlatList } from 'react-native';

import styles from './header.style';

import Insights from '../components/home/insights/Insights';
import Goal from '../components/home/goal/Goal';
import CustomCalendar from '../components/home/calendar/Calendar';
import StandardCard from '../components/common/cards/StandardCard';
import TransactionBox from '../components/tracker/transactions/transactionbox/TransactionBox';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import { COLORS, SIZES } from '../constants';

const Home = ({ navigation }) => {
    const today = new Date();
    const [pressedDate, setPressedDate] = useState(null);
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
    }, []);

    console.log(transaction)

    // Handling Pressing on day
    const handleDayPressed = (day) => {
        const selectedDate = day.dateString
        setPressedDate(selectedDate);
    }

    // Handling Marking of days with transactions and Marking of selected date
    const markDates = () => {
        let markedDatesSet = new Set();
        const formattedMarkedDates = {};
        for (const item of transaction) {
            const date = item.date;
            markedDatesSet.add(date);
        }
        const markedDatesList = Array.from(markedDatesSet);
        markedDatesList.forEach((date) => {
            formattedMarkedDates[date] = { 
                marked: true, 
                dotColor: COLORS.primary, 
                selected: date === pressedDate, 
                selectedColor: COLORS.tertiary
            };
        })
        if (pressedDate && !markedDatesSet.has(pressedDate)) {
            formattedMarkedDates[pressedDate] = {
                selected: true,
                selectedColor: COLORS.tertiary
            }
        }
        return formattedMarkedDates
    }

    // Handling rendering of by-selected-date transactions
    const renderItem = ({item}) => {
        if (pressedDate && item.date === pressedDate) {
            return(
            <TransactionBox date={item.date} category={item.category} amount={item.amount} id={item.id}/>
            );
        } else {
            return null;
        }
    }

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
      };


    // Handling if no transactions rendered
    const dataPresent = () => {
        if (!(pressedDate && transaction.some((item) => item.date === pressedDate))) {
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
    
    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Home',
                    headerTitleStyle: styles.headerText,
                }}
            />
            <FlatList
                nestedScrollEnabled={true}
                ListHeaderComponent={() => (
                <>
                    <StandardCard item={`Day ${today.getDate().toString()}`}/>
                    <Goal />
                    <Insights />
                    <CustomCalendar dayPressed={handleDayPressed} markedDates={markDates()}/>
                    <Text style={{
                        ...styles.subHeaders, 
                        alignSelf: 'center',
                        marginTop: SIZES.small,
                        marginBottom: SIZES.small,
                    }}>Recorded Spendings on {pressedDate ? formatDate(pressedDate) : formatDate(today)}</Text>
                    {dataPresent()}
                </>
                )}
                data={transaction} 
                renderItem={renderItem} 
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default Home