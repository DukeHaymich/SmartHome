import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'

export default function FraudDetector({navigation}) {
  return (
    <TouchableOpacity style = {styles.btn} onPress = {() => {navigation.pop()}}>
      <Text>FraudDetector</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

})