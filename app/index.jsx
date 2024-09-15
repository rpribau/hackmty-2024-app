import { View, Text, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://10.22.130.241:5001/upload';

const Home = () => {
  console.log('Componente Home montado');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isProcessed, setIsProcessed] = useState(false); // State to track if image is processed

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
      <Text style={styles.title}>¡Hola, Roberto!</Text>
      <Text style={styles.subtitle}>Crear un push de imagenes.</Text>
      <Text>Ultima actualización: 13/09/2024 - 19:00</Text>
      <Text>Estado: <Text style={{ color: 'red', fontWeight: 'bold' }}>Pendiente</Text></Text>

      <Pressable style={styles.buttonCamera} onPress={openCamera}>
        <Ionicons name="camera" size={24} color="white" />
        <Text style={styles.text}>Abrir Cámara</Text>
      </Pressable>

      <Pressable style={styles.buttonGallery} onPress={openGallery}>
        <Ionicons name="images" size={24} color="white" />
        <Text style={styles.text}>Abrir Galería</Text>
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
    </ScrollView>
  );
};

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
  subtitle2: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    width: '100%',
  },
  buttonCamera: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    borderRadius: 10,
    elevation: 20,
    backgroundColor: '#91C961',
    margin: 70,
  },
  buttonGallery: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 20,
    marginTop: -50,
    marginBottom: 30,
    margin: 70,
    backgroundColor: '#689940',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default Home;
