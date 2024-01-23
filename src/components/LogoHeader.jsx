import React from 'react'
import { Image, Text, View } from 'react-native'
import { logo } from '../data/example\'image'

export const LogoHeader = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <Image source={logo} />
      <Text style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 46 }}>Pruebaaa</Text>
    </View>
  )
}
