import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import KartuCuaca from '../components/KartuCuaca';

export default function PrakiraanCuaca() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Prakiraan Cuaca Minggu Ini</Text>
      <KartuCuaca hari="Senin" suhu="30°C" kondisi="Cerah" />
      <KartuCuaca hari="Selasa" suhu="28°C" kondisi="Berawan" />
      <KartuCuaca hari="Rabu" suhu="26°C" kondisi="Hujan Ringan" />
      <KartuCuaca hari="Kamis" suhu="29°C" kondisi="Cerah Berawan" />
      <KartuCuaca hari="Jumat" suhu="22°C" kondisi="Hujan Badai" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e1f5fe' },
  header: { marginBottom: 16, color: '#0288d1' }
});
