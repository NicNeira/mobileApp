import React, { useEffect, useState } from 'react'
import { Prueba } from './Prueba'
import { View } from 'react-native'
import { getAlbums } from '../utils/getAlbums'
import ModalPruebas from './ModalPruebas'

const Main = () => {
  const [albumsAll, setAlbumsAll] = useState([])
  const [albums, setAlbums] = useState([])
  const [albumTitle, setAlbumTitle] = useState([])
  const [paginationInfo, setPaginationInfo] = useState({
    hasNextPage: true,
    endCursor: null
  })

  // console.log('paginationInfo', paginationInfo)

  useEffect(() => {
    // Llamar a getAlbums y actualizar el estado local con los videos
    getAlbums().then(videos => {
      // console.log('videos', videos)
      setAlbumsAll(videos)
    })
  }, [])

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

  // console.log('albumsAll', albumsAll)
  // console.log('albums', albums)

  return (
    <>
      {albums.length === 0 && <ModalPruebas albumsAll={albumsAll} setAlbums={setAlbums} paginationInfo={paginationInfo} setPaginationInfo={setPaginationInfo} setAlbumTitle={setAlbumTitle} />}
      <View style={{ backgroundColor: '#ff1b15' }}>

        {albums.length > 0 && <Prueba
          videos={albums}
          setAlbums={setAlbums}
          paginationInfo={paginationInfo}
          setPaginationInfo={setPaginationInfo}
          albumsAll={albumsAll}
          albumTitle={albumTitle}
                              />}
      </View>

    </>
  )
}

export default Main
