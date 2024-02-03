import React from 'react'
import { Image, Text, View } from 'react-native'
import logo from '../../assets/marca_lucchetti-040822.png'

export const LogoHeader = () => {
  return (
    <View>

      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
      >
        <Image
          source={logo}
          style={{ width: 150, borderRadius: 10 }}
        />
      </View>
      <View style={{
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#000',
        flexDirection: 'row',
        verticalAlign: 'middle',
        flexGrow: 1

      }}
      >
        <Text style={{ fontSize: 32, color: 'white', marginBottom: 10 }}>Envasadora Stiavelli</Text>
      </View>
    </View>
  )
}
