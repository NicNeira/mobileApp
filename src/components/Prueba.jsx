import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { Video, ResizeMode } from 'expo-av'

export const Prueba = ({ albumTitle, setModalVisible, videos }) => {
  // const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedVideoName, setSelectedVideoName] = useState(null)
  const [videoPlayer, setVideoPlayer] = useState(false)
  const [status, setStatus] = React.useState({})

  const [isLoading, setIsLoading] = useState(true)

  const video = React.useRef(null)

  // Setear el loading
  useEffect(() => {
    if (videos && videos.length > 0) {
      setIsLoading(false) // asumiendo que `videos` es un array
    }
  }, [videos])

  const handlePress = (item) => {
    setSelectedVideo(item.uri)
    setSelectedVideoName(item.filename)
    setVideoPlayer(true)
  }

  return (
    <>
      <StatusBar barStyle='default' />
      <LogoHeader albumTitle={albumTitle} setModalVisible={setModalVisible} />
      {isLoading
        ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='#fec115' />
          </View>
          )
        : (
          <SafeAreaView style={{ paddingBottom: 250 }}>

            <FlatList
              ListFooterComponent={<View style={{ height: 100 }} />}
              data={videos}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <VideoInfo title={item.filename} videoSource={item.uri} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </SafeAreaView>
          )}

      <Modal
        animationType='slide'
        transparent={false}
        visible={videoPlayer}
        onRequestClose={() => setVideoPlayer(false)}
      >

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
                key={selectedVideo.id}
              />
            : <Text>No hay video</Text>}
          <Text style={styles.text}>{selectedVideoName}</Text>
          <View style={styles.buttons}>
            <Button
              title='Cerrar'
              onPress={() => setVideoPlayer(false)}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  video: {
    resizeMode: 'contain',
    height: 500,
    width: 300
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  text: {
    fontSize: 20,
    marginTop: 10,
    color: '#fff'
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: '50%',
    height: '100%' // Asegura que el View tenga el alto total de la pantalla.
  }
})
