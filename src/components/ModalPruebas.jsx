import React from 'react'
import { Alert, Modal, StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import logo from '../../assets/marca_lucchetti-040822.png'

const ModalPruebas = ({
  albumsAll, setAlbumTitle, setModalVisible, modalVisible
}) => {
  // console.log('albumsAllModal', albumsAll)
  const handleAlbumPress = async (albumTitle) => {
    setAlbumTitle(albumTitle)
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
