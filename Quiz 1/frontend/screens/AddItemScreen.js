import React, { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function AddItemScreen({ navigation }) {
  const [nama_barang, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [kategori, setKategori] = useState('');

  const handleSubmit = async () => {
    if (!nama_barang || !harga || !stok || !kategori) {
      Alert.alert('Peringatan', 'Semua field wajib diisi!');
      return;
    }

    try {
      await fetch('http://192.168.1.6:5000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_barang,
          harga: parseInt(harga),
          stok: parseInt(stok),
          kategori,
        }),
      });

      Alert.alert('Sukses', 'Barang berhasil ditambahkan');
      setTimeout(() => navigation.goBack(), 100);
    } catch {
      Alert.alert('Error', 'Gagal menambahkan barang');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Barang Baru</Text>
      <TextInput placeholder="Nama Barang" value={nama_barang} onChangeText={setNama} style={styles.input} />
      <TextInput placeholder="Harga" value={harga} onChangeText={setHarga} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Stok" value={stok} onChangeText={setStok} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Kategori" value={kategori} onChangeText={setKategori} style={styles.input} />
      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
        Simpan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#ffffff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#000' },
  input: { marginBottom: 12, borderWidth: 1, borderColor: '#999', padding: 10, borderRadius: 6, backgroundColor: '#fefefe' }
});
