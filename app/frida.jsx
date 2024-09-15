import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

const Frida = ({ userName = 'Roberto' }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://example.com/data.json') // URL URL URL URL URL URL URL URL URL URL URL URL URL URL URL 
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>AI FRIDA</Text>
      <Text style={styles.proposal}>Propuesta</Text>
      <View style={styles.ResultsBox} />
      <Text style={styles.imageSimilarities}>Similitudes de imagen</Text>
      <View style={styles.ImageBox} />
      <Text style={styles.acceptOrDeclineChanges}>¿Deseas aplicar estos cambios?</Text>
      <View style={styles.AcceptBox} />
      <View style={styles.DeclineBox} />
      <Text style={styles.Acetar}>Aceptar</Text>
      <Text style={styles.Declinar}>Declinar</Text>
      {data && (
        <View>
          <Text>{JSON.stringify(data)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    marginTop: 50,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '50%',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  proposal: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  ResultsBox: {
    marginTop: 15,
    width: '100%',
    height: 80,
    backgroundColor: '#CDE18F',
    borderRadius: 10,
  },
  imageSimilarities: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  ImageBox: {
    marginTop: 15,
    width: '100%',
    height: 200,
    backgroundColor: '#CDE18F',
    borderRadius: 10,
  },
  acceptOrDeclineChanges: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  AcceptBox: {
    marginTop: 10,
    marginLeft: 20,
    width: '40%',
    height: 50,
    backgroundColor: '#689940',
    borderRadius: 10,
  },
  DeclineBox: {
    marginTop: -50,
    marginLeft: 180,
    width: '40%',
    height: 50,
    backgroundColor: '#CD3A32',
    borderRadius: 10,
  },
  Acetar: {
    fontSize: 20,
    marginTop: -40,
    marginLeft: 50,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '40%',
    fontWeight: 'bold',
  },
  Declinar: {
    fontSize: 20,
    marginTop: -23,
    marginLeft: 210,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '40%',
    fontWeight: 'bold',
  },
});

export default Frida;