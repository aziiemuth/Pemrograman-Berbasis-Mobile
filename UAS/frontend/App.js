// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/index';

// Kustomisasi tema (opsional)
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE', // Warna utama aplikasi
    accent: '#03DAC6',  // Warna aksen
    background: '#F6F6F6', // Warna latar belakang
    surface: '#FFFFFF', // Warna permukaan kartu/komponen
    text: '#000000',    // Warna teks utama
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <View style={styles.container}>
            <StatusBar style="dark" backgroundColor={theme.colors.primary} />
            <AppNavigator />
          </View>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6', // Sesuaikan dengan tema background
  },
});

export default App;
