import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'


const Home = ({userName = 'Roberto'}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>¡Hola, {userName}!</Text>
      <Text style={styles.subtitle}>Ingresar fotografias:</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
  },
  title: {
      fontSize: 38,
      marginTop: 50,
      textAlign: 'left',
      alignSelf: 'flex-start',
      width: '50%',
  },
  subtitle: {
      fontSize: 20,
      marginTop: 20,
      textAlign: 'left',
      alignSelf: 'flex-start',
      width: '100%',
      fontWeight: 'bold',
  },
})

export default Home