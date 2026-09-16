import React from 'react';
 
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 
import {
  useUsuarioActions,
} from '../hooks/useUsuarioActions';
 
const CardUsuario = ({
  id,
  nombre,
  fechaNacimiento,
  carnet,
  URLImage,
}) => {
  const {
    removeUsuario,
  } = useUsuarioActions();
 
  const handleDelete = () => {
    Alert.alert(
      'Eliminar usuario',
      `¿Deseas eliminar a ${nombre}?`,
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
 
              Alert.alert(
                'Usuario eliminado',
                'El usuario se eliminó correctamente.'
              );
            } catch (error) {
              console.error(
                'Error al eliminar usuario:',
                error
              );
 
              Alert.alert(
                'Error',
                error?.message ||
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
          source={{
            uri: URLImage,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View
          style={styles.noImage}
        >
          <Text
            style={styles.noImageText}
          >
            Sin imagen
          </Text>
        </View>
      )}
 
      <Text style={styles.nombre}>
        {nombre || 'Sin nombre'}
      </Text>
 
      <View style={styles.info}>
        <Text style={styles.label}>
          Fecha de nacimiento:
        </Text>
 
        <Text style={styles.text}>
          {fechaNacimiento ||
            'No registrada'}
        </Text>
      </View>
 
      <View style={styles.info}>
        <Text style={styles.label}>
          Carnet:
        </Text>
 
        <Text style={styles.text}>
          {carnet ||
            'No registrado'}
        </Text>
      </View>
 
      {URLImage ? (
        <View style={styles.info}>
          <Text style={styles.label}>
            URL de imagen:
          </Text>
 
          <Text
            style={styles.url}
            numberOfLines={2}
          >
            {URLImage}
          </Text>
        </View>
      ) : null}
 
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text
          style={
            styles.deleteButtonText
          }
        >
          Eliminar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default CardUsuario;
 
const styles =
  StyleSheet.create({
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 15,
 
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
 
      elevation: 4,
    },
 
    image: {
      width: '100%',
      height: 180,
      borderRadius: 10,
      marginBottom: 15,
      backgroundColor: '#eeeeee',
    },
 
    noImage: {
      width: '100%',
      height: 140,
      borderRadius: 10,
      marginBottom: 15,
      backgroundColor: '#e5e7eb',
      justifyContent: 'center',
      alignItems: 'center',
    },
 
    noImageText: {
      color: '#6b7280',
      fontSize: 16,
      fontWeight: '600',
    },
 
    nombre: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#222222',
      marginBottom: 12,
    },
 
    info: {
      marginBottom: 9,
    },
 
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#555555',
      marginBottom: 3,
    },
 
    text: {
      fontSize: 16,
      color: '#222222',
    },
 
    url: {
      fontSize: 13,
      color: '#0288d1',
    },
 
    deleteButton: {
      backgroundColor: '#d32f2f',
      paddingVertical: 13,
      borderRadius: 8,
      marginTop: 12,
      alignItems: 'center',
    },
 
    deleteButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
 