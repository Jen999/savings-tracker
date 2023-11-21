import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'

import { COLORS, SIZES } from '../../../../constants';
import styles from './insightscard.style'
import Ionicons from "@expo/vector-icons/Ionicons";

import { auth, db } from '../../../../Firebase/firebase';
import { deleteDoc, doc } from 'firebase/firestore';



const InsightsCard = ({date, insight, prompt, id}) => {
  const user = auth.currentUser;
  console.log(user.uid);
  const warning = ['Oh no! ', 'Watch out! ', 'Uh-oh... '];
  const [loading, setLoading] = useState(false);


  async function deleteInsight() {
    setLoading(true);
    try {
      const insight = doc(db, `users/${user.uid}/insight`, id);
      await deleteDoc(insight);
    } catch (error) {
      console.error('Error deleting insight');
    } finally {
      setLoading(true);
    }
  }


  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={styles.header}>
            <Text style={styles.date}>{date}</Text>
            <Text style={warning.includes(prompt) ? styles.promptRed : styles.promptGreen}>{prompt}</Text>
          </View>
          <Pressable onPress={deleteInsight}>
            {loading ? (<Text>Pending Deletion</Text>)
              : (<Ionicons name='trash' size={SIZES.xLarge} color={COLORS.primary} style={{marginRight: SIZES.smallMargin}}/>)}
          </Pressable>
        </View>
        <Text style={styles.text}>{insight}</Text>
      </View>
    </View>
  )
}

export default InsightsCard