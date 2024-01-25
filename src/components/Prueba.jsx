import React, { useState } from 'react'
import { Button, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { CloseIcon } from '../../assets/svg/CloseIcon.jsx'
import { Video, ResizeMode } from 'expo-av'

export const Prueba = ({ videos }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  console.log(selectedVideo)

  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  const handlePress = (item) => {
    setSelectedVideo(item.uri)
    setModalVisible(true)
  }

  // Later on in your styles..
  // const styles = StyleSheet.create({
  //   backgroundVideo: {
  //     position: 'absolute',
  //     top: 0,
  //     left: 0,
  //     bottom: 0,
  //     right: 0
  //   }
  // })

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      backgroundColor: '#ecf0f1'
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  return (
    <>
      <StatusBar barStyle='default' />
      <LogoHeader />
      {videos.lenght === 0
        ? <Text>No hay videos</Text>
        : <FlatList
            data={videos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}><VideoInfo title={item.filename} videoSource={item.uri} /></TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />}
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'green' }}>
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
          <View style={styles.container}>
            {selectedVideo
              ? <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: selectedVideo
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
              : <Text>No hay video</Text>}
            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? 'Pause' : 'Play'}
                onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
