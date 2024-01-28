import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, ScrollView } from 'react-native'
import { getOneAlbum } from '../utils/getOneAlbum'

const ModalPruebas = ({ albumsAll, setAlbums, paginationInfo, setAlbumTitle }) => {
  const [modalVisible, setModalVisible] = useState(false)

  // console.log('albumsAllModal', albumsAll)
  const handleAlbumPress = async (albumTitle) => {
    setAlbumTitle(albumTitle)
    console.log('albumTitle', albumTitle)
    try {
      const response = await getOneAlbum(albumTitle, albumsAll, paginationInfo)
      const newAlbum = response.assets // Asume que 'assets' contiene los álbumes que quieres agregar
      console.log('newAlbum.length', newAlbum.length)

      setAlbums(prevAlbums => [...prevAlbums, ...newAlbum]) // Agrega los nuevos álbumes a la lista existente
      if (newAlbum.length === 0) {
        Alert.alert('Error', 'No hay videos en el álbum')
      }
    } catch (error) {
      console.error('Error al obtener el álbum:', error)
      Alert.alert('Error', 'No se pudo obtener el álbum')
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {albumsAll.length !== 0 && (
              <ScrollView style={styles.scrollView}>
                <Text style={styles.modalText}>lista de albums!</Text>
                {albumsAll.map((album, index) => (
                  <View key={index} style={{ margin: 5 }}>
                    <Button
                      title={album.title}
                      onPress={() => handleAlbumPress(album.title)}
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    height: '80%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default ModalPruebas
