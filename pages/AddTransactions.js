import React, { useState, useEffect } from 'react';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { View, Image, SafeAreaView, ScrollView, Text, TextInput, Pressable, Button, Modal, ActivityIndicator } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import styles from './header.style';
import chevStyle from '../components/home/calendar/calendar.style';
import inputboxStyle from '../components/add/inputbox/inputbox.style';
import SaveButton from '../components/add/savebutton/SaveButton';
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES, FONT } from '../constants';

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import { Calendar } from 'react-native-calendars';


function AddTransactions({ navigation }) {
    const user = auth.currentUser;
    console.log(user.uid)
    const [transaction, setTransaction] = useState({date: '', amount: '', category: '', notes:''});
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [dateError, setDateError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [success, setSuccess] = useState('');

    const openCalendar = () => {
        setCalendarVisible(true);
    };

    const closeCalendar = () => {
        setCalendarVisible(false);
    };

    const handleDateSelect = date => {
        setTransaction({...transaction, date: date.dateString});
        closeCalendar();
    };

    useFocusEffect(
        React.useCallback(() => {
            // Reset error messages everytime toggling page
            setTypeError('');
            setAmountError('');
            setDateError('');
            setSuccess('');
        }, [])
    );

    async function addTransaction() {
        setLoading(true);
        // Reset error messages
        setTypeError('');
        setAmountError('');
        setDateError('');
        setSuccess('');
        try {
            transaction.amount = Number(transaction.amount);
            if (transaction.date === '') {
                setDateError('This is a required field.');
                return;
            }
            if (!transaction.category) {
                setTypeError('This is a required field.');
                return;
            }
            if (transaction.category !== goal[0].type) {
                setTypeError('Invalid Spending Type.');
                return;
            }
            if (isNaN(transaction.amount) || transaction.amount <= 0) {
                setAmountError('Invalid Spending Budget.');
                return;
            }
            
            const transactionsDb = collection(db, `users/${user.uid}/transaction`);
            await addDoc(transactionsDb, {
                date: transaction.date,
                amount: transaction.amount,
                category: transaction.category,
                notes: transaction.notes,
            }).then(() => {
                console.log('Transaction added successfully');
                setSuccess('Transaction added successfully!');
            }).catch((error) => {
                console.log('Error adding transaction', error);
            });
        } catch (error) {
            console.error('Error in adding transaction', error)
        } finally {
            setLoading(false);
        }
    }

    // Handling Dropdown List Goal Type
    useEffect(() => {
        setLoading(true);
        const goalQuery = collection(db, `users/${user.uid}/goal`);
        onSnapshot(goalQuery, (snapshot) => {
            let goalList = [];
            snapshot.docs.map((doc) => goalList.push({...doc.data(), id: doc.id}))
            setGoal(goalList);
            setLoading(false);
        })
    }, [])

    const uniqueTypes = [...new Set(goal.map(item => item.type))];
    const dropdownData = uniqueTypes.map((value, index) => ({
        key: (index + 1).toString(),
        value: value,
    }));

    console.log('goal: ',goal);

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Add Spending',
                    headerTitleStyle: styles.headerText,
                }}
            /> 
            <ScrollView style={{marginTop: 10}}>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Date*</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        value={transaction.date.toString()}
                        placeholder="Select Date"
                        placeholderTextColor={'black'}
                        onFocus={openCalendar}
                    />
                    <Ionicons 
                        name='calendar-outline' 
                        style={{
                            fontSize: SIZES.large,
                            color: COLORS.gray2, 
                            position: 'absolute', 
                            right: SIZES.xLarge, 
                            alignSelf: 'center'}}
                    />
                    </View>
                    <Modal
                        visible={isCalendarVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={closeCalendar}
                    >
                        <Calendar 
                            onDayPress={(day) => { handleDateSelect(day); closeCalendar(); }}
                            theme={{
                                monthTextColor: COLORS.primary,
                                todayTextColor: COLORS.tertiary,
                                todayBackgroundColor: COLORS.secondary,
                                textMonthFontSize: SIZES.large,
                                textMonthFontFamily: FONT.medium,
                                todayDotColor: COLORS.primary
                              }}
                              renderArrow={
                                (direction) => direction === 'left' ? <Ionicons name='chevron-back'
                                style={chevStyle.chev} /> : <Ionicons name='chevron-forward'
                                style={chevStyle.chev} />}
                        />
                    </Modal>
                    {dateError ? <Text style={styles.errorMessage}>{dateError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Type of Spending*</Text>
                    <SelectList
                        placeholder='Select Type of Spending'
                        searchPlaceholder='Search'
                        boxStyles={inputboxStyle.dropdownbox}
                        dropdownStyles={inputboxStyle.dropdownbox}
                        dropdownShown={false}
                        data={dropdownData}
                        save="value"
                        setSelected={(text) => setTransaction({...transaction, category: text})}
                    />
                    {typeError ? <Text style={styles.errorMessage}>{typeError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Amount*</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Enter Spending Amount (SGD)'
                        placeholderTextColor={'black'}
                        value={transaction.amount.toString()}
                        onChangeText={(text) => setTransaction({...transaction, amount: text})}
                    />
                    {amountError ? <Text style={styles.errorMessage}>{amountError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Notes</Text>
                    <Text style={styles.smallText}>(Optional)</Text>
                    <TextInput 
                        multiline={true}
                        style={{...inputboxStyle.inputbox}}
                        placeholder='Enter Notes'
                        placeholderTextColor={'black'}
                        value={transaction.notes.toString()}
                        onChangeText={(text) => setTransaction({...transaction, notes: text})}
                    />
                </View>
                <View style={{marginTop: 25}}>
                    {success ? <Text style={{...styles.successMessage, alignSelf: 'center'}}>{success}</Text> : null}
                    { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
                    ) : (
                        <SaveButton item='Save' onPress={addTransaction} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddTransactions;