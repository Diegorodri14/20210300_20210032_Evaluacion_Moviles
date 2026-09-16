import React, {
    useState,
  } from 'react';
   
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
    useUsuarioActions,
  } from '../hooks/useUsuarioActions';
   
  const EditUsuario = ({
    route,
    navigation,
  }) => {
    const {
      usuario,
    } = route.params;
   
    const {
      updateUsuario,
    } = useUsuarioActions();
   
    const [
      nombre,
      setNombre,
    ] = useState(
      usuario?.nombre || ''
    );
   
    const [
      fechaNacimiento,
      setFechaNacimiento,
    ] = useState(
      usuario?.fechaNacimiento || ''
    );
   
    const [
      carnet,
      setCarnet,
    ] = useState(
      usuario?.carnet || ''
    );
   
    const [
      URLImage,
      setURLImage,
    ] = useState(
      usuario?.URLImage || ''
    );
   
    const [
      saving,
      setSaving,
    ] = useState(false);
   
    const guardarCambios =
      async () => {
        try {
          setSaving(true);
   
          await updateUsuario(
            usuario.id,
            {
              nombre,
              fechaNacimiento,
              carnet,
              URLImage,
            }
          );
   
          Alert.alert(
            'Usuario actualizado',
            'Los datos se actualizaron correctamente.',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.goBack(),
              },
            ]
          );
        } catch (error) {
          console.error(
            'Error al actualizar usuario:',
            error
          );
   
          Alert.alert(
            'Error',
            error?.message ||
              'No se pudo actualizar el usuario.'
          );
        } finally {
          setSaving(false);
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
            Editar estudiante
          </Text>
   
          <View
            style={
              styles.inputContainer
            }
          >
            <Text style={styles.label}>
              Nombre:
            </Text>
   
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={
                setNombre
              }
              placeholder="Nombre"
            />
          </View>
   
          <View
            style={
              styles.inputContainer
            }
          >
            <Text style={styles.label}>
              Fecha de nacimiento:
            </Text>
   
            <TextInput
              style={styles.input}
              value={
                fechaNacimiento
              }
              onChangeText={
                setFechaNacimiento
              }
              placeholder="25/12/2004"
            />
          </View>
   
          <View
            style={
              styles.inputContainer
            }
          >
            <Text style={styles.label}>
              Carnet institucional:
            </Text>
   
            <TextInput
              style={styles.input}
              value={carnet}
              onChangeText={
                setCarnet
              }
              placeholder="20210300"
            />
          </View>
   
          <View
            style={
              styles.inputContainer
            }
          >
            <Text style={styles.label}>
              URL de imagen:
            </Text>
   
            <TextInput
              style={styles.input}
              value={URLImage}
              onChangeText={
                setURLImage
              }
              placeholder="https://..."
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
   
          <TouchableOpacity
            style={[
              styles.saveButton,
              saving &&
                styles.disabledButton,
            ]}
            onPress={
              guardarCambios
            }
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator
                color="#fff"
              />
            ) : (
              <Text
                style={
                  styles.saveButtonText
                }
              >
                Guardar cambios
              </Text>
            )}
          </TouchableOpacity>
   
          <TouchableOpacity
            style={
              styles.cancelButton
            }
            onPress={() =>
              navigation.goBack()
            }
            disabled={saving}
          >
            <Text
              style={
                styles.cancelButtonText
              }
            >
              Cancelar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
   
  export default EditUsuario;
   
  const styles =
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#5E6973',
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
        color: '#ffffff',
        marginBottom: 25,
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
   
      saveButton: {
        backgroundColor: '#69B4A1',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
      },
   
      disabledButton: {
        opacity: 0.6,
      },
   
      saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
   
      cancelButton: {
        borderWidth: 1,
        borderColor: '#ffffff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
      },
   
      cancelButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
      },
    });
   