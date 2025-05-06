import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function TentangAplikasi() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>Tentang Aplikasi</Text>
          <Text style={styles.text}>
            Aplikasi ini dibuat untuk menunjukkan data cuaca harian dengan desain menarik. Dibangun dengan React Native dan React Native Paper.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e1f5fe' },
  card: { backgroundColor: '#b3e5fc' },
  title: { marginBottom: 10, color: '#0288d1' },
  text: { color: '#0277bd', lineHeight: 20 }
});
