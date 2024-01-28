import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import logo from '../../assets/marca_lucchetti-040822.png'
import { AntDesign } from '@expo/vector-icons'

export const LogoHeader = ({ albumTitle, setModalVisible }) => {
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
        <Text style={{ fontSize: 32, color: 'white' }}>{albumTitle}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <AntDesign name='folderopen' size={24} color='white' />
        </Pressable>
      </View>
    </View>
  )
}
