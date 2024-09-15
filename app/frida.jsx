import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

// Definir las URLs
const API_URL = 'http://10.22.130.241:5001';
const IMAGE_PATH = `${API_URL}/images/detections.jpg`;
const JSON_PATH = `${API_URL}/json/detections.json`;

const Frida = ({ userName = 'Roberto' }) => {
  const [data, setData] = useState(null);
  const [imagePath, setImagePath] = useState(`${IMAGE_PATH}?${new Date().getTime()}`);
  const [recommendedTime, setRecommendedTime] = useState(null);

  const params = [
    { "crop": "tomato", "sprinklers": 3 },
    { 
      "source": "Soil Moisture Sensor", 
      "data": [
        { "level": 15, "units": "%" },
        { "soil_temperature": 18, "units": "C" }
      ] 
    },
    { 
      "source": "PH Sensor", 
      "data": [{ "level": 6.8, "units": "PH" }]
    },
    { 
      "source": "Light Sensor", 
      "data": [ 
        { "light_intensity": 800, "units": "lux" },
        { "ambient_temperature": 24, "units": "C" }
      ] 
    },
    { 
      "source": "Humidity Sensor", 
      "data": [{ "level": 24, "units": "%" }]
    }
  ];

  const flattenParams = (params) => {
    const queryParams = [];
    params.forEach((param) => {
      if (param.source) {
        queryParams.push(`source=${encodeURIComponent(param.source)}`);
        param.data.forEach((dataItem, index) => {
          Object.entries(dataItem).forEach(([key, value]) => {
            queryParams.push(`${encodeURIComponent(param.source)}_${index}_${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
          });
        });
      } else {
        Object.entries(param).forEach(([key, value]) => {
          queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        });
      }
    });
    return queryParams.join('&');
  };

  const queryString = flattenParams(params);

  useEffect(() => {
    // Fetch datos de la API
    fetch(`https://jjpg0w5tsl.execute-api.us-east-2.amazonaws.com/getCrops?${queryString}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
        setData(json);
        if (json.recommended_time) {
          setRecommendedTime(json.recommended_time);
        }

        // Actualiza la imagen aquí para evitar caché
        setImagePath(`${IMAGE_PATH}?${new Date().getTime()}`);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, [queryString]);

  const handleAccept = () => {
    // Aquí podrías manejar la lógica de aceptación, como hacer un POST a una API.
  };

  const handleDecline = () => {
    // Aquí podrías manejar la lógica de rechazo, como hacer un POST a una API.
  };

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
      <View style={styles.ImageBox}>
        <Image source={{ uri: imagePath }} style={styles.image} />
      </View>
      <Text style={styles.acceptOrDeclineChanges}>¿Deseas aplicar estos cambios?</Text>
      <TouchableOpacity style={styles.AcceptBox} onPress={handleAccept}>
        <Text style={styles.Acetar}>Aceptar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.DeclineBox} onPress={handleDecline}>
        <Text style={styles.Declinar}>Declinar</Text>
      </TouchableOpacity>
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
    height: 250,
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
    height: 250, // Ajustado a 250px
    backgroundColor: '#CDE18F',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250, // Ajustado a 250px
    height: 250, // Ajustado a 250px
    resizeMode: 'cover',
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
    marginBottom: 50,
  },
  Acetar: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  Declinar: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
});

export default Frida;
