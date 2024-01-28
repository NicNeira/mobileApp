import React, { useEffect, useState } from 'react'
import { Button, FlatList, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LogoHeader } from './LogoHeader'
import { VideoInfo } from './VideoInfo.jsx'
import { CloseIcon } from '../../assets/svg/CloseIcon.jsx'
import { Video, ResizeMode } from 'expo-av'
import { getOneAlbum } from '../utils/getOneAlbum.js'

export const Prueba = ({ videos, setAlbums, paginationInfo, setPaginationInfo, albumsAll, albumTitle }) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [status, setStatus] = React.useState({})

  const [isMounted, setIsMounted] = useState(false)

  const video = React.useRef(null)

  // Funcion para cargar mas videos al final de la lista
  const loadMoreVideos = async () => {
    // if (!paginationInfo || !paginationInfo.hasNextPage) return

    // console.log('paginationInfo.endCursor', paginationInfo.endCursor)

    // const moreVideos = await getOneAlbum(albumTitle, albumsAll, paginationInfo.endCursor)
    // console.log('moreVideos', moreVideos)

    // setAlbums(prevAlbums => { // Crear un nuevo conjunto con los IDs de los videos existentes
    //   const existingIds = new Set(prevAlbums.map(video => video.id))

    //   // Filtrar los nuevos videos, manteniendo solo aquellos que no están ya en el conjunto
    //   const uniqueNewVideos = moreVideos.assets.filter(video => !existingIds.has(video.id))

    //   // Devolver los videos existentes combinados con los nuevos videos únicos
    //   return [...prevAlbums, ...uniqueNewVideos]
    // })

    if (paginationInfo.hasNextPage) {
      const moreVideos = await getOneAlbum(albumTitle, albumsAll, paginationInfo.endCursor)
      console.log('moreVideos', moreVideos)

      setAlbums(prevAlbums => { // Crear un nuevo conjunto con los IDs de los videos existentes
        const existingIds = new Set(prevAlbums.map(video => video.id))

        // Filtrar los nuevos videos, manteniendo solo aquellos que no están ya en el conjunto
        const uniqueNewVideos = moreVideos.assets.filter(video => !existingIds.has(video.id))

        // Devolver los videos existentes combinados con los nuevos videos únicos
        return [...prevAlbums, ...uniqueNewVideos]
      })
    }
  }

  const handlePress = (item) => {
    setSelectedVideo(item.uri)
    setModalVisible(true)
  }

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
            keyExtractor={item => item.id.toString()}
            onEndReached={loadMoreVideos}
            onEndReachedThreshold={0.1} // Determina qué tan cerca del final de la lista debe estar el usuario para cargar más
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
