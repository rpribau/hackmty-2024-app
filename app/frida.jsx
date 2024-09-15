import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import IoTSettings from './automatic'
<IoTSettings recommendedTime={recommendedTime} />

const Frida = ({ userName = 'Roberto' }) => {
  const [data, setData] = useState(null);
  const [recommendedTime, setRecommendedTime] = useState(null); // Nueva variable de estado

  useEffect(() => {
    fetch('https://jjpg0w5tsl.execute-api.us-east-2.amazonaws.com/getCrops') // Reemplaza con tu URL real de API
      .then(response => response.json())
      .then(json => {
        setData(json);
        if (json.recommended_time) {
          setRecommendedTime(json.recommended_time); // Guarda el valor de recommended_time
        }
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>AI FRIDA</Text>
      <Text style={styles.proposal}>Propuesta</Text>
      <View style={styles.ResultsBox}>
        {data && <Text style={styles.bodyText}>{data.body}</Text>}
      </View>
      {recommendedTime && (
        <Text style={styles.recommendedTimeText}>
          Hora recomendada para riego: {recommendedTime}
        </Text>
      )}
      <Text style={styles.imageSimilarities}>Similitudes de imagen</Text>
      <View style={styles.ImageBox} />
      <Text style={styles.acceptOrDeclineChanges}>¿Deseas aplicar estos cambios?</Text>
      <View style={styles.AcceptBox} />
      <View style={styles.DeclineBox} />
      <Text style={styles.Acetar}>Aceptar</Text>
      <Text style={styles.Declinar}>Declinar</Text>
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
    height: 100, 
    backgroundColor: '#CDE18F',
    borderRadius: 10,
    padding: 10,
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
  },
  recommendedTimeText: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#333',
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
