import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

export default function LockDoor({navigation}) {
  return (
    <TouchableOpacity style = {styles.btn} onPress = {() => {navigation.pop()}}>
      <Text>LockDoor</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})