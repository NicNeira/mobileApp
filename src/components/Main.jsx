import React, { useEffect, useState } from 'react'
import { Prueba } from './Prueba'
import { View } from 'react-native'
import { getAlbums } from '../utils/getAlbums'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Main = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [albumsAll, setAlbumsAll] = useState([])
  const [album, setAlbum] = useState([])
  const [boolean, setBoolean] = useState([])
  const [albumTitle, setAlbumTitle] = useState([])
  const [alertNoAlbum, setAlertNoAlbum] = useState([])

  const AlbumToSearch = 'Stiavelli'

  useEffect(() => {
    getAlbums(AlbumToSearch).then(videos => {
      setAlbum(videos)
    })
  }, [])

  // Validacion si tenemos videos
  useEffect(() => {
    // Verifica primero si `album.assets` está definido
    if (album.assets && album.assets.length > 0) {
      setBoolean(true)
    }
  }, [album])

  return (
    <>
      <View style={{ backgroundColor: '#000' }}>

        {boolean &&
          <Prueba
            videos={album.assets}
            setAlbums={setAlbum}
            albumsAll={albumsAll}
            albumTitle={albumTitle}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setAlertNoAlbum={setAlertNoAlbum}
          />}
      </View>

    </>
  )
}

export default Main
