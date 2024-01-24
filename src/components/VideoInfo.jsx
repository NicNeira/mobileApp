import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { logo } from '../data/example\'image'

export const VideoInfo = ({ title }) => {
  return (
    <View style={styles.item}>
      <Image source={logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#ff1b15',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10

  },
  title: {
    fontSize: 32,
    color: '#fff',
    paddingLeft: 20

  }
})
