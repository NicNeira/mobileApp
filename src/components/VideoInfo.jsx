import React, { useEffect, useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import * as VideoThumbnails from 'expo-video-thumbnails'

export const VideoInfo = ({ title, videoSource }) => {
  const [image, setImage] = useState(null)

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoSource,
        {
          time: 15000
        }
      )
      setImage(uri)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    generateThumbnail()
  }, [])

  return (
    <View style={styles.item}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text>Loading...</Text>}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#fec115',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 10

  },
  title: {
    flex: 1,
    fontSize: 22,
    color: '#fff',
    marginLeft: 20,
    padding: 10,
    backgroundColor: '#ff1b15',
    borderRadius: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  }
})
