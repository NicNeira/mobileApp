import React, { useEffect, useState } from 'react'
import { Prueba } from './Prueba'
import { View } from 'react-native'
import { getAlbums } from '../utils/getAlbums'
import ModalPruebas from './ModalPruebas'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Main = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [albumsAll, setAlbumsAll] = useState([])
  const [albums, setAlbums] = useState([])
  const [albumTitle, setAlbumTitle] = useState([])
  // const [paginationInfo, setPaginationInfo] = useState({
  //   hasNextPage: true,
  //   endCursor: null
  // })

  // // Intenta cargar los datos del almacenamiento local
  // useEffect(() => {
  //   const loadAlbumsFromStorage = async () => {
  //     const storedAlbumsAll = await AsyncStorage.getItem('albumsAll')
  //     if (storedAlbumsAll) setAlbumsAll(JSON.parse(storedAlbumsAll))
  //   }

  //   loadAlbumsFromStorage()
  // }, [])

  // // Actualiza el almacenamiento local cuando albumsAll cambia
  // useEffect(() => {
  //   const updateStorage = async () => {
  //     await AsyncStorage.setItem('albumsAll', JSON.stringify(albumsAll))
  //   }

  //   if (albumsAll.length > 0) {
  //     updateStorage()
  //   }
  // }, [albumsAll])

  // console.log('paginationInfo', paginationInfo)

  useEffect(() => {
    // Llamar a getAlbums y actualizar el estado local con los videos
    // solo si no se han cargado previamente del almacenamiento
    if (albumsAll.length === 0) {
      getAlbums().then(videos => {
        setAlbumsAll(videos)
      })
    }
  }, [albumsAll])

  // const getAllVideosFromAlbum = async (albumName, albumsAll) => {
  //   let paginationInfo = { hasNextPage: true, endCursor: null }
  //   let allVideos = []

  //   while (paginationInfo.hasNextPage) {
  //     const response = await getOneAlbum(albumName, albumsAll, paginationInfo)
  //     allVideos = allVideos.concat(response.assets)
  //     paginationInfo = {
  //       hasNextPage: response.hasNextPage,
  //       endCursor: response.endCursor
  //     }

  //     // Imprimir la respuesta de la página actual
  //     console.log('Página cargada:', response)
  //   }

  //   return allVideos
  // }

  // getAllVideosFromAlbum(`${albumTitle}`, albumsAll).then(videos => {
  //   console.log('Todos los videos:', videos)
  // })

  console.log('albumTitle', albumTitle)

  return (
    <>
      {(albums.length === 0 || modalVisible) &&
        <ModalPruebas
          albumsAll={albumsAll}
          setAlbums={setAlbums}
          setAlbumTitle={setAlbumTitle}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />}
      <View style={{ backgroundColor: '#000' }}>

        {albums.length > 0 &&
          <Prueba
            videos={albums}
            setAlbums={setAlbums}
            albumsAll={albumsAll}
            albumTitle={albumTitle}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />}
      </View>

    </>
  )
}

export default Main
