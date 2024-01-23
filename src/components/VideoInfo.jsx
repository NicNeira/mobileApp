import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles/styles'
import { logo } from '../data/example\'image'

export const VideoInfo = ({ title }) => {
  return (
    <View style={styles.item}>
      <Image source={logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
