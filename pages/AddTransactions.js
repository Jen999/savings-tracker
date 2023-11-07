import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TextInput, Pressable, Button } from 'react-native';

import styles from './header.style';
import inputboxStyle from '../components/add/inputbox/inputbox.style';
import SaveButton from '../components/add/savebutton/SaveButton';

import { collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import { Timestamp } from "@firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';


function AddTransactions({ navigation }) {

    const [transaction, setTransaction] = useState({/*date: new Date(),*/ amount: '', category: ''});
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    function addTransaction() {
        // Convert date to a Firestore Timestamp
        // transaction.date = Timestamp.fromDate(new Date(transaction.date));
        // Convert amount to a number
        transaction.amount = Number(transaction.amount);
        const transactionsDb = collection(db, 'transaction');
        addDoc(transactionsDb, {
            amount: transaction.amount,
            category: transaction.category,
        })
    }

    const onChange = (e, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setTransaction({ ...transaction, date: selectedDate });
        }
    };

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    }

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
            <ScrollView style={{marginTop: 30}}>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Date</Text>
                    {/* <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Enter Date'
                        value={transaction.date}
                        onChangeText={(text) => setTransaction({ ...transaction, date: text })}
                    /> */}
                    <Button title="Date Picker" /*onPress={() => showMode("date")}*/ />
                    {show && (
                        <DateTimePicker
                            value={transaction.date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Amount</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Enter Spending Amount (SGD)'
                        value={transaction.amount}
                        onChangeText={(text) => setTransaction({...transaction, amount: text})}
                    />
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Category</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Select Category of Spending'
                        value={transaction.category}
                        onChangeText={(text) => setTransaction({...transaction, category: text})}
                    />
                </View>
                <SaveButton item='Save' onPress={addTransaction}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddTransactions;