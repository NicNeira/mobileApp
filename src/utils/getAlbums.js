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
  // const album = albumsAll.find(album => album.title === 'WhatsApp Video')
  // console.log(album)

  // Get videos from album
  // if (albumsAll) {
  //   const videos = await MediaLibrary.getAssetsAsync({
  //     mediaType: MediaLibrary.MediaType.video,
  //     albumsAll
  //   })
  //   console.log('videos', videos)
  //   return videos
  // }

  if (albumsAll) {
    return albumsAll
  }

  return []
}
