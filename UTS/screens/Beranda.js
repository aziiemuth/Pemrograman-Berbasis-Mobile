import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

export default function Beranda({ navigation }) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Image source={require('../assets/weather.png')} style={styles.image} />
          <Text variant="titleLarge" style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>
            Aplikasi Cuaca Sederhana untuk Melihat Prakiraan Harian Anda.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigation.navigate('Prakiraan Cuaca')}>
            Lihat Cuaca
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e1f5fe' },
  card: { padding: 10 },
  image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  title: { textAlign: 'center', marginVertical: 10 },
  subtitle: { textAlign: 'center', color: '#555' }
});
