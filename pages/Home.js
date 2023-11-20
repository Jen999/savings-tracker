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
import { auth, db } from '../Firebase/firebase';
import { COLORS, SIZES } from '../constants';

const Home = ({ navigation }) => {
    const user = auth.currentUser;
    console.log(user.uid)
    const today = new Date();
    const sgTimeString = today.toLocaleString('en-UK', { timeZone: 'Asia/Singapore' });
    const [sgDate, sgTime] = sgTimeString.split(',');
    const [pressedDate, setPressedDate] = useState(null);
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
            setTransaction(transactionList);
            setLoading(false);
        })
    }, []);

    // Handling Pressing on day
    const handleDayPressed = (date) => {
        setPressedDate(date);
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
                dotColor: (date === sgString) ? COLORS.tertiary : COLORS.primary, 
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
                    <StandardCard item={`Day ${sgToday.getDate().toString()}`}/>
                    <Goal today={sgToday} uid={user.uid}/>
                    <Insights uid={user.uid}/>
                    <CustomCalendar handleDayPressed={handleDayPressed} markedDates={markDates()}/>
                    <Text style={{
                        ...styles.subHeaders, 
                        alignSelf: 'center',
                        marginTop: SIZES.small,
                        marginBottom: SIZES.small,
                    }}> {pressedDate ? `Recorded Spendings on ${formatDate(pressedDate)}` : 'Select Date to view Spendings'}</Text>
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