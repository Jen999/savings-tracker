import React, { useState, useEffect } from 'react';
import { doc, query, where, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from '../../Firebase/firebase';


const RemoveAllInsights = async (uid) => {
    try {
        const insightCollection = collection(db, `users/${uid}/insight`);
        const querySnapshot = await getDocs(insightCollection);

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            await deleteDoc(docRef);
            console.log(`Insight with ID ${doc.id} deleted.`);
        });
        console.log('All transactions deleted.')
        
    } catch (error) {
        console.error('Error deleting transactions:', error);
    }
};
  
export default RemoveAllInsights;