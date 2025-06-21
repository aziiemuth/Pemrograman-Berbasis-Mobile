import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TokoKu">
          <Stack.Screen name="TokoKu" component={HomeScreen} />
          <Stack.Screen name="Tambah Barang" component={AddItemScreen} />
          <Stack.Screen name="Edit Barang" component={EditItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
