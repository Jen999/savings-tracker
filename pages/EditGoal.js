import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Alert, SafeAreaView, ScrollView, Text, TextInput, ActivityIndicator } from 'react-native';

import { collection, doc, addDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import styles from './header.style';
import inputboxStyle from '../components/add/inputbox/inputbox.style';
import SaveButton from '../components/add/savebutton/SaveButton';
import RemoveRelatedTransaction from '../components/tracker/transactions/RemoveRelatedTransaction';
import { COLORS, SIZES } from '../constants';

function EditGoal() {
    const user = auth.currentUser;
    console.log(user.uid)
    const [goal, setGoal] = useState({type: undefined, amount: undefined});
    const [goalCount, setGoalCount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typeError, setTypeError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
      setLoading(true);
      const goalQuery = collection(db, `users/${user.uid}/goal`);
      onSnapshot(goalQuery, (snapshot) => {
          let goalList = [];
          snapshot.docs.map((doc) => goalList.push({...doc.data(), id: doc.id}))
          setGoalCount(goalList);
          setLoading(false);
      })
    }, [])

    async function handleGoal() {
        setLoading(false);
        // Reset error messages
        setTypeError('');
        setAmountError('');
        setSuccess('');

        // Add Goal
        if (goalCount.length === 0) {
            if (!goal.type) {
                setTypeError('This is a required field.');
                return;
            }
            if (goal.amount == 0) {
                setAmountError('This is a required field.');
                return;
            }
            if (isNaN(goal.amount) || goal.amount <= 0) {
                setAmountError('Invalid Spending Budget.');
                return;
            }

            try {
                const goalDb = collection(db, `users/${user.uid}/goal`);
                await addDoc(goalDb, {
                    amount: goal.amount,
                    type: goal.type,
                }).then(() => {
                    console.log('Goal added successfully');
                    setSuccess('Goal added successfully!');
                });
            } catch (error) {
                console.log('Error adding goal: ', error)
            } finally {
                setLoading(false);
            }
            
        } else {    // Edit Goal
            const prevAmount = goalCount[0].amount;
            const prevType = goalCount[0].type;
            const updatedAmount = goal.amount !== undefined ? goal.amount : goalCount[0].amount;
            const updatedType = goal.type !== undefined ? goal.type : goalCount[0].type;
            
            if (!updatedType) {
                setTypeError('Invalid Spending Type.');
                return;
            }
            if (isNaN(updatedAmount) || updatedAmount <= 0) {
                setAmountError('Invalid Spending Budget.');
                return;
            }

            try {
                const currGoal = doc(db, `users/${user.uid}/goal`, goalCount[0].id);
                await updateDoc(currGoal, {
                    amount: updatedAmount,
                    type: updatedType,
                }).then(() => {
                    console.log('Goal edited successfully');
                    setSuccess('Goal edited successfully!');
                });
            } catch (error) {
                console.error('Error updating goal: ', error)
            } finally {
                setLoading(false);
            }

            // Handle clearing records after updating goal
            Alert.alert(
                'Goal Successfully Updated', `Clear all previous '${prevType}' records?`,
                [
                    {
                        text: 'No',
                    },
                    {
                        text: 'Yes',
                        onPress: () => RemoveRelatedTransaction(prevType),
                    }
                ]);
        }
    }

    const typeDefaultValue =  goalCount.length ? goalCount[0].type : '';
    const amountDefaultValue = goalCount.length ? Number(goalCount[0].amount).toFixed(2).toString() : '';
    const buttonItem = goalCount.length ? 'Edit' : 'Save'
    
    return (
        <SafeAreaView style={{marginTop: 10}}>
            <ScrollView>
                <View style={inputboxStyle.container}>
                    <Text style={inputboxStyle.header}>Type of Spending*</Text>
                    <Text style={styles.smallText}>E.g., Coffee, Shopping, Clothes, etc.</Text>
                        <TextInput 
                            style={inputboxStyle.inputbox}
                            placeholder='Enter Type of Spending'
                            defaultValue={typeDefaultValue}
                            value={goal.type}
                            onChangeText={(text) => setGoal({...goal, type: text})}
                        />
                        {typeError ? <Text style={styles.errorMessage}>{typeError}</Text> : null}
                </View>
                <View style={inputboxStyle.container}>
                        <Text style={inputboxStyle.header}>Spending Budget*</Text>
                        <TextInput 
                            style={inputboxStyle.inputbox}
                            placeholder='Enter Spending Budget Amount (SGD)'
                            defaultValue={amountDefaultValue}
                            value={goal.amount}
                            onChangeText={(text) => setGoal({...goal, amount: text})}
                        />
                        {amountError ? <Text style={styles.errorMessage}>{amountError}</Text> : null}
                </View>
                <View style={{marginTop: 25}}>
                    {success ? <Text style={{...styles.successMessage, alignSelf: 'center'}}>{success}</Text> : null}
                    { loading ? (<ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
                    ) : (
                        <SaveButton item={buttonItem} onPress={handleGoal} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditGoal;