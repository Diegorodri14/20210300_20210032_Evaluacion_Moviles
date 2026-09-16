import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useProductActions } from '../hooks/useProductActions';

const CardUsuario = ({ id, nombre, fecha, carnet, URL }) => {
  const { removeUsuario } = useProductActions();

  const handleDelete = () => {
    Alert.alert('Eliminar usuario', `¿Deseas eliminar "${nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await removeUsuario(id);
          } catch (error) {
            console.error('Error al eliminar usuario:', error);
            Alert.alert('Error', 'No se pudo eliminar el usuario.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.text}>{fecha}</Text>
      <Text style={styles.text}>{carnet}</Text>
      <Text style={styles.text}>{URL}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.updateButton, vendido ? styles.regresarButton : styles.venderButton]}
          onPress={handleUpdate}
        >
          <Text style={styles.updateButtonText}>
            {vendido ? 'Devolver usuario' : 'Vender'}
          </Text>
        </TouchableOpacity>
      </View>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nombre: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 5 },
  vendido: { color: 'red', fontWeight: 'bold' },
  disponible: { color: 'green', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  deleteButton: { flex: 1, backgroundColor: '#ff4d4d', padding: 10, borderRadius: 5 },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  updateButton: { flex: 1, padding: 10, borderRadius: 5 },
  updateButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  venderButton: { backgroundColor: '#4caf50' },
  regresarButton: { backgroundColor: '#ff9800' },
});