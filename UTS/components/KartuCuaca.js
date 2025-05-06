import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function KartuCuaca({ hari, suhu, kondisi }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.hari}>{hari}</Text>
        <Text style={styles.suhu}>{suhu}</Text>
        <Text style={styles.kondisi}>{kondisi}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    backgroundColor: '#b3e5fc', // Warna senada
    borderRadius: 10
  },
  hari: {
    fontWeight: 'bold',
    color: '#0288d1'
  },
  suhu: {
    marginTop: 4,
    fontSize: 16,
    color: '#01579b'
  },
  kondisi: {
    fontStyle: 'italic',
    color: '#0277bd'
  }
});
