import React, { useState } from 'react'
import { FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DATA } from '../data/example-list'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { CloseIcon } from '../images/svg/CloseIcon.jsx'
import Video from 'react-native-video'

export const Prueba = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const handlePress = () => {
    setSelectedVideo('https://www.youtube.com/watch?v=qi87b6VcIHY&t=681s&ab_channel=midudev')
    setModalVisible(true)
  }

  // Later on in your styles..
  const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }
  })

  return (
    <>
      <StatusBar barStyle='default' />
      <LogoHeader />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}><VideoInfo title={item.title} /></TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'blue' }}>
          <View>
            <Text>Text in modal!</Text>
          </View>
          {/* flex: 1 Añadido para empujar el contenido a la derecha    */}
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: 'red' }}>
            <CloseIcon />
          </TouchableOpacity>
          <View />
        </View>
      </Modal>
    </>
  )
}
