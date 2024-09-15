import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Home = (props) => {

  // Función para abrir la cámara y tomar una foto
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Es necesario el permiso para acceder a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      Alert.alert('Foto capturada', `Ruta: ${uri}`);
    } else {
      Alert.alert('Cancelado', 'La captura de la foto fue cancelada.');
    }
  };

  // Función para abrir la galería y seleccionar una imagen
  const openGallery = async () => {

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Es necesario el permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.uri;
      Alert.alert('Imagen seleccionada', `Ruta: ${uri}`);
    } else {
      Alert.alert('Cancelado', 'La selección de la imagen fue cancelada.');
    }
  };

 return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>¡Hola, Roberto!</Text>
      <Text style={styles.subtitle}>Crear un push de imagenes.</Text>
      <Text>Ultima actualización: 13/09/2024 - 19:00</Text>
      <Text>Estado: <Text style={{color: 'red', fontWeight:'bold'}}>Pendiente</Text></Text>

      <Pressable style={styles.buttonCamera} onPress={openCamera}>
        <Ionicons name="camera" size={24} color="white" />
        <Text style={styles.text}>Abrir Camara</Text>
      </Pressable>

      <Pressable style={styles.buttonGallery} onPress={openGallery}>
        <Ionicons name="images" size={24} color="white" />
        <Text style={styles.text}>Abrir Galería</Text>
      </Pressable>

      <Text style={styles.subtitle}>Status:</Text>
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
    marginTop: -30,
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
})

export default Home
