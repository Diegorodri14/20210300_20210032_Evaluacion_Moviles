import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
 
import {
  NavigationContainer,
} from '@react-navigation/native';
 
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
 
import Add from '../screen/Add';
import Home from '../screen/Home';
import Login from '../screen/Login';
import Register from '../screen/Register';
 
import { useAuth } from '../hooks/useAuth';
 
const Stack = createNativeStackNavigator();
 
const Navigation = () => {
  const {
    user,
    loading,
  } = useAuth();
 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#0288d1"
        />
      </View>
    );
  }
 
  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Estudiantes',
            }}
          />
 
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              presentation: 'modal',
              title: 'Agregar estudiante',
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
 
          <Stack.Screen
            name="Register"
            component={Register}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
 
export default Navigation;
 
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
 