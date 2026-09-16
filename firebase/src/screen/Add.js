import React, {useState} from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import {useAddUsuario} from '../hooks/useAddUsuario'

  const Add = ({navigation}) => {
    const { addUser, saving} = useAddUsuario();
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [carnet, setCarnet] = useState('');
    const [URLImage, setURLImage] = useState('');
  

  const goToHome = () => navigation.goBack();

  const agregarUsuario = async () => {
    try {
        await addUser({nombre, fechaNacimiento, carnet, URLImage});
        Alert.alert('Usuario Agregado', 'El usuario se ha agregado correctamente.'[{text : 'OK', onPress: goToHome}]);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        Alert.alert('Error', error.message || 'No se pudo agregar el usuario.');
      }
    }; 
    
    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Agregar Estudiante</Text>
    
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="Ej. Audífonos"
              />
            </View>
    
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha de Nacimiento:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setFechaNacimiento}
                value={fechaNacimiento}
                placeholder="Ej. 25/12/2024"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Carnet Institucional:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setCarnet}
                value={carnet}
                placeholder="Ej. 20210300"
              />
            </View>
    
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Fecha de Nacimiento:</Text>
              <TextInput
                style={styles.input}
                onChangeText={setURLImage}
                value={URLImage}
                placeholder="Ej. Imagen.png"
              />
            </View>
    
            <TouchableOpacity style={styles.button} onPress={agregarUsuario} disabled={saving}>
              {saving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Agregar estudiante</Text>
              )}
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.backButton} onPress={goToHome} disabled={saving}>
              <Text style={styles.backButtonText}>Volver a home</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    };


    export default Add
    
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: '#5E6973' },
        scrollContent: {
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        },
        inputContainer: {
          width: '100%',
          padding: 16,
          backgroundColor: '#67A99A',
          marginBottom: 16,
          borderRadius: 8,
        },
        label: { fontSize: 16, marginBottom: 8, color: '#333' },
        input: {
          height: 44,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 6,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          width: '100%',
        },
        button: {
          backgroundColor: '#69B4A1',
          padding: 13,
          borderRadius: 7,
          marginTop: 8,
          width: '100%',
          alignItems: 'center',
        },
        buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
        backButton: {
          borderColor: '#0288d1',
          borderWidth: 1,
          padding: 13,
          borderRadius: 7,
          marginTop: 12,
          width: '100%',
          alignItems: 'center',
        },
        backButtonText: { color: '#0288d1', fontWeight: 'bold' },
      });