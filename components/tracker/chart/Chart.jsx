import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { VictoryBar, VictoryLine, VictoryChart, VictoryTheme, VictoryScatter, VictoryLabel } from 'victory-native';

import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../../Firebase/firebase';

import styles from './chart.style'
import { SIZES, COLORS } from '../../../constants';


const Chart = (transactions) => {
  const [goal, setGoal] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reading Goal
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

  let goalTotal;
  if (goal.length > 0) {
    goalTotal = Number(goal[0].amount);
  } else {
    goalTotal = 0;
  }
  
  const linechart = goalTotal;

  // Handling list of months in chart
  const today = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const barchartList = (month) => {
    if (month < 5) {
      let offset = 5 - month;
      let total = months.length;
      return months.slice(total - offset, total).concat(months.slice(0, month+1));
    } 
    return months.slice(month-5, month+1);
  };
  const monthsList = barchartList(today.getMonth());

  const barchartDict = monthsList.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  // Handling summing transactions of each month in chart
  for (item of transactions.transaction) {
    let itemDate = new Date(item.date);
    let itemMonth = months[itemDate.getMonth()];
    if (itemMonth in barchartDict) {
      barchartDict[itemMonth] += item.amount;
    }
  }
  console.log(barchartDict);

  const convertData = (dictionary) => {
    let data = [];
    for (let [key, value] of Object.entries(barchartDict)) {
      data.push({ month: key, total: value });
    }
    return data;
  }
  const data = convertData(barchartDict);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Monthly Spendings (SGD)</Text>
            <View style={{position: 'absolute'}}>
            <VictoryChart 
              width={350} 
              height={230} 
              theme={VictoryTheme.material}
              domainPadding={{ x: SIZES.small, y: SIZES.large }}
            >
              <VictoryBar data={data} x="month" y="total" />
              <VictoryLine 
                style={{ data: { 
                  stroke: COLORS.turquoise, 
                  strokeWidth: 1
                }}}
                data={[ {x: monthsList[0], y: linechart}, {x: monthsList[5], y: linechart} ]}
                domainPadding={{ x: -SIZES.small }}
              />
              <VictoryScatter
                data={[ {x: monthsList[5], y: linechart} ]}
                size={0}
                labels={['Goal']}
                labelComponent={
                  <VictoryLabel textAnchor="end" style={[ {fill: COLORS.turquoise} ]} lineHeight={0}/>
                }
                domainPadding={{ x: -SIZES.small }}
              />
            </VictoryChart>
            </View>
        </View>
    </View>
  )
}

export default Chart