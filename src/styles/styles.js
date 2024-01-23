import { StatusBar, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: '90%',
    display: 'flex',
    flexDirection: 'row'

  },
  title: {
    fontSize: 32,
    verticalAlign: 'middle'
  }
})
