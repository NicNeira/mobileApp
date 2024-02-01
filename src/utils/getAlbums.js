import * as MediaLibrary from 'expo-media-library'
import { useState } from 'react'

export const getAlbums = async () => {
  // Get all Albums
  const { status } = await MediaLibrary.requestPermissionsAsync()

  // if (status !== 'granted') {
  //   console.log('Permission not granted!')
  //   return
  // }

  // console.log(status)

  const albumsAll = await MediaLibrary.getAlbumsAsync()

  // console.log('albumsAll', albumsAll)

  // Get one Album
  const album = albumsAll.find(album => album.title === 'Stiavelli')
  console.log('album', album)

  // Get videos from album
  if (album) {
    const videos = await MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.video,
      album
    })
    console.log('videos', videos)
    return videos
  }

  return []
}
