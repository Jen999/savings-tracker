import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import styles from './header.style';

import { addDoc, collection, onSnapshot, getDocs } from "firebase/firestore";
import { auth, db } from '../Firebase/firebase';
import InsightsCard from '../components/common/cards/insights/InsightsCard';
import ClearAll from '../components/common/cards/ClearAll';
import RemoveAllInsights from '../components/insights/RemoveAllInsights';

import inputboxStyle from '../components/add/inputbox/inputbox.style';
import { COLORS, FONT, SIZES } from '../constants';


function Insights({ navigation }) {
    const user = auth.currentUser;
    console.log(user.uid)
    const today = new Date();
    const sgTimeString = today.toLocaleString('en-UK', { timeZone: 'Asia/Singapore' });
    const [sgDate, sgTime] = sgTimeString.split(',');
    const [insight, setInsight] = useState({date: '', insight: '', prompt: '', type: ''});
    const [insightItems, setInsightItems] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [goal, setGoal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [insightsError, setInsightsError] = useState('');
    const [success, setSuccess] = useState('');

    function convertDate(date) {
        const [day, month, year] = date.split('/');
        const dateString = [year, month, day].join('-');
        return dateString;
    };
    const sgString = convertDate(sgDate);
    const sgToday = new Date(sgString);

    function calcTotal() {
      let totalSum = 0;
      for (const item of transaction) {
        let itemDate = new Date(item.date)
        if (itemDate.getMonth() === today.getMonth()) {
          totalSum += item.amount;
        }
      }
      return totalSum;
    }

    function formatDate(dateTimeString) {
        const [, datePart, timePart] = dateTimeString.match(/(\d+\/\d+\/\d+), (.+)/);
        const [month, day, year] = datePart.split('/').map(Number);
        const [time, meridiem] = timePart.split(' ');
    
        let [hours, minutes, seconds] = time.split(':').map(Number);
    
        if (meridiem === 'PM' && hours !== 12) {
            hours += 12;
        } else if (meridiem === 'AM' && hours === 12) {
            hours = 0;
        }
    
        const formattedDate = new Date(year, month - 1, day, hours, minutes, seconds);
    
        return formattedDate.getTime();
    }

    async function addInsight() {
        try {
            const insightsDb = collection(db, `users/${user.uid}/insight`);
            addDoc(insightsDb, {
                date: insight.date,
                insight: insight.insight,
                prompt: insight.prompt,
                type: insight.type,
            }).then(() => {
                console.log('Insight generated successfully');
            }).catch((error) => {
                console.log('Error generating insight', error);
            });
        } catch (error) {
            console.error('Error in generating insight', error)
        }
    }

    // Handling reading and writing to db
    useFocusEffect(
        React.useCallback(() => {
        const fetchData = async () => {
            setInsightsError('');
            setSuccess('');
            try {
                setLoading(true);

                // Insight collection
                const insightQuery = collection(db, `users/${user.uid}/insight`);
                const insightSnapshot = await getDocs(insightQuery);
                let insightList = insightSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                insightList.sort((a, b) => {
                    const dateA = a.date ? formatDate(a.date) : null;
                    const dateB = b.date ? formatDate(b.date) : null;
                    return dateB - dateA;
                });

                setInsightItems(insightList);

                // Transaction and Goal collection
                const transactionQuery = collection(db, `users/${user.uid}/transaction`);
                const goalQuery = collection(db, `users/${user.uid}/goal`);
                
                const [transactionSnapshot, goalSnapshot] = await Promise.all([
                    getDocs(transactionQuery),
                    getDocs(goalQuery)
                ]);

                let transactionList = transactionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                let goalList = goalSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                setTransaction(transactionList);
                setGoal(goalList);

                setLoading(false);
                setDataFetched(true);
            } catch (error) {
                console.error('Error fetching data', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [insight]));

    // Insights checking 
    useEffect(() => {
        let recentInsight;
        if (insightItems.length > 0) {
            recentInsight = insightItems[0].type;
        } else {
            recentInsight = 0;
        }
        if (dataFetched) {
            try {
                const totalAmount = calcTotal();
                const goalTotal = goal.length > 0 ? Number(goal[0].amount) : 0;
                const goalType = goal.length > 0 ? goal[0].type : 'No Goal Added';

                const percentage = (100 * totalAmount) / goalTotal; 
                console.log('Percentage:', percentage);
                console.log('Recent Type Triggered:', recentInsight);

                if (goalTotal !== 0) {
                    const remaining = (goalTotal - totalAmount).toFixed(2);

                    if (percentage >= 100.00) {
                        if (recentInsight != '5') {
                            insight.date = sgTimeString
                            insight.insight = `You have exceeded your ${goalType} budget!`
                            insight.prompt = 'Oh no! '
                            insight.type = '5'
                            setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                            addInsight();
                        }
                    }
                    else if (percentage >= 90.00) {
                        if (recentInsight != '4') {
                            insight.date = sgTimeString
                            insight.insight = `You have spent more than 90% of your ${goalType} budget! You have SGD ${remaining} remaining.`
                            insight.prompt = 'Watch out! '
                            insight.type = '4'
                            setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                            addInsight();
                        }
                    }
                    else if (percentage >= 75.00) {
                        if (recentInsight != '3') {
                            insight.date = sgTimeString
                            insight.insight = `You have spent more than 75% of your ${goalType} budget!`
                            insight.prompt = 'Uh-oh... '
                            insight.type = '3'
                            setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                            addInsight();
                        }
                    }
                    else if (percentage >= 50.00) {
                        if (recentInsight != '2') {
                            insight.date = sgTimeString
                            insight.insight = `You have spent more than 50% of your ${goalType} budget!`
                            insight.prompt = 'Uh-oh... '
                            insight.type = '2'
                            setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                            addInsight();
                        }
                    }
                    else if (percentage >= 25.00) {
                        if (recentInsight != '1') {
                            insight.date = sgTimeString
                            insight.insight = `You have spent more than 25% of your ${goalType} budget!`
                            insight.prompt = 'Uh-oh... '
                            insight.type = '1'
                            setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                            addInsight();
                        }
                    }
                }
            } catch (error) {
                console.log('Error fetching insights data', error);
            }
        }
    }, [dataFetched, transaction]);

    // Handle Clear all insights
    const handleClearAllPress = () => {
        Alert.alert(
          'Confirm Clear All Insights',
          'Are you sure you want to clear all insights?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => RemoveAllInsights(user.uid),
            },
          ],
        );
      };

    const renderItem = ({item}) => {
        return(
            <InsightsCard date={item.date} insight={item.insight} prompt={item.prompt} id={item.id}/>
        );
    }

    // Generate Insight
    const generateInsight = () => {
        
        try {
            if (goal.length > 0) {
                if (insightItems.length > 0) {
                    insight.type = insightItems[0].type;
                } else {
                    insight.type = 0;
                }
                const totalAmount = calcTotal();
                const goalTotal = Number(goal[0].amount);
                const goalType = goal[0].type;
                const percentage =(100 * totalAmount) / goalTotal; 
                insight.date = sgTimeString
                insight.insight = `Status: You have spent ${percentage}% (SGD ${totalAmount}) of your ${goalType} budget the past ${sgToday.getDate().toString()} days.`
                insight.prompt = ''
                setInsight({...insight, date: insight.date, insight: insight.insight, prompt: insight.prompt, type: insight.type});
                addInsight();
                setSuccess('Insight generated successfully!')
            } else {
                setInsightsError('No goal added. Please add a goal before generating insight.');
                console.log('Error generating insight', error)
            }
        } catch (error) {
            console.log('Error generating insight', error);
        }}

    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerStyle: styles.header,
                    headerShadowVisible: true,
                    headerTitle: 'Insights',
                    headerTitleStyle: styles.headerText,
                }}
            /> 
            <FlatList 
                nestedScrollEnabled={true}
                ListHeaderComponent={() => (
                    <>
                    <ClearAll header='All Generated Insights' handlePress={handleClearAllPress}/>
                    </>
                )}
                data={insightItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={inputboxStyle.container}>
                <View style={{width: '95%', alignSelf: 'center', padding: SIZES.smallMargin, marginTop: -10}}>
                    {insightsError ? <Text style={styles.errorMessage}>{insightsError}</Text> : null}
                    {success ? <Text style={{...styles.successMessage, alignSelf: 'center'}}>{success}</Text> : null}
                </View>
                <View>
                    <TouchableOpacity style={buttonStyle.container} onPress={generateInsight}>
                        <Text style={buttonStyle.button}>Generate Insight</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const buttonStyle = StyleSheet.create({
    container: {
        color: COLORS.primary, 
        alignSelf: 'center',
        alignItems: 'center',
        width: '70%',
        borderRadius: SIZES.small,
        marginTop: SIZES.large,
        padding: SIZES.small,
        backgroundColor: COLORS.secondary
    },
    button: {
        color: COLORS.white,
        fontFamily: FONT.medium,
        fontSize: SIZES.smallmed,
        fontWeight: '700',
        borderRadius: SIZES.small
    }
})

export default Insights;