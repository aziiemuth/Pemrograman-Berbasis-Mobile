import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import Beranda from './screens/Beranda';
import PrakiraanCuaca from './screens/PrakiraanCuaca';
import TentangAplikasi from './screens/TentangAplikasi';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Beranda"
          screenOptions={{
            headerStyle: { backgroundColor: '#0288d1' },
            headerTintColor: '#fff',
            drawerActiveTintColor: '#0288d1',
            drawerLabelStyle: { fontSize: 16 }
          }}
        >
          <Drawer.Screen name="Beranda" component={Beranda} />
          <Drawer.Screen name="Prakiraan Cuaca" component={PrakiraanCuaca} />
          <Drawer.Screen name="Tentang Aplikasi" component={TentangAplikasi} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
