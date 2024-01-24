import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { ResizeMode, Video } from 'expo-av'

export const VideoInfo = ({ title, videoProps }) => {
  const video = React.useRef(null)
  const [status, setStatus] = React.useState({})

  return (
    <View style={styles.item}>
      <Video
        source={{
          uri: videoProps
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 200, height: 200 }}
      />
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
    backgroundColor: '#ff1b15',
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
    paddingLeft: 20
  }
})
