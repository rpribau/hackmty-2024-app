import { View, Text, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://10.22.130.241:5005/upload';
const JSON_API_URL = 'https://jjpg0w5tsl.execute-api.us-east-2.amazonaws.com/getManagement'; // URL del JSON

const Products = () => {
  console.log('Componente Home montado');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isProcessed, setIsProcessed] = useState(false); // State to track if image is processed
  const [proposalText, setProposalText] = useState(''); // Estado para guardar el texto de la propuesta

const fetchProposalText = async () => {
  try {
    console.log('Iniciando fetch para obtener el texto de la propuesta');
    const response = await fetch(JSON_API_URL);

    // Verifica que la respuesta tenga un estado exitoso
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la API: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta recibida:', data);

    // Verifica que 'message' esté en los datos
    if (data && data.message) {
      setProposalText(data.message);
    } else {
      throw new Error('Formato de JSON incorrecto o "message" no encontrado.');
    }

  } catch (error) {
    console.error('Error al obtener el texto de la propuesta:', error);
    setProposalText('Error al cargar la propuesta');
  }
};


  useEffect(() => {
    fetchProposalText(); // Cargar el texto de la propuesta al montar el componente
  }, []);

  const openCamera = async () => {
    console.log('Llamada a openCamera');
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.log('Error: Permiso de cámara no concedido');
      Alert.alert('Permiso denegado', 'Es necesario el permiso para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Imagen tomada, iniciando proceso de subida');
      await uploadImage(result.uri);
    } else {
      console.log('Captura de foto cancelada');
      Alert.alert('Cancelado', 'La captura de la foto fue cancelada.');
    }
  };

  const openGallery = async () => {
    console.log('Llamada a openGallery');
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Error: Permiso de galería no concedido');
      Alert.alert('Permiso denegado', 'Es necesario el permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Resultado de Image Picker:', result);

    if (!result.canceled) {
      console.log('Imagen seleccionada, iniciando proceso de subida');
      await uploadImage(result.assets[0].uri);
    } else {
      console.log('Selección de imagen cancelada');
      Alert.alert('Cancelado', 'La selección de la imagen fue cancelada.');
    }
  };

  const uploadImage = async (uri) => {
    console.log('Llamada a uploadImage', uri);
    if (!uri) {
      console.log('Error: No se seleccionó ninguna imagen');
      Alert.alert('Error', 'No se seleccionó ninguna imagen.');
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData();
    let imgName = uri.split('/').pop(); // Usar pop para obtener el último segmento del path
    formData.append('photo', {
      uri,
      type: 'image/jpeg', // Asegúrate de que el tipo MIME es correcto
      name: imgName,
    });

    try {
      console.log('Iniciando fetch a API');
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        // Eliminamos el Content-Type para que el navegador lo maneje automáticamente
      });

      const data = await response.json();
      console.log('Recibido de API', data);

      if (response.ok) {
        setIsProcessed(true);
        console.log('Imagen procesada y guardada exitosamente');
      } else {
        console.log('Error en la respuesta de la API', data.error);
        Alert.alert('Error', data.error || 'Error al procesar la imagen.');
      }
    } catch (error) {
      console.log('Error en uploadImage', error);
      Alert.alert('Error', 'Error al enviar la imagen.');
    } finally {
      setIsLoading(false); // Stop loading after processing
    }
  };

  console.log('Renderizando componente Home');
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.addImage}>Agraga la imagen a analizar</Text>
      <Text style={styles.lastUpdate}>Ultima actualización: 13/09/2024 - 19:00</Text>
      <Text>Estado: <Text style={{ color: 'red', fontWeight: 'bold' }}>Pendiente</Text></Text>

      <Pressable style={styles.buttonGallery} onPress={openGallery}>
        <Ionicons name="images" size={24} color="white" />
        <Text style={styles.openGalleryText}>Abrir Galería</Text>
      </Pressable>

      <Text style={styles.subtitle}>Status:</Text>
      {/* Indicador de carga */}
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* Mensaje de éxito */}
      {isProcessed && (
        <View style={{ alignItems: 'center' }}>
          <AntDesign name="checkcircle" size={54} color="green" />
          <Text style={styles.subtitle2}>La imagen ha sido procesada!</Text>
        </View>
      )}

      <Text style={styles.proposal}>Propuesta</Text>
      {/* Mostrar el texto de la propuesta en el cuadro verde */}
      <View style={styles.ResultsBox}>
        <Text style={styles.proposalText}>{proposalText}</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 38,
    marginTop: 50,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    width: '50%',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  addImage: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },

  lastUpdate: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
  },

  subtitle: {
    fontSize: 20,
    marginTop: -10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  subtitle2: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    width: '100%',
  },

  buttonGallery: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 20,
    marginTop: 20,
    marginBottom: 30,
    margin: 70,
    backgroundColor: '#689940',
  },
  openGalleryText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  proposal: {
    fontSize: 20,
    marginTop: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  ResultsBox: {
    marginTop: 15,
    width: '100%',
    height: 190,
    backgroundColor: '#CDE18F',
    borderRadius: 10,
    padding: 10, // Agregado para espacio interno
  },
  proposalText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Products;
