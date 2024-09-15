import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ColorList from '../components/ColorList'


const Home = ({userName = 'Roberto'}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>¡Hola, {userName}!</Text>
      <ColorList color='#BDD6D2'/>
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
})

export default Home