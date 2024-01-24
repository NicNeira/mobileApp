import React, { useState } from 'react'
import { Button, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DATA } from '../data/example-list'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { CloseIcon } from '../images/svg/CloseIcon.jsx'
import { Video, ResizeMode } from 'expo-av'
import videoFile from '../../assets/videos/02. Pantalla principal envasadora stiavelli.mov'
import { videoNameList } from '../data/video-name-list.js'

export const Prueba = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  const handlePress = () => {
    setSelectedVideo('https://www.youtube.com/watch?v=qi87b6VcIHY&t=681s&ab_channel=midudev')
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
      <FlatList
        data={videoNameList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}><VideoInfo title={item.name} videoProps={item.URL} /></TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
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
            <Video
              ref={video}
              style={styles.video}
              source={videoFile}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
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
