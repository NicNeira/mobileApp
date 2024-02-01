import React, { useEffect } from 'react'
import { Alert, Modal, StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import { getOneAlbum } from '../utils/getOneAlbum'
import logo from '../../assets/marca_lucchetti-040822.png'
import { getAlbums } from '../utils/getAlbums'

const ModalPruebas = ({
  albumsAll, setAlbums, paginationInfo, setAlbumTitle, setModalVisible, modalVisible
}) => {
  // console.log('albumsAllModal', albumsAll)
  const handleAlbumPress = async (albumTitle) => {
    setAlbumTitle(albumTitle)
    // console.log('albumTitle', albumTitle)
    try {
      const response = await getAlbums()
      const newAlbum = response.assets // Asume que 'assets' contiene los álbumes que quieres agregar
      console.log('newAlbum.length', newAlbum.length)

      setAlbums(newAlbum) // Agrega los nuevos álbumes a la lista existente
      if (newAlbum.length === 0) {
        Alert.alert('Error', 'No hay videos en el álbum')
      } else {
        setModalVisible(false)
      }
    } catch (error) {
      console.error('Error al obtener el álbum:', error)
      Alert.alert('Error', 'No se pudo obtener el álbum')
    }
  }

  useEffect(() => {
    if (albumsAll.length !== 0) {
      setModalVisible(true)
    }
  }, [albumsAll])

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
          <Image
            source={logo}
            style={{ width: 150, borderRadius: 10 }}
          />
          <View style={styles.modalView}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.modalText}>Selecciona un album</Text>
              {albumsAll.map((album, index) => (
                <View key={index} style={{ margin: 5 }}>
                  <Button
                    title={album.title}
                    onPress={() => handleAlbumPress(album.title)}
                    color='#ff1b15'
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fec115',
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
    elevation: 2,
    backgroundColor: '#fec115'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  }

})

export default ModalPruebas
