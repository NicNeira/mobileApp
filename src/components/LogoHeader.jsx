import React from 'react'
import { Image, Text, View } from 'react-native'
import logo from '../../assets/marca_lucchetti-040822.png'

export const LogoHeader = () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', padding: 20 }}>
      <Image
        source={logo}
      />
      <Text style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 22, paddingLeft: 20 }}>Envasadora Stiavelli</Text>
    </View>
  )
}
