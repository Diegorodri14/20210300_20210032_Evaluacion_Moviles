import React, { useState } from 'react';
 
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
 
import {
  useAddUsuario,
} from '../hooks/useAddUsuario';
 
const Add = ({ navigation }) => {
  const {
    addUser,
    saving,
  } = useAddUsuario();
 
  const [nombre, setNombre] =
    useState('');
 
  const [
    fechaNacimiento,
    setFechaNacimiento,
  ] = useState('');
 
  const [carnet, setCarnet] =
    useState('');
 
  const [URLImage, setURLImage] =
    useState('');
 
  const goToHome = () => {
    navigation.goBack();
  };
 
  const agregarUsuario = async () => {
    try {
      if (!addUser) {
        throw new Error(
          'La función addUser no está disponible.'
        );
      }
 
      await addUser({
        nombre,
        fechaNacimiento,
        carnet,
        URLImage,
      });
 
      Alert.alert(
        'Usuario agregado',
        'El usuario se ha agregado correctamente.',
        [
          {
            text: 'OK',
            onPress: goToHome,
          },
        ]
      );
 
    } catch (error) {
      console.error(
        'Error al agregar usuario:',
        error
      );
 
      Alert.alert(
        'Error',
        error?.message ||
          'No se pudo agregar el usuario.'
      );
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Agregar Estudiante
        </Text>
 
        <View
          style={styles.inputContainer}
        >
          <Text style={styles.label}>
            Nombre:
          </Text>
 
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Juan Pérez"
          />
        </View>
 
        <View
          style={styles.inputContainer}
        >
          <Text style={styles.label}>
            Fecha de Nacimiento:
          </Text>
 
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={
              setFechaNacimiento
            }
            placeholder="Ej. 25/12/2004"
          />
        </View>
 
        <View
          style={styles.inputContainer}
        >
          <Text style={styles.label}>
            Carnet Institucional:
          </Text>
 
          <TextInput
            style={styles.input}
            value={carnet}
            onChangeText={setCarnet}
            placeholder="Ej. 20210300"
          />
        </View>
 
        <View
          style={styles.inputContainer}
        >
          <Text style={styles.label}>
            URL de imagen:
          </Text>
 
          <TextInput
            style={styles.input}
            value={URLImage}
            onChangeText={setURLImage}
            placeholder="https://..."
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
 
        <TouchableOpacity
          style={[
            styles.button,
            saving &&
              styles.buttonDisabled,
          ]}
          onPress={agregarUsuario}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator
              color="#ffffff"
            />
          ) : (
            <Text
              style={styles.buttonText}
            >
              Agregar estudiante
            </Text>
          )}
        </TouchableOpacity>
 
        <TouchableOpacity
          style={styles.backButton}
          onPress={goToHome}
          disabled={saving}
        >
          <Text
            style={
              styles.backButtonText
            }
          >
            Volver
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
 
export default Add;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60747a',
  },
 
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
 
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#ffffff',
  },
 
  inputContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#67A99A',
    marginBottom: 16,
    borderRadius: 10,
  },
 
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#ffffff',
  },
 
  input: {
    height: 46,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 7,
    paddingHorizontal: 12,
    fontSize: 16,
  },
 
  button: {
    backgroundColor: '#69B4A1',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
 
  buttonDisabled: {
    opacity: 0.6,
  },
 
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  backButton: {
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
 
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
 