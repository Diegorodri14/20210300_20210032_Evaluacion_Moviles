import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useUsuarioActions } from '../hooks/useUsuarioActions';
 
const CardUsuario = ({
  id,
  nombre,
  fechaNacimiento,
  carnet,
  URLImage,
}) => {
  const { removeUsuario } = useUsuarioActions();
 
  const handleDelete = () => {
    Alert.alert(
      'Eliminar usuario',
      `¿Deseas eliminar "${nombre}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeUsuario(id);
            } catch (error) {
              console.error(
                'Error al eliminar usuario:',
                error
              );
 
              Alert.alert(
                'Error',
                'No se pudo eliminar el usuario.'
              );
            }
          },
        },
      ]
    );
  };
 
  return (
    <View style={styles.card}>
 
      {URLImage ? (
        <Image
          source={{ uri: URLImage }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}
 
      <Text style={styles.nombre}>
        {nombre}
      </Text>
 
      <Text style={styles.label}>
        Fecha de nacimiento:
      </Text>
 
      <Text style={styles.text}>
        {fechaNacimiento}
      </Text>
 
      <Text style={styles.label}>
        Carnet:
      </Text>
 
      <Text style={styles.text}>
        {carnet}
      </Text>
 
      {URLImage ? (
        <>
          <Text style={styles.label}>
            URL:
          </Text>
 
          <Text
            style={styles.url}
            numberOfLines={2}
          >
            {URLImage}
          </Text>
        </>
      ) : null}
 
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>
          Eliminar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default CardUsuario;
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
 
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#eee',
  },
 
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
 
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 5,
  },
 
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
 
  url: {
    fontSize: 13,
    color: '#0288d1',
    marginBottom: 10,
  },
 
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
 
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
 