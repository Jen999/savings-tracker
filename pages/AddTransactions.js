import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TextInput, Pressable, Button, Modal } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import styles from './header.style';
import inputboxStyle from '../components/add/inputbox/inputbox.style';
import SaveButton from '../components/add/savebutton/SaveButton';

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import { Calendar } from 'react-native-calendars';


function AddTransactions({ navigation }) {
    const [transaction, setTransaction] = useState({date: '', amount: '', category: ''});
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selected, setSelected] = useState("");

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

    function addTransaction() {
        transaction.amount = Number(transaction.amount);
        const transactionsDb = collection(db, 'transaction');
        addDoc(transactionsDb, {
            date: transaction.date,
            amount: transaction.amount,
            category: transaction.category,
        })
    }

    // Handling Dropdown List Goal Type
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

    const uniqueTypes = [...new Set(goal.map(item => item.type))];
    const dropdownData = uniqueTypes.map((value, index) => ({
        key: (index + 1).toString(),
        value: value,
    }));
    console.log(dropdownData);

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
                    <Text style={inputboxStyle.header}>Date</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        value={transaction.date.toString()}
                        placeholder="Select date"
                        onFocus={openCalendar}
                    />
                    <Modal
                        visible={isCalendarVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={closeCalendar}
                    >
                        <Calendar onDayPress={(day) => { handleDateSelect(day); closeCalendar(); }}/>
                    </Modal>
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Amount</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Enter Spending Amount (SGD)'
                        value={transaction.amount.toString()}
                        onChangeText={(text) => setTransaction({...transaction, amount: text})}
                    />
                </View>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Category</Text>
                    {/* <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder='Select Category of Spending'
                        value={transaction.category}
                        onChangeText={(text) => setTransaction({...transaction, category: text})}
                    /> */}
                    <SelectList 
                        style={inputboxStyle.inputbox}
                        setSelected={(val) => setSelected(val)}
                        data={dropdownData}
                        save="value"
                        onSelect={(text) => setTransaction({...transaction, category: text})}
                    />
                </View>
                <SaveButton item='Save' onPress={addTransaction}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddTransactions;