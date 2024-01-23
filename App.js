import React from 'react'
// import { StatusBar } from 'expo-status-bar' // Para la barra superior de la app/celular
// import { Alert, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import Main from './src/components/Main'

export default function App () {
  return (
    <Main />
    // <View style={styles.container}>
    //   <TouchableNativeFeedback onPress={() => Alert.alert('Hemos tocado el texto!')}>
    //     <Text>Hola mundo1</Text>
    //   </TouchableNativeFeedback>
    //   <Text>Hola mundo2</Text>
    //   <Text>Hola mundo3</Text>
    //   <StatusBar style='auto' />
    // </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })
