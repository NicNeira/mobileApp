import * as MediaLibrary from 'expo-media-library'
import { Alert } from 'react-native'

export const getAlbums = async (AlbumToSearch) => {
  // Get all Albums
  const { status } = await MediaLibrary.requestPermissionsAsync()

  if (status !== 'granted') {
    Alert.alert('Permiso denegado', 'No se concedieron los permisos para acceder a los álbumes.')
    return
  }

  const albumsAll = await MediaLibrary.getAlbumsAsync()

  // Get one Album
  const album = albumsAll.find(album => album.title === AlbumToSearch)

  // Get videos from album
  if (album) {
    const videos = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.video,
      album,
      first: 50
    })
    return videos
  } else {
    // Aquí manejas el caso donde no se encuentra el álbum
    Alert.alert('Álbum no encontrado', `Es necesario crear una carpeta llamada ${AlbumToSearch} y guardar los videos allí.`)
    return []
  }
}
