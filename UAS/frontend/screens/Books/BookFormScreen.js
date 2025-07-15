// screens/Books/BookFormScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { createBook, getBookById, updateBook } from '../../services/bookService';

const BookFormScreen = ({ route, navigation }) => {
  const { bookId } = route.params || {}; // bookId akan ada jika mode edit
  const isEditMode = !!bookId;

  const [judul, setJudul] = useState('');
  const [pengarang, setPengarang] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahunTerbit, setTahunTerbit] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [lokasiCabangId, setLokasiCabangId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true); // Untuk loading awal di edit mode
  const theme = useTheme();

  useEffect(() => {
    if (isEditMode) {
      const fetchBookData = async () => {
        setInitialLoad(true);
        try {
          const data = await getBookById(bookId);
          setJudul(data.judul);
          setPengarang(data.pengarang);
          setPenerbit(data.penerbit);
          setTahunTerbit(data.tahun_terbit.toString());
          setJumlah(data.jumlah.toString());
          setLokasiCabangId(data.lokasi_cabang_id.toString());
        } catch (error) {
          console.error('Error fetching book for edit:', error);
          Alert.alert('Error', 'Gagal memuat data buku untuk diedit.');
          navigation.goBack();
        } finally {
          setInitialLoad(false);
        }
      };
      fetchBookData();
    } else {
      setInitialLoad(false); // Tidak ada loading awal jika mode tambah
    }
  }, [bookId, isEditMode]);

  const handleSubmit = async () => {
    if (!judul || !pengarang || !penerbit || !tahunTerbit || !jumlah || !lokasiCabangId) {
      Alert.alert('Peringatan', 'Semua kolom harus diisi.');
      return;
    }

    setLoading(true);
    const bookData = {
      judul,
      pengarang,
      penerbit,
      tahun_terbit: parseInt(tahunTerbit),
      jumlah: parseInt(jumlah),
      lokasi_cabang_id: parseInt(lokasiCabangId),
    };

    try {
      if (isEditMode) {
        await updateBook(bookId, bookData);
        Alert.alert('Berhasil', 'Buku berhasil diperbarui.');
      } else {
        await createBook(bookData);
        Alert.alert('Berhasil', 'Buku berhasil ditambahkan.');
      }
      navigation.goBack(); // Kembali ke daftar buku setelah berhasil
    } catch (error) {
      console.error('Error saving book:', error);
      Alert.alert('Error', `Gagal ${isEditMode ? 'memperbarui' : 'menambahkan'} buku.`);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.title} variant="headlineMedium">
        {isEditMode ? 'Edit Buku' : 'Tambah Buku Baru'}
      </Text>
      <TextInput
        label="Judul"
        value={judul}
        onChangeText={setJudul}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Pengarang"
        value={pengarang}
        onChangeText={setPengarang}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Penerbit"
        value={penerbit}
        onChangeText={setPenerbit}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Tahun Terbit"
        value={tahunTerbit}
        onChangeText={setTahunTerbit}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Jumlah"
        value={jumlah}
        onChangeText={setJumlah}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Lokasi Cabang ID"
        value={lokasiCabangId}
        onChangeText={setLokasiCabangId}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {isEditMode ? 'Simpan Perubahan' : 'Tambah Buku'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
});

export default BookFormScreen;
