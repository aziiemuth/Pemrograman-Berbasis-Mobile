import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, FAB } from 'react-native-paper';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://192.168.1.6:5000/items'); // ganti IP sesuai server kamu
      setItems(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Gagal memuat data barang');
    }
  };

  const deleteItem = async (id) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus barang ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://192.168.1.6:5000/items/${id}`);
            fetchItems();
            Alert.alert('Berhasil', 'Barang berhasil dihapus');
          } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Gagal menghapus barang');
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchItems);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦 Daftar Barang</Text>
      <ScrollView>
        {items.map((item) => (
          <Card key={item._id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{item.nama_barang}</Title>
              <Paragraph style={styles.text}>💰 Harga: Rp {item.harga}</Paragraph>
              <Paragraph style={styles.text}>📦 Stok: {item.stok}</Paragraph>
              <Paragraph style={styles.text}>🏷️ Kategori: {item.kategori}</Paragraph>
              <View style={styles.buttonRow}>
                <FAB
                  small
                  icon="pencil"
                  onPress={() => navigation.navigate('Edit Barang', { item })}
                  style={styles.editButton}
                />
                <TouchableOpacity onPress={() => deleteItem(item._id)} style={styles.deleteButtonCustom}>
                  <Text style={styles.buttonText}>🗑️ Hapus</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        label="Tambah"
        style={styles.fab}
        onPress={() => navigation.navigate('Tambah Barang')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#ffffff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#000' },
  card: { marginBottom: 16, backgroundColor: '#f2f2f2' },
  title: { color: '#212121', fontSize: 18, fontWeight: 'bold' },
  text: { color: '#424242' },
  buttonRow: { flexDirection: 'row', marginTop: 10, gap: 10, alignItems: 'center' },
  editButton: { backgroundColor: '#1976D2' },
  deleteButtonCustom: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#388E3C',
  },
});
