import React from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { COLORS, SHADOWS, SIZES } from "../../../constants";

import styles from './savebutton.style'

const SaveButton = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container}>
        <Button title={item} color={COLORS.secondary} onPress={onPress}/>
    </TouchableOpacity>
    
  )
}

export default SaveButton