import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DATA } from '../data/example-list'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
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

  console.log('selectedVideo', selectedVideo)
  return (
    <>
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
        <View style={{ marginTop: 22 }}>
          <View>
            {selectedVideo && <Video
              source={{ uri: selectedVideo }} ref={(ref) => {
                this.player = ref
              }} // Store reference
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              style={styles.backgroundVideo}
                              />}
            <Text style={{ fontSize: 24 }} onPress={() => setModalVisible(!modalVisible)}>Cerrar</Text>
          </View>
        </View>
      </Modal>
    </>
  )
}
