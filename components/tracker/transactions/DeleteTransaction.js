import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from '../../../Firebase/firebase';
import Ionicons from "@expo/vector-icons/Ionicons";

import { SIZES, COLORS } from '../../../constants';



function DeleteTransaction({ id }) {

    function deleteTransaction() {
        const transaction = doc(db, 'transaction', id);
        deleteDoc(transaction)
    }

    return (
        <View>
            <Pressable onPress={deleteTransaction}>
                <Ionicons name='trash' size={SIZES.xLarge} color={COLORS.primary}/>
            </Pressable>
        </View>
    );
}

export default DeleteTransaction;