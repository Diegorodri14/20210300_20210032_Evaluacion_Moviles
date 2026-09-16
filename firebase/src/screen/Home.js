import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
 
import CardUsuario from '../components/CardUsuario';
import { useAuth } from '../hooks/useAuth';
import { useUsuario } from '../hooks/useUsuario';
 
const Home = ({ navigation }) => {
  const {
    usuarios,
    loading,
    error,
  } = useUsuario();
 
  const {
    user,
    logout,
  } = useAuth();
 
  const handleLogout = async () => {
    try {
      await logout();
    } catch (logoutError) {
      console.error(
        'Error al cerrar sesión:',
        logoutError
      );
 
      Alert.alert(
        'Error',
        'No se pudo cerrar la sesión.'
      );
    }
  };
 
  const renderItem = ({ item }) => (
    <CardUsuario
      id={item.id}
      nombre={item.nombre}
      fechaNacimiento={item.fechaNacimiento}
      carnet={item.carnet}
      URLImage={item.URLImage}
    />
  );
 
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>
            Estudiantes activos
          </Text>
 
          <Text
            style={styles.email}
            numberOfLines={1}
          >
            {user?.email}
          </Text>
        </View>
 
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
 
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator
            size="large"
            color="#0288d1"
          />
 
          <Text style={styles.loadingText}>
            Cargando usuarios...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      ) : usuarios.length > 0 ? (
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerContent}>
          <Text style={styles.subtitle}>
            No hay usuarios disponibles
          </Text>
        </View>
      )}
 
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Add')
        }
      >
        <Text style={styles.buttonText}>
          Agregar usuario
        </Text>
      </TouchableOpacity>
    </View>
  );
};
 
export default Home;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 18,
    paddingTop: 14,
  },
 
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
 
  headerTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2933',
  },
 
  email: {
    color: '#66727d',
    marginTop: 3,
  },
 
  logoutButton: {
    backgroundColor: '#263238',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
 
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
 
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  loadingText: {
    marginTop: 12,
    color: '#687582',
  },
 
  errorText: {
    color: '#d32f2f',
    fontWeight: '600',
    textAlign: 'center',
  },
 
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff9800',
  },
 
  button: {
    backgroundColor: '#0288d1',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 12,
  },
 
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
 
  list: {
    paddingBottom: 8,
  },
});
 