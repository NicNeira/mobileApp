import React, { useState } from 'react'
import { Button, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { Video, ResizeMode } from 'expo-av'
import { getOneAlbum } from '../utils/getOneAlbum.js'

export const Prueba = ({ videos, albumTitle, modalVisible, setModalVisible }) => {
  // const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedVideoName, setSelectedVideoName] = useState(null)
  const [videoPlayer, setVideoPlayer] = useState(false)
  const [status, setStatus] = React.useState({})

  // const [isMounted, setIsMounted] = useState(false)

  const video = React.useRef(null)

  // Funcion para cargar mas videos al final de la lista
  // const loadMoreVideos = async () => {
  //   // if (!paginationInfo || !paginationInfo.hasNextPage) return

  //   // console.log('paginationInfo.endCursor', paginationInfo.endCursor)

  //   // const moreVideos = await getOneAlbum(albumTitle, albumsAll, paginationInfo.endCursor)
  //   // console.log('moreVideos', moreVideos)

  //   // setAlbums(prevAlbums => { // Crear un nuevo conjunto con los IDs de los videos existentes
  //   //   const existingIds = new Set(prevAlbums.map(video => video.id))

  //   //   // Filtrar los nuevos videos, manteniendo solo aquellos que no están ya en el conjunto
  //   //   const uniqueNewVideos = moreVideos.assets.filter(video => !existingIds.has(video.id))

  //   //   // Devolver los videos existentes combinados con los nuevos videos únicos
  //   //   return [...prevAlbums, ...uniqueNewVideos]
  //   // })

  //   if (paginationInfo.hasNextPage) {
  //     const moreVideos = await getOneAlbum(albumTitle, albumsAll, paginationInfo.endCursor)
  //     console.log('moreVideos', moreVideos)

  //     setAlbums(prevAlbums => { // Crear un nuevo conjunto con los IDs de los videos existentes
  //       const existingIds = new Set(prevAlbums.map(video => video.id))

  //       // Filtrar los nuevos videos, manteniendo solo aquellos que no están ya en el conjunto
  //       const uniqueNewVideos = moreVideos.assets.filter(video => !existingIds.has(video.id))

  //       // Devolver los videos existentes combinados con los nuevos videos únicos
  //       return [...prevAlbums, ...uniqueNewVideos]
  //     })
  //   }
  // }

  const handlePress = (item) => {
    setSelectedVideo(item.uri)
    setSelectedVideoName(item.filename)
    setVideoPlayer(true)
  }

  return (
    <>
      <StatusBar barStyle='default' />
      <LogoHeader albumTitle={albumTitle} setModalVisible={setModalVisible} />
      {videos.lenght === 0
        ? <Text>No hay videos</Text>
        : <FlatList
            data={videos}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}><VideoInfo title={item.filename} videoSource={item.uri} /></TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            // onEndReached={loadMoreVideos}
            // onEndReachedThreshold={0.1} // Determina qué tan cerca del final de la lista debe estar el usuario para cargar más
          />}
      <Button
        title='Cerrar'
        onPress={() => setVideoPlayer(false)}
      />
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
  }
})
