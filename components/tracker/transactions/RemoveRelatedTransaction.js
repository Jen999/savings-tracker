import React, { useState, useEffect } from 'react';
import { doc, query, where, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from '../../../Firebase/firebase';


const RemoveRelatedTransaction = async (categoryToDelete) => {
    try {
        const transactionCollection = collection(db, 'transaction');
        const q = categoryToDelete ? query(transactionCollection, where('category', '==', categoryToDelete)) : transactionCollection;
    
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            await deleteDoc(docRef);
            console.log(`Document with ID ${doc.id} deleted.`);
        });
        if (categoryToDelete) {
            console.log(`All transactions with category === ${categoryToDelete} deleted.`);
        } else {
            console.log('All transactions deleted.')
        }
        
    } catch (error) {
        console.error('Error deleting transactions:', error);
    }
};
  

export default RemoveRelatedTransaction;