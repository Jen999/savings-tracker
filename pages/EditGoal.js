import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TextInput } from 'react-native';

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase/firebase';
import styles from './header.style';
import inputboxStyle from '../components/add/inputbox/inputbox.style';
import SaveButton from '../components/add/savebutton/SaveButton';

function EditGoal() {

    const [goal, setGoal] = useState({type: '', amount: ''});
    const [goalCount, setGoalCount] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      const goalQuery = collection(db, 'goal');
      onSnapshot(goalQuery, (snapshot) => {
          let goalList = [];
          snapshot.docs.map((doc) => goalList.push({...doc.data(), id: doc.id}))
          setGoalCount(goalList);
          setLoading(false);
      })
    }, [])

    function addGoal() {
        if (goalCount.length === 0) {
            goal.amount = Number(goal.amount);
            const goalDb = collection(db, 'goal');
            addDoc(goalDb, {
                amount: goal.amount,
                type: goal.type,
            })
        } else {
            console.log('Goal existing')
        }
    }
    // goalCount.length ? goalCount[0].type : 
    const typePlaceholder = 'Enter Type of Spending';
    // goalCount.length ? goalCount[0].amount : 
    const amountPlaceholder = 'Enter Goal Budget Amount (SGD)';

    return (
        <SafeAreaView style={{marginTop: 10}}>
            <ScrollView>
            <View style={inputboxStyle.container}>
                <Text style={inputboxStyle.header}>Type of Spending</Text>
                <Text style={styles.smallText}>E.g., Coffee, Shopping, Clothes, etc.</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder={typePlaceholder}
                        value={goal.type}
                        onChangeText={(text) => setGoal({...goal, type: text})}
                    />
            </View>
            <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Goal Budget</Text>
                    <TextInput 
                        style={inputboxStyle.inputbox}
                        placeholder={amountPlaceholder}
                        value={goal.amount}
                        onChangeText={(text) => setGoal({...goal, amount: text})}
                    />
            </View>
            <SaveButton item='Save' onPress={addGoal}/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditGoal;