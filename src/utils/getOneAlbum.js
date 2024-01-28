import * as MediaLibrary from 'expo-media-library'

export const getOneAlbum = async (albumName, albumsAll, paginationInfo) => {
  // Get one Album
  const album = albumsAll.find(album => album.title === albumName)
  console.log('album.title', album.title)

  if (album) {
    try {
      const videoQuery = {
        mediaType: MediaLibrary.MediaType.video,
        album: album.id,
        first: 30 // Cantidad de elementos para cargar inicialmente
        // after: paginationInfo.endCursor // Cursor para la paginación
      }

      // Asegurarse de que paginationInfo no es null antes de acceder a endCursor
      // if (paginationInfo && paginationInfo.endCursor) {
      //   videoQuery.after = paginationInfo.endCursor
      // }

      const videos = await MediaLibrary.getAssetsAsync(videoQuery)

      // console.log('videos.endCursor', videos.endCursor)
      // console.log('videos.assets', videos.assets)

      return videos
      // {
      // assets: prev => [...prev, ...videos.assets],
      // hasNextPage: videos.hasNextPage,
      // endCursor: videos.endCursor
      // }
    } catch (error) {
      console.error('Error al obtener los videos:', error)
      throw error // O manejar el error según sea necesario
    }
  }

  return { assets: [] } //, hasNextPage: false, endCursor: null
}
