import * as MediaLibrary from 'expo-media-library'
import React, { useEffect, useState } from 'react'
import { Prueba } from './Prueba'
import { View } from 'react-native'

const Main = () => {
  const [videos, setVideos] = useState([])

  const getAlbums = async () => {
    // Get all Albums
    const { status } = await MediaLibrary.requestPermissionsAsync()
    const albumsAll = await MediaLibrary.getAlbumsAsync()

    // Get one Album
    const album = albumsAll.find(album => album.title === 'WhatsApp Video')
    // console.log(album)

    // Get videos from album
    if (album) {
      const videos = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.video,
        album
      })
      setVideos(videos.assets)
      // console.log(videos.assets)
    }
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
    // <View style={{ marginTop: 0 }}>
    //   <Text>Rate Repository Application</Text>
    // </View>
    // <ScrollView>
    //   <View />
    // </ScrollView>
    <View style={{ backgroundColor: '#ff1b15' }}>

      <Prueba videos={videos} />
    </View>

  )
}

export default Main
